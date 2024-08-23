'use client';
import { Dialog } from '@/shared/components/ui/_index';
import { DialogContent } from '@/shared/components/ui/dialog';
import { cn } from '@/shared/lib/utils';
import { Product } from '@prisma/client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { ChoosePizzaForm } from '../_index';

interface Props {
	className?: string;
	product: Product;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	console.log(product);

	return (
		<div className={cn(className)}>
			<Dialog open={true} onOpenChange={() => router.back()}>
				<DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
					<ChoosePizzaForm imageUrl={product.imageUrl} name={product.name} />
				</DialogContent>
			</Dialog>
		</div>
	);
};
