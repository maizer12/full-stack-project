import { Api } from '@/services/api-client';
import React from 'react';
import { useSet } from 'react-use';
import { useQueryParams } from './useQueryParams';

interface IngredientItem {
	text: string;
	value: string;
}

type IngredientReturn = {
	ingredients: IngredientItem[];
	isLoading: boolean;
	selectedIngredients: Set<string>;
	onAddId: (id: string) => void;
};

export const useFilterIngredient = (): IngredientReturn => {
	const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [set, { toggle }] = useSet(new Set<string>(useQueryParams('ingredients') || []));

	React.useEffect(() => {
		const getIngredients = async () => {
			try {
				setIsLoading(true);
				const response = await Api.ingredients.getAll();
				setIngredients(response.map(ingredient => ({ text: ingredient.name, value: String(ingredient.id) })));
			} catch (error) {
				console.error(error);
			} finally {
				setIsLoading(false);
			}
		};

		getIngredients();
	}, []);

	return {
		ingredients,
		isLoading,
		selectedIngredients: set,
		onAddId: toggle,
	};
};
