import { createContext, use, type ComponentProps } from 'react';

import { InlineMarkdown } from '@/components/ui/markdown';
import { relativeTime } from '@/lib/datetime';
import { cn } from '@/lib/utils';
import type { Notification, NotificationTone } from '@/types/shell';

/**
 * The chrome every notification row shares, as composable parts.
 *
 * A row type in `components/domain/notifications` assembles these in whatever
 * order it needs — the layout is the order of the children, not a fixed frame.
 * Anything a type wants that is not here, it writes itself.
 */
const NotificationContext = createContext<Notification | null>(null);

function useNotification(): Notification {
    const notification = use(NotificationContext);

    if (!notification) {
        throw new Error('Notification parts must be rendered inside <NotificationRow>.');
    }

    return notification;
}

/**
 * The row itself. Publishes the notification so the parts below can read
 * `read_at` and `created_at` without being handed them one by one.
 *
 * Vertical rhythm belongs to the list, not the row: no margin here.
 */
export function NotificationRow({ notification, className, ...props }: { notification: Notification } & ComponentProps<'button'>) {
    return (
        <NotificationContext value={notification}>
            <button type="button" className={cn('clickable group/row relative flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors', 'hover:bg-accent focus-visible:bg-accent focus-visible:outline-none', className)} {...props} />
        </NotificationContext>
    );
}

/**
 * The tone colours the well, and only while the row is unread — once read every
 * tone falls back to the same grey, so "have I seen this" outranks "what kind is
 * it".
 */
const TONES: Record<NotificationTone, string> = {
    neutral: 'bg-primary/10 text-primary',
    info: 'bg-info/10 text-info',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-destructive/10 text-destructive',
};

/** The 32px well. Put a Lucide icon in it, or an avatar, or initials. */
export function NotificationIcon({ className, ...props }: ComponentProps<'span'>) {
    const notification = useNotification();
    const unread = !notification.read_at;

    return <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors [&_svg]:size-4', unread ? TONES[notification.data.tone ?? 'neutral'] : 'bg-muted text-muted-foreground', className)} {...props} />;
}

/**
 * The text column. `flex-1` is what pushes whatever follows — usually the dot —
 * onto a fixed right edge instead of trailing each title's width.
 */
export function NotificationBody({ className, ...props }: ComponentProps<'span'>) {
    return <span className={cn('grid min-w-0 flex-1 gap-0.5', className)} {...props} />;
}

/** Relative time, sized as a label rather than as content. */
export function NotificationTime({ className, ...props }: ComponentProps<'span'>) {
    const notification = useNotification();

    return (
        <span className={cn('text-[0.6875rem] leading-none text-muted-foreground/70', className)} {...props}>
            {relativeTime(notification.created_at)}
        </span>
    );
}

/** The sentence. Rendered as inline Markdown, clamped to two lines. */
export function NotificationTitle({ children, className, ...props }: ComponentProps<'span'> & { children: string }) {
    const notification = useNotification();
    const unread = !notification.read_at;

    return (
        <span className={cn('line-clamp-2 text-xs leading-relaxed', unread ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground', className)} {...props}>
            <InlineMarkdown>{children}</InlineMarkdown>
        </span>
    );
}

/** The unread marker. Stays in the layout when read, so rows never shift. */
export function NotificationDot({ className, ...props }: ComponentProps<'span'>) {
    const notification = useNotification();

    return <span className={cn('mt-1 size-1.5 shrink-0 rounded-full transition-colors', notification.read_at ? 'bg-transparent' : 'bg-primary', className)} {...props} />;
}
