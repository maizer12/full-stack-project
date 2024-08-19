import React from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import qs from 'qs';
import { useSet } from 'react-use';

interface PriceFilter {
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

const useFilters = (priceFilter: PriceFilter) => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
	const router = useRouter();

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

	React.useEffect(() => {
		const { min, max } = priceFilter;
		const checkPrice = price.from !== min || price.to !== max;

		const filters = {
			from: checkPrice ? price.from : undefined,
			to: checkPrice ? price.to : undefined,
			pizzaTypes: Array.from(pizzaTypes),
			sizes: Array.from(sizes),
			ingredients: Array.from(selectedIngredients),
		};

		const queryString = qs.stringify(filters, { skipNulls: true, arrayFormat: 'comma' });
		router.push(`?${queryString}`, { scroll: false });
	}, [pizzaTypes, sizes, price, router, priceFilter, selectedIngredients]);

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

export default useFilters;
