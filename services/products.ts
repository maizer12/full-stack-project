import { Product } from '@prisma/client';
import { axiosInstance } from './instance';
import { ApiRoutes } from './api-routes';

export const search = async (query: string): Promise<Product[]> => {
	const products = await axiosInstance.get<Product[]>(`${ApiRoutes.SEARCH_PRODUCTS}/?query=${query}`);
	return products.data;
};
