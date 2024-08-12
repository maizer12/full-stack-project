import { Container, Filters, ProductsGroupList, TopBar } from '@/components/shared/_index';
import { Title } from '@/components/ui/_index';

export default function Home() {
	return (
		<>
			<Container>
				<Title text='All pizzas:' size='lg' className='font-bold mt-10 mb-5' />
			</Container>
			<TopBar />
			<Container className='pb-14 mt-9'>
				<div className='flex gap-12'>
					<div className='w-[244px]'>
						<Filters />
					</div>
					<div className='flex-1'>
						<ProductsGroupList
							title='Popular pizzas:'
							categoryId={1}
							className='mb-16'
							items={[
								{ id: 1, name: 'Пепперони', imageUrl: 'https://www.allrecipes.com/thmb/D73VvwH_cG06pVzh05oitTocYV8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg', price: 100, items: [{ price: 100 }] },
								{ id: 2, name: 'Пепперони', imageUrl: 'https://www.allrecipes.com/thmb/D73VvwH_cG06pVzh05oitTocYV8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg', price: 100, items: [{ price: 100 }] },
								{ id: 3, name: '', imageUrl: '', price: 100, items: [{ price: 100 }] },
								{ id: 4, name: '', imageUrl: '', price: 100, items: [{ price: 100 }] },
								{ id: 5, name: '', imageUrl: '', price: 100, items: [{ price: 100 }] },
							]}
						/>
						<ProductsGroupList
							title='Dinner pizzas:'
							categoryId={2}
							items={[
								{ id: 1, name: 'Пепперони', imageUrl: 'https://www.allrecipes.com/thmb/D73VvwH_cG06pVzh05oitTocYV8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg', price: 100, items: [{ price: 100 }] },
								{ id: 2, name: 'Пепперони', imageUrl: 'https://www.allrecipes.com/thmb/D73VvwH_cG06pVzh05oitTocYV8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg', price: 100, items: [{ price: 100 }] },
								{ id: 3, name: '', imageUrl: '', price: 100, items: [{ price: 100 }] },
								{ id: 4, name: '', imageUrl: '', price: 100, items: [{ price: 100 }] },
								{ id: 5, name: '', imageUrl: '', price: 100, items: [{ price: 100 }] },
							]}
						/>
					</div>
				</div>
			</Container>
		</>
	);
}
