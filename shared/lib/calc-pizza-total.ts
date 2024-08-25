import { Ingredient, ProductVariation } from '@prisma/client';

interface Arguments {
	items: ProductVariation[];
	ingredients: Ingredient[];
	chooseIngredients: Set<number>;
	size: number;
	chooseType: number;
}

/**
 * Function to calculate the total cost of a pizza
 *
 * @param type - the type of crust for the selected pizza
 * @param size - the size of the selected pizza
 * @param items - the list of available variations
 * @param ingredients - the list of ingredients
 * @param selectedIngredients - the selected ingredients
 *
 * @returns number the total cost
 */

export const calcPizzaTotal = ({ items, ingredients, chooseIngredients, size, chooseType }: Arguments) => {
	const totalIngredientsPrice = ingredients.filter(ingredient => chooseIngredients.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0);

	const totalVariationPrice = items.find(item => item.size === size && item.pizzaType === chooseType)?.price ?? 0;

	return totalIngredientsPrice + totalVariationPrice;
};
