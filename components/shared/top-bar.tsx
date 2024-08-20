import { cn } from '@/lib/utils';
import React from 'react';
import { SortPopup, Categories, Container } from './_index';
import { Category } from '@prisma/client';

interface Props {
	className?: string;
	items: Category[];
}

export const TopBar: React.FC<Props> = ({ items, className }) => {
	return (
		<div className={cn('sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10', className)}>
			<Container className='flex items-center justify-between'>
				<Categories items={items} />
				<SortPopup />
			</Container>
		</div>
	);
};
