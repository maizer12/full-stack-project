import { ChooseProductModal } from '@/shared/components/shared/_index';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function ProductModal({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findFirst({
		where: {
			id: Number(id),
		},
		include: {
			ingredient: true,
			variation: true,
		},
	});

	if (!product) notFound();

	return <ChooseProductModal product={product} />;
}
