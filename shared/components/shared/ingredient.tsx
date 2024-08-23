import { cn } from '@/shared/lib/utils';
import { Ingredient as IngredientType } from '@prisma/client';
import { CircleCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react';

interface Props extends IngredientType {
	active?: boolean;
	onClick?: () => void;
	className?: string;
}

export const Ingredient: React.FC<Props> = ({ name, active, onClick, imageUrl, price, className }) => {
	return (
		<div onClick={onClick} className={cn('flex items-center flex-col p-1 rounded-md w-32 text-center relative cursor-pointer shadow-md bg-white', { 'border border-primary': active }, className)}>
			{active && <CircleCheck className='absolute top-2 right-2 text-primary' />}
			<Image width={110} height={110} sizes={'100%'} alt={name} src={imageUrl} />
			<span className='text-xs mb-1'>{name}</span>
			<span className='font-bold'>{price} ₽</span>
		</div>
	);
};
