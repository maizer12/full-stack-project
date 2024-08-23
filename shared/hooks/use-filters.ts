import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useSet } from 'react-use';
import { useFilterRouting } from './_index';

export interface PriceFilter {
	min: number;
	max: number;
}

interface QueryFilters {
	from: string;
	to: string;
	sizes: string;
	pizzaTypes: string;
	ingredients: string;
}

export const useFilters = (priceFilter: PriceFilter) => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;

	const [price, setPrice] = React.useState({
		from: Number(searchParams.get('from')) || priceFilter.min,
		to: Number(searchParams.get('to')) || priceFilter.max,
	});

	const [sizes, { toggle: toggleSizes }] = useSet(new Set<string>(searchParams.get('sizes')?.split(',') || []));

	const [pizzaTypes, { toggle: togglePizzaTypes }] = useSet(new Set<string>(searchParams.get('pizzaTypes')?.split(',') || []));

	const [selectedIngredients, { toggle: toggleIngredients }] = useSet(new Set<string>(searchParams.get('ingredients')?.split(',') || []));

	const updatePrice = (name: string, value: number) => {
		if (value < priceFilter.min || value > priceFilter.max) return;
		setPrice(prev => ({ ...prev, [name]: value }));
	};

	useFilterRouting(price, sizes, pizzaTypes, selectedIngredients, priceFilter);

	return {
		price,
		selectedIngredients,
		setPrice,
		sizes,
		toggleSizes,
		pizzaTypes,
		togglePizzaTypes,
		toggleIngredients,
		updatePrice,
	};
};
