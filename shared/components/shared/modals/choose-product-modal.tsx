'use client';
import { Dialog } from '@/shared/components/ui/_index';
import { DialogContent, DialogTitle } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { Ingredient, Product } from '@prisma/client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm } from '../_index';
import { ProductWithRelations } from '@/@types/prisma';

interface Props {
	className?: string;
	ingredients: Ingredient[];
	product: ProductWithRelations;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className, ingredients }) => {
	const router = useRouter();

	console.log(product);

	return (
		<div className={cn(className)}>
			<Dialog open={true} onOpenChange={() => router.back()}>
				<DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
					<DialogTitle className='hidden'>Default Hidden Title</DialogTitle>
					<ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} ingredients={ingredients} items={product.variation} />
				</DialogContent>
			</Dialog>
		</div>
	);
};
