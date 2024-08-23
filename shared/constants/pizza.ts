const mapPizzaSize = {
	20: 'Small',
	30: 'Medium',
	40: 'Large',
} as const;

const mapPizzaType = {
	1: 'Traditional',
	2: 'Thin',
} as const;

export const pizzaSizes = Object.entries(mapPizzaSize).map(([value, name]) => ({
	name,
	value,
}));

export const pizzaType = Object.entries(mapPizzaType).map(([value, name]) => ({
	name,
	value,
}));

export type IPizzaSize = keyof typeof mapPizzaSize;
export type IPizzaType = keyof typeof mapPizzaType;
