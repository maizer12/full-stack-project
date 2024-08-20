'use client';
import { cn } from '@/lib/utils';
import { useCategory } from '@/store/category';
import { Category } from '@prisma/client';
import React from 'react';

interface Props {
	className?: string;
	items: Category[];
}

export const Categories: React.FC<Props> = ({ items, className }) => {
	const activeId = useCategory(state => state.activeId);

	return (
		<ul className={cn('inline-block rounded-2xl p-1.5 bg-gray-50', className)}>
			{items.map(({ name, id }) => (
				<a href={`#${id}`} key={id} className={cn('py-2.5 inline-block px-6 rounded-2xl  font-bold', { ['text-primary bg-white shadow-gray-200 shadow-md']: activeId === id })}>
					{name}
				</a>
			))}
		</ul>
	);
};
