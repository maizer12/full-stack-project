import React from 'react';
import { Popover, PopoverTrigger } from '../ui/popover';
import { cn } from '@/shared/lib/utils';
import { ArrowUpDown } from 'lucide-react';

interface Props {
	className?: string;
}

export const SortPopup: React.FC<Props> = ({ className }) => {
	return (
		<div className={className}>
			<Popover>
				<PopoverTrigger className={cn('inline-flex items-center gap-1 bg-gray-50 px-5 h-[52px] rounded-2xl cursor-pointer gap-2.5', className)}>
					<ArrowUpDown className='w-4 h-4' />
					<b>Sort by:</b>
					<b className='text-primary'>rating</b>
				</PopoverTrigger>
			</Popover>
		</div>
	);
};
