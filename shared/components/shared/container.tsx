import { cn } from '@/shared/lib/utils';
import React, { ReactNode } from 'react';

interface Props {
	className?: string;
	children: ReactNode;
}

export const Container: React.FC<Props> = ({ className, children }) => {
	return <div className={cn('max-w-[1280px] mx-auto px-3', className)}>{children}</div>;
};
