import { ProductVariation } from '@prisma/client';
import { pizzaSizes } from '../constants/pizza';

interface Arguments {
	items: ProductVariation[];
	chooseType: number;
}

export const getAvailablePizzaSizes = ({ items, chooseType }: Arguments) => {
	const filteredPizzaByType = items.filter(item => item.pizzaType === chooseType);
	const availablePizzas = pizzaSizes.map(item => {
		return {
			name: item.name,
			value: item.value,
			disabled: !filteredPizzaByType.some(pizza => Number(pizza.size) === Number(item.value)),
		};
	});

	return { filteredPizzaByType, availablePizzas };
};
