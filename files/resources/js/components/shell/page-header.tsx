import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface PageHeaderProps {
    title: string;
    description?: string;
    children?: ReactNode;
    className?: string;
}

export function PageHeader({ title, description, children, className }: PageHeaderProps) {
    return (
        <header className={cn('flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between', className)}>
            <div className="grid min-w-0 gap-2">
                <h1 className="truncate font-heading text-2xl leading-8 font-bold text-primary md:text-3xl md:leading-10">{title}</h1>

                {description && <p className="text-sm leading-6 text-muted-foreground">{description}</p>}
            </div>

            {children && <div className="flex shrink-0 items-center gap-2 max-sm:w-full">{children}</div>}
        </header>
    );
}
