import { Container, ProductImage, ProductOptions } from '@/components/shared/_index';
import { Title } from '@/components/ui/_index';
import { prisma } from '@/prisma/prisma-client';
import { notFound } from 'next/navigation';

export default async function Product({ params: { id } }: { params: { id: string } }) {
	const product = await prisma.product.findUnique({ where: { id: Number(id) } });

	if (!product) return notFound();

	return (
		<Container className='my-10 flex-col flex'>
			<div className='flex flex-1'>
				<ProductImage src={product.imageUrl} size={30} alt={product.name} />
				<div className='w-[490px] bg-[#FCFCFC] p-7'>
					<Title text={product.name} size='md' className='font-extrabold mb-1' />
					<p className='text-gray-400'>Lorem ipsum dolor sit amet consectetur</p>
					<ProductOptions
						selectedValue='1'
						items={[
							{ name: 'Тонкое', value: '1', disabled: false },
							{ name: 'Традиционное', value: '2', disabled: true },
							{ name: 'Большое', value: '3', disabled: false },
						]}
					/>
				</div>
			</div>
		</Container>
	);
}
