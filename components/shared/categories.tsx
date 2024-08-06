import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
	className?: string;
}

const cats = ['Pizzas', 'Combos', 'Snacks', 'Cocktails', 'Coffee', 'Drinks', 'Desserts', 'Desserts'];
const activeIndex = 0;

export const Categories: React.FC<Props> = ({ className }) => {
	return (
		<ul className={cn('inline-block rounded-2xl p-1.5 bg-gray-50', className)}>
			{cats.map((e, ind) => (
				<a href='#' key={e} className={cn('py-2.5 inline-block px-6 rounded-2xl font-bold', { ['text-primary bg-white shadow-gray-200 shadow-md']: activeIndex === ind })}>
					{e}
				</a>
			))}
		</ul>
	);
};
