import { Ingredient, Product, ProductVariation } from '@prisma/client';

export type ProductWithRelations = Product & {
	variation: ProductVariation[];
	ingredients: Ingredient[];
};
