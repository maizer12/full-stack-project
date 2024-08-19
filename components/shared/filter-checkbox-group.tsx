'use client';
import React, { useState } from 'react';
import { FilterCheckbox, FilterCheckboxProps } from './filter-checkbox';
import { Input, Skeleton } from '../ui/_index';
import { Plus } from 'lucide-react';

type Item = FilterCheckboxProps;

interface Props {
	title: string;
	items: Item[];
	defaultItems?: Item[];
	limit?: number;
	loading: boolean;
	searchInputPlaceholder?: string;
	onClickCheckbox?: (id: string) => void;
	selected?: Set<string>;
	defaultValue?: string[];
	className?: string;
	name: string;
}

export const FilterCheckboxGroup: React.FC<Props> = ({ title, items, defaultItems, limit = 5, searchInputPlaceholder = 'Search...', onClickCheckbox, defaultValue, loading, name, selected, className }) => {
	const [showAll, setShowAll] = useState(false);
	const [search, setSearch] = useState('');

	const list = showAll ? items.filter(item => item.text.toLowerCase().includes(search.toLowerCase())) : items.slice(0, limit);

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
	};

	if (loading) {
		return (
			<div className={className}>
				<p className='font-bold mb-3'>{title}</p>
				{Array.from({ length: limit }).map((_, index) => (
					<Skeleton key={index} className='h-6 mb-4 rounded-[8px]' />
				))}
				<div className='border-y-neutral-100 border-t mt-4'>
					<Skeleton className='h-6 w-[30%] mt-3 mb-4 rounded-[8px]' />
				</div>
			</div>
		);
	}

	return (
		<div className={className}>
			<p className='font-bold mb-3'>{title}</p>
			{showAll && (
				<div className='mb-5'>
					<Input placeholder={searchInputPlaceholder} onChange={handleSearch} className='bg-gray-50 border-none' />
				</div>
			)}
			<div className='flex flex-col gap-4 max-h-96 pr-2 overflow-auto scrollbar'>
				{list.map((item, index) => (
					<FilterCheckbox key={item.value + index} value={item.value} text={item.text} endAdornment={item.endAdornment} checked={selected?.has(item.value)} onCheckedChange={() => onClickCheckbox?.(item.value)} name={name} />
				))}
			</div>
			{items.length > limit && (
				<div className='border-y-neutral-100 border-t mt-4'>
					<button className='text-primary flex justify-center items-center gap-1 mt-3 hover:text-orange-300 duration-500' onClick={() => setShowAll(!showAll)}>
						{showAll ? (
							'Hide items'
						) : (
							<>
								<Plus size={14} /> Open all
							</>
						)}
					</button>
				</div>
			)}
		</div>
	);
};
