import { Container, Filters, ProductCard, TopBar } from '@/components/shared/_index';
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
						<div>
							<ProductCard className='mb-10' id={1} name='Pizza Margherita' price={10} imageUrl='https://www.allrecipes.com/thmb/D73VvwH_cG06pVzh05oitTocYV8=/0x512/filters:no_upscale():max_bytes(150000):strip_icc()/48727-Mikes-homemade-pizza-DDMFS-beauty-4x3-BG-2974-a7a9842c14e34ca699f3b7d7143256cf.jpg' />
						</div>
					</div>
				</div>
			</Container>
		</>
	);
}
