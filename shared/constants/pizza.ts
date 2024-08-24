export const mapPizzaSize = {
	20: 'Small',
	30: 'Medium',
	40: 'Large',
} as const;

export const mapPizzaType = {
	1: 'Thin',
	2: 'Traditional',
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
