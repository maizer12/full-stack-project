import React from 'react';
import { Metadata } from 'next';
import { Header } from '@/shared/components/shared/header';

export const metadata: Metadata = {
	title: 'Pizza Shop',
};

export default function HomeLayout({
	children,
	modal,
}: Readonly<{
	children: React.ReactNode;
	modal: React.ReactNode;
}>) {
	return (
		<main>
			<Header />
			{children}
			{modal}
		</main>
	);
}
