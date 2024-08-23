import { useRouter } from 'next/navigation';
import qs from 'qs';
import React from 'react';
import { PriceFilter } from './use-filters';

export const useFilterRouting = (price: { from: number; to: number }, sizes: Set<string>, pizzaTypes: Set<string>, selectedIngredients: Set<string>, priceFilter: PriceFilter) => {
	const router = useRouter();

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
};
