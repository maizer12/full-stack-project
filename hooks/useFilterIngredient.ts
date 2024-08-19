import { Api } from '@/services/api-client';
import React from 'react';

interface IngredientItem {
	text: string;
	value: string;
}

type IngredientReturn = {
	ingredients: IngredientItem[];
	isLoading: boolean;
};

export const useFilterIngredient = (): IngredientReturn => {
	const [ingredients, setIngredients] = React.useState<IngredientItem[]>([]);
	const [isLoading, setIsLoading] = React.useState(false);

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
	};
};
