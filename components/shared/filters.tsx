'use client';
import React from 'react';
import { Input, Title } from '../ui/_index';
import { RangeSlider } from './range-slider';
import { FilterCheckboxGroup } from './filter-checkbox-group';
import { useFilterIngredient, useFilters } from '@/hooks/_index';

interface FilterPricesProps {
	min: number;
	max: number;
	step?: number;
	onValueChange?: (values: number[]) => void;
}

interface Props {
	priceFilter: FilterPricesProps;
	className?: string;
}

export const Filters: React.FC<Props> = ({ priceFilter, className }) => {
	const { ingredients, isLoading } = useFilterIngredient();
	const { price, updatePrice, sizes, toggleSizes, pizzaTypes, togglePizzaTypes, setPrice, toggleIngredients, selectedIngredients } = useFilters(priceFilter);

	return (
		<div className={className}>
			<Title text='Filtration:' size='sm' className='font-bold mb-5' />
			<FilterCheckboxGroup
				name='pizzaTypes'
				className='mb-5'
				title='Type of Dough:'
				selected={pizzaTypes}
				loading={false}
				onClickCheckbox={togglePizzaTypes}
				items={[
					{ text: 'Thin', value: '1' },
					{ text: 'Traditional', value: '2' },
				]}
			/>
			<FilterCheckboxGroup
				name='sizes'
				className='mb-5'
				loading={false}
				selected={sizes}
				onClickCheckbox={toggleSizes}
				title='Size:'
				items={[
					{ text: '20 см', value: '20' },
					{ text: '30 см', value: '30' },
					{ text: '40 см', value: '40' },
				]}
			/>

			<div className='pt-5 pb-6 border-y-neutral-100 border-y'>
				<p className='font-bold mb-3.5'>Price from and to</p>
				<div className='flex gap-3 mb-5'>
					<Input type='number' value={price.from} onChange={e => updatePrice('from', Number(e.target.value))} />
					<Input type='number' value={price.to} onChange={e => updatePrice('to', Number(e.target.value))} />
				</div>
				<RangeSlider min={0} step={1} max={100} value={[price.from, price.to]} onValueChange={value => setPrice({ from: value[0], to: value[1] })} />
			</div>
			<FilterCheckboxGroup title='Ingredients:' items={ingredients} limit={6} className='mt-5' loading={isLoading} onClickCheckbox={id => toggleIngredients(id)} name='ingredients' selected={selectedIngredients} />
		</div>
	);
};
