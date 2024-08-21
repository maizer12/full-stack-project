import { Container, Filters, ProductsGroupList, TopBar } from '@/components/shared/_index';
import { Title } from '@/components/ui/_index';
import { prisma } from '@/prisma/prisma-client';

export default async function Home() {
	const categories = await prisma.category.findMany({
		include: {
			products: {
				include: {
					ingredient: true,
					variation: true,
				},
			},
		},
	});

	return (
		<>
			<Container>
				<Title text='All pizzas:' size='lg' className='font-bold mt-10 mb-5' />
			</Container>
			<TopBar items={categories} />
			<Container className='pb-14 mt-9'>
				<div className='flex gap-12'>
					<div className='w-[244px]'>
						<Filters priceFilter={{ min: 0, max: 100 }} />
					</div>
					<div className='flex-1'>{categories.map(cat => cat.products.length > 0 && <ProductsGroupList key={cat.id} title={cat.name} categoryId={cat.id} items={cat.products} className='mb-12' />)}</div>
				</div>
			</Container>
		</>
	);
}
