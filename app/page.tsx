import { Categories, Container, SortPopup } from '@/components/shared/_index';
import { Button } from '@/components/ui/button';
import { Title } from '@/components/ui/title';

export default function Home() {
	return (
		<>
			<Container>
				<Title text='All pizzas:' size='lg' className='font-bold mt-10 mb-5' />
				<Categories />
				<SortPopup />
			</Container>
		</>
	);
}
