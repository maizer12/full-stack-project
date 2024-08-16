'use client';
import { cn } from '@/lib/utils';
import { SearchIcon } from 'lucide-react';
import React from 'react';
import { useClickAway } from 'react-use';

interface Props {
	className?: string;
}

export const Search: React.FC<Props> = ({ className }) => {
	const ref = React.useRef(null);
	const [focused, setFocused] = React.useState(false);

	useClickAway(ref, () => setFocused(false));

	return (
		<div className='relative  w-[70%]'>
			{focused && <div className='fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-30'></div>}
			<div className={cn('flex rounded-2xl flex-1 justify-between relative h-11 z-30', className)} ref={ref}>
				<SearchIcon className='absolute top-1/2 translate-y-[-50%] left-3 h-5 text-gray-400' />
				<input className='rounded-2xl outline-none bg-gray-100 w-full pl-11 placeholder:duration-300 focus:placeholder:opacity-0' type='text' placeholder='Enter your search...' onFocus={() => setFocused(true)} />
			</div>
			<div className={cn('absolute w-full bg-white rounded-xl py-2 top-14 shadow-md transition-all duration-200 invisible opacity-0 z-30', { ['visible opacity-100 top-12']: focused })}>Products list!</div>
		</div>
	);
};
