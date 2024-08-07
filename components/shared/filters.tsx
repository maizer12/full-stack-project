import React from 'react';
import { Input, Title } from '../ui/_index';
import { FilterCheckbox } from './filter-checkbox';

interface Props {
	className?: string;
}

export const Filters: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Title text='Filtration:' size='sm' className='font-bold mb-5' />
			<div className='flex flex-col gap-4 pb-5'>
				<FilterCheckbox value='0' text='Can be custom-made' />
				<FilterCheckbox value='1' text='New items' />
			</div>
			<div className='pt-5 pb-6 border-y-neutral-100 border-y'>
				<p className='font-bold mb-3.5'>Price from and to</p>
				<div className='flex gap-3 mb-5'>
					<Input type='number' placeholder='0' defaultValue={0} />
					<Input type='number' defaultValue={10} />
				</div>
			</div>
		</div>
	);
};
