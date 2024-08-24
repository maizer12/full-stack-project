import { cn } from '@/shared/lib/utils';
import React from 'react';
import { Ingredient, ProductImage, ProductOptions } from './_index';
import { Button, Title } from '../ui/_index';
import { IPizzaSize, IPizzaType, mapPizzaType, pizzaSizes, pizzaType } from '@/shared/constants/pizza';
import { Ingredient as IngredientType, ProductVariation } from '@prisma/client';
import { useSet } from 'react-use';
import { DialogDescription } from '../ui/dialog';

interface Props {
	imageUrl: string;
	name: string;
	className?: string;
	ingredients: IngredientType[];
	items: ProductVariation[];
	onClickAddCart?: () => void;
}

export const ChoosePizzaForm: React.FC<Props> = ({ className, imageUrl, name, ingredients, items, onClickAddCart }) => {
	const [chooseIngredients, { toggle: setChooseIngredients }] = useSet(new Set<number>([]));
	const [size, setSize] = React.useState<IPizzaSize>(30);
	const [chooseType, setChooseType] = React.useState(1);

	const desc = `${size} cm, ${mapPizzaType[chooseType as keyof typeof mapPizzaType]} dough 30`;

	const totalIngredientsPrice = ingredients.filter(ingredient => chooseIngredients.has(ingredient.id)).reduce((acc, ingredient) => acc + ingredient.price, 0);
	const totalVariationPrice = items.find(item => item.size === size && item.pizzaType === chooseType)?.price ?? 0;

	const totalPrice = totalIngredientsPrice + totalVariationPrice;

	const handelClickAddCart = () => {
		onClickAddCart?.();
		console.log({
			size,
			type: chooseType,
			ingredients: Array.from(chooseIngredients),
		});
	};

	const availablePizza = items.filter(item => item.pizzaType === chooseType);
	const availablePizzaSizes = pizzaSizes.map(item => {
		return {
			name: item.name,
			value: item.value,
			disabled: !availablePizza.some(pizza => Number(pizza.size) === Number(item.value)),
		};
	});

	React.useEffect(() => {
		const checkAvailablePizza = availablePizza.find(pizza => pizza.size === size);
		if (!!checkAvailablePizza) return;
		setSize(availablePizza[0].size as IPizzaSize);
	}, [chooseType]);

	return (
		<div className={cn(className, 'flex flex-1')}>
			<ProductImage src={imageUrl} size={size} alt={name} />
			<div className='w-[490px] bg-[#f7f6f5] p-7'>
				<Title text={name} />
				<DialogDescription className='text-gray-400'>{desc}</DialogDescription>
				<div className='flex flex-col gap-4 mt-5'>
					<ProductOptions items={availablePizzaSizes} value={String(size)} onClick={value => setSize(Number(value) as IPizzaSize)} />
					<ProductOptions items={pizzaType} value={String(chooseType)} onClick={value => setChooseType(Number(value) as IPizzaType)} />
					<div className=' bg-gray-50 p-5 rounded-md h-[420px] overflow-auto scrollbar'>
						<div className='grid grid-cols-3 gap-3'>
							{ingredients.map(ingredient => (
								<Ingredient key={ingredient.id} active={chooseIngredients?.has(ingredient.id)} {...ingredient} onClick={() => setChooseIngredients(ingredient.id)} />
							))}
						</div>
					</div>
				</div>
				<Button className='h-[55px] px-10 text-base mt-10 rounded-[18px] w-full' onClick={handelClickAddCart}>
					Add to cart for {totalPrice} $
				</Button>
			</div>
		</div>
	);
};
