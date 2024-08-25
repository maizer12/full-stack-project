import React from 'react';
import { IPizzaSize } from '../constants/pizza';
import useSet from 'react-use/lib/useSet';
import { getAvailablePizzaSizes } from '../lib/_index';
import { ProductVariation } from '@prisma/client';

export const usePizzaOptions = (items: ProductVariation[]) => {
	const [chooseIngredients, { toggle: setChooseIngredients }] = useSet(new Set<number>([]));
	const [size, setSize] = React.useState<IPizzaSize>(30);
	const [chooseType, setChooseType] = React.useState(1);

	const { filteredPizzaByType, availablePizzas } = getAvailablePizzaSizes({ items, chooseType });

	React.useEffect(() => {
		const isAvailablePizza = filteredPizzaByType.find(pizza => pizza.size === size);
		if (!!isAvailablePizza) return;
		setSize(filteredPizzaByType[0].size as IPizzaSize);
	}, [chooseType]);

	return {
		chooseIngredients,
		setChooseIngredients,
		size,
		setSize,
		chooseType,
		setChooseType,
		availablePizzas,
	};
};
