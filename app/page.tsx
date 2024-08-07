import { Container, Filters, TopBar } from '@/components/shared/_index';
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
						<div>List of products!</div>
					</div>
				</div>
			</Container>
		</>
	);
}
