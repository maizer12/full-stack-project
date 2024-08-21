'use client';
import { Dialog, Title } from '@/components/ui/_index';
import { DialogContent } from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import { Product } from '@prisma/client';
import React from 'react';
import { useRouter } from 'next/navigation';

interface Props {
	className?: string;
	product: Product;
}

export const ChooseProductModal: React.FC<Props> = ({ product, className }) => {
	const router = useRouter();

	return (
		<div className={className}>
			<Dialog open={true} onOpenChange={() => router.back()}>
				<DialogContent className={cn('p-0 w-[1060px] max-w-[1060px] min-h-[500px] bg-white overflow-hidden')}>
					<Title text={product.name} />
				</DialogContent>
			</Dialog>
		</div>
	);
};
