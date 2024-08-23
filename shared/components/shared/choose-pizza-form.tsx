import { cn } from '@/shared/lib/utils';
import React from 'react';
import { ProductImage, ProductOptions } from './_index';
import { Button, Title } from '../ui/_index';
import { IPizzaSize, IPizzaType, pizzaSizes, pizzaType } from '@/shared/constants/pizza';

interface Props {
	imageUrl: string;
	name: string;
	className?: string;
	ingredients: any;
	items?: any;
	onClickAdd: () => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({ className, imageUrl, name, ingredients, items, onClickAdd }) => {
	const [size, setSize] = React.useState<IPizzaSize>(30);
	const [chooseType, setChooseType] = React.useState(1);
	const desc = '30 cm, traditional dough 30';
	const totalPrice = 400;

	return (
		<div className={cn(className, 'flex flex-1')}>
			<ProductImage src={imageUrl} size={size} alt={name} />
			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} />
				<p className='text-gray-400'>{desc}</p>
				<div className='flex flex-col gap-4 mt-5'>
					<ProductOptions items={pizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as IPizzaSize)} />
					<ProductOptions items={pizzaType} value={String(chooseType)} onClick={value => setChooseType(Number(value) as IPizzaType)} />
				</div>
				<Button className='h-[55px] px-10 text-base mt-10 rounded-[18px] w-full'>Add to cart for {totalPrice} $</Button>
			</div>
		</div>
	);
};
