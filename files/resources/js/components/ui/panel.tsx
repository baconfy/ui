import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

export function Panel({ className, children, ...props }: ComponentProps<'div'>) {
    return (
        <div className={cn('flex min-w-0 rounded-(--panel-radius) border-(length:--panel-border) border-foreground/10 p-(--panel-frame-padding) backdrop-blur-2xl backdrop-brightness-95 dark:backdrop-brightness-105', className)} {...props}>
            <div className="flex min-w-0 grow flex-col gap-(--panel-gap) rounded-(--panel-card-radius) bg-card p-(--panel-padding) shadow-sm">{children}</div>
        </div>
    );
}
