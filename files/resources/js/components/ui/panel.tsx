import type { ComponentProps } from 'react';
import { cn } from '@/lib/utils';

/**
 * Inset rings rather than borders. They draw the same hairlines, but as
 * box-shadows, so neither one takes room in the box — the panel's chrome comes
 * to a round 24px (frame plus padding) instead of 26. That is what lets the
 * first row inside a panel line up with anything outside it, and it keeps the
 * whole shell on the 8px grid instead of two hairlines away from it.
 *
 * `--panel-border` still drives the width, so setting it to 0 hides them exactly
 * as before.
 */
export function Panel({ className, children, ...props }: ComponentProps<'div'>) {
    return (
        <div data-slot="panel" className={cn('flex min-w-0 rounded-(--panel-radius) p-(--panel-frame-padding) inset-ring-(length:--panel-border) inset-ring-foreground/5 backdrop-blur-xl backdrop-brightness-95 dark:backdrop-brightness-105', className)} {...props}>
            <div data-slot="panel-content" className="flex min-w-0 grow flex-col gap-(--panel-gap) overflow-hidden rounded-(--panel-card-radius) bg-card p-(--panel-padding) inset-ring-(length:--panel-border) inset-ring-foreground/10 shadow-xs">{children}</div>
        </div>
    );
}
