'use client';
import { cn } from '@/shared/lib/utils';
import { Api } from '@/shared/services/api-client';
import { Product } from '@prisma/client';
import { SearchIcon, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useClickAway, useDebounce } from 'react-use';

interface Props {
	className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
	const [searchQuery, setSearchQuery] = React.useState('');
	const [products, setProducts] = React.useState<Product[]>([]);
	const ref = React.useRef(null);
	const [focused, setFocused] = React.useState(false);

	useClickAway(ref, () => setFocused(false));

	useDebounce(
		() => {
			Api.products.search(searchQuery).then(res => setProducts(res));
		},
		300,
		[searchQuery]
	);

	const onClickLink = () => {
		setProducts([]);
		setSearchQuery('');
		setFocused(false);
	};

	return (
		<div className='relative  w-[70%]'>
			{focused && <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30'></div>}
			<div className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)} ref={ref}>
				<SearchIcon className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input className='rounded-2xl outline-none bg-gray-100 w-full pl-11 placeholder:duration-300 focus:placeholder:opacity-0' type='text' placeholder='Enter your search...' onFocus={() => setFocused(true)} onChange={e => setSearchQuery(e.target.value)} value={searchQuery} />
				{!!searchQuery.length && <X className='absolute top-1/2 translate-y-[-50%] right-3 h-5 text-gray-400 cursor-pointer hover:text-black duration-300' onClick={() => setSearchQuery('')} />}
			</div>
			<div className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30', { ['visible opacity-100 top-12']: focused })}>
				{products.map(product => (
					<Link href={`/product/${product.id}`} className='py-2.5 px-6 flex gap-3 hover:bg-primary/10 duration-300 items-center' key={product.id} onClick={onClickLink}>
						<Image src={product.imageUrl} width={32} height={32} alt={product.name} />
						<span>{product.name}</span>
					</Link>
				))}
			</div>
		</div>
	);
};
