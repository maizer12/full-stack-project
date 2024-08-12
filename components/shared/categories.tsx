'use client';
import { cn } from '@/lib/utils';
import { useCategory } from '@/store/category';
import React from 'react';

interface Props {
	className?: string;
}

const cats = [
	{ id: 1, name: 'Pizzas' },
	{ id: 2, name: 'Combos' },
	{ id: 3, name: 'Snacks' },
	{ id: 4, name: 'Cocktails' },
	{ id: 5, name: 'Coffee' },
	{ id: 6, name: 'Drinks' },
	{ id: 7, name: 'Desserts' },
];

export const Categories: React.FC<Props> = ({ className }) => {
	const activeId = useCategory(state => state.activeId);

	return (
		<ul className={cn('inline-block rounded-2xl p-1.5 bg-gray-50', className)}>
			{cats.map(({ name, id }) => (
				<a href={`#${id}`} key={id} className={cn('py-2.5 inline-block px-6 rounded-2xl font-bold', { ['text-primary bg-white shadow-gray-200 shadow-md']: activeId === id })}>
					{name}
				</a>
			))}
		</ul>
	);
};
