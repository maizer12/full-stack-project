import { useSearchParams } from 'next/navigation';

interface QueryFilters {
	from: string;
	to: string;
	category: string;
	pizzaTypes: string;
	sizes: string;
	ingredients: string;
}

export const useQueryParams = <T extends keyof QueryFilters>(key: T): string | undefined => {
	const searchParams = useSearchParams() as unknown as Map<keyof QueryFilters, string>;
	return searchParams.get(key);
};
