'use client';
import React from 'react';
import { Title } from '../ui/_index';
import { ProductCard } from './_index';
import { cn } from '@/lib/utils';
import { useIntersection } from 'react-use';
import { useCategory } from '@/store/category';

interface Props {
	title: string;
	items: any[];
	className?: string;
	listClassName?: string;
	categoryId: number;
}

export const ProductsGroupList: React.FC<Props> = ({ title, items, className, listClassName, categoryId }) => {
	const setActiveCategoryId = useCategory(state => state.setActiveId);
	const intersectionRef = React.useRef(null);
	const intersection = useIntersection(intersectionRef, {
		root: null,
		rootMargin: '0px',
		threshold: 0.4,
	});

	React.useEffect(() => {
		if (intersection && intersection.isIntersecting) {
			console.log(title, categoryId);
			setActiveCategoryId(categoryId);
		}
	}, [intersection, categoryId, title, setActiveCategoryId]);

	console.log(items);

	return (
		<div className={className} id={categoryId.toString()} ref={intersectionRef}>
			<Title text={title} size='lg' className='font-extrabold mb-5' />
			<div className={cn('grid grid-cols-3 gap-[50px]', listClassName)}>
				{items.map((product, i) => (
					<ProductCard key={product.id} id={product.id} name={product.name} imageUrl={product.imageUrl} price={product.variation.price} />
				))}
			</div>
		</div>
	);
};
