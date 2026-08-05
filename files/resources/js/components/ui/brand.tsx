import type { ComponentProps } from 'react';

import { cn } from '@/lib/utils';
import { Telescope } from 'lucide-react';

export function Brand({ className, ...props }: ComponentProps<'span'>) {
    return (
        <span data-slot="brand" className={cn('font-title text-primary font-black tracking-tight', className)} {...props}>
            StarterKit
        </span>
    );
}

export function BrandIcon({ className, ...props }: ComponentProps<typeof Telescope>) {
    return (
        <Telescope {...props} className={cn('size-6 stroke-2 text-secondary', className)} />
    );
}
