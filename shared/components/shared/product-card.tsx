import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { Button, Title } from '../ui/_index';
import { Plus } from 'lucide-react';

interface Props {
	id: number;
	name: string;
	price: number;
	imageUrl?: string;
	className?: string;
}

export const ProductCard: React.FC<Props> = ({ id, name, price, imageUrl, className }) => {
	return (
		<div className={className}>
			<Link href={`/product/${id}`}>
				<div className='flex justify-center p-6 bg-secondary rounded-lg h-[260px]'>{!!imageUrl && <Image width={215} height={215} src={imageUrl} alt={name} />}</div>

				<Title text={name} size='sm' className='mb-1 mt-3 font-bold' />

				<p className='text-sm text-gray-400'>Цыпленок, моцарелла, сыры чеддер и пармезан, сырный соус, томаты, соус альфредо, чеснок</p>
				<div className='flex justify-between items-center mt-4'>
					<span className='text-[20px]'>
						from <b>{price} $</b>
					</span>

					<Button variant='secondary' className='text-base font-bold'>
						<Plus className='mr-1' size={20} />
						Добавить
					</Button>
				</div>
			</Link>
		</div>
	);
};
