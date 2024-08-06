import { Header } from '@/components/shared/header';
import { Button } from '@/components/ui/button';

export default function Home() {
	return (
		<>
			<Header />
			<main>
				Home <Button variant='outline'>Cart</Button>
			</main>
		</>
	);
}
