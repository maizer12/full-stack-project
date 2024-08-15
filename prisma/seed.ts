import { categories, ingredients, products } from './constants';
import { prisma } from './prisma-client';
import bcrypt from 'bcrypt';

async function up() {
	await prisma.user.createMany({
		data: [
			{ fullName: 'John Doe', email: 'johndoe@me.com', password: bcrypt.hashSync('password', 10), verified: false, role: 'USER' },
			{ fullName: 'Jane Smith', email: 'janesmith@me.com', password: bcrypt.hashSync('password', 10), verified: false, role: 'USER' },
			{ fullName: 'Bob Johnson', email: 'bobjohnson@me.com', password: bcrypt.hashSync('password', 10), verified: false, role: 'USER' },
			{ fullName: 'Alice Brown', email: 'alicebrown@me.com', password: bcrypt.hashSync('password', 10), verified: false, role: 'USER' },
			{ fullName: 'Charlie Wilson', email: 'charliewilson@me.com', password: bcrypt.hashSync('password', 10), verified: false, role: 'USER' },
		],
	});

	await prisma.category.createMany({
		data: categories,
	});

	await prisma.ingredient.createMany({
		data: ingredients,
	});

	await prisma.product.createMany({
		data: products,
	});
}
async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`;
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`;
}
async function main() {
	try {
		await down();
		await up();
	} catch (e) {
		console.log(e);
	}
}

main()
	.catch(e => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
