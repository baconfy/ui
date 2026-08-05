import { Link, router } from '@inertiajs/react';
import { MoreVertical, Trash2 } from 'lucide-react';
import { type ComponentProps, createContext, use } from 'react';

import destroyNotification from '@/actions/App/Http/Controllers/Notifications/DestroyNotificationController';
import openNotification from '@/actions/App/Http/Controllers/Notifications/OpenNotificationController';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
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
 * A plain container, not a link. The whole row is still clickable — the title
 * stretches its own hit area across it — but the link stays a sibling of the
 * delete control rather than its parent, because the HTML content model of `a`
 * forbids an interactive descendant.
 *
 * Vertical rhythm belongs to the list, not the row: no margin here.
 */
export function NotificationRow({ notification, className, ...props }: { notification: Notification } & ComponentProps<'div'>) {
    return (
        <NotificationContext value={notification}>
            <div className={cn('clickable group/row relative flex items-start gap-3 rounded-lg mx-0.5 px-3 py-2.5 transition-colors', 'hover:bg-accent focus-within:bg-accent', className)} {...props} />
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

    return <span className={cn('flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full transition-colors [&_svg]:size-4', unread ? TONES[notification.data.tone ?? 'neutral'] : 'bg-muted text-muted-foreground', className)} {...props} />;
}

/**
 * The text column. `flex-1` is what pushes whatever follows — usually the time
 * and the marker — onto a fixed right edge instead of trailing each title's
 * width.
 */
export function NotificationBody({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('grid min-w-0 flex-1 gap-0.5', className)} {...props} />;
}

/** The first line: title, then time, then the marker. */
export function NotificationHeader({ className, ...props }: ComponentProps<'div'>) {
    return <div className={cn('flex items-center gap-2', className)} {...props} />;
}

/**
 * The title and the row's link.
 *
 * `after:inset-0` stretches the anchor's hit area over the whole row, so the
 * link keeps real text for its accessible name while the reader can click
 * anywhere. The cost is that the description below cannot be selected — the
 * overlay is on top of it.
 */
export function NotificationTitle({ children, className, ...props }: ComponentProps<typeof Link> & { children: string }) {
    const notification = useNotification();
    const unread = !notification.read_at;

    const navigates = Boolean(notification.data.url);

    return (
        <Link href={openNotification(notification.id)} only={navigates ? undefined : ['notifications', 'unreadCount']} preserveScroll={!navigates} className={cn('block min-w-0 flex-1 truncate text-sm font-bold tracking-tight after:absolute after:inset-0 after:rounded-lg', unread ? 'text-foreground' : 'text-muted-foreground', className)} {...props}>
            <InlineMarkdown>{children}</InlineMarkdown>
        </Link>
    );
}

/** The detail under the title, clamped to two lines. Rendered as inline Markdown. */
export function NotificationDescription({ children, className, ...props }: ComponentProps<'p'> & { children: string }) {
    return (
        <p className={cn('line-clamp-2 text-xs leading-snug text-muted-foreground/80', className)} {...props}>
            <InlineMarkdown>{children}</InlineMarkdown>
        </p>
    );
}

/**
 * Relative time, on a line of its own beneath the text rather than beside the
 * title. Sitting on the first line it competed with the title for the same
 * horizontal space and truncated it; underneath, it reads as a timestamp and
 * the title gets the full width.
 */
export function NotificationTime({ className, ...props }: ComponentProps<'span'>) {
    const notification = useNotification();

    return (
        <span className={cn('text-[0.6875rem] leading-4 text-muted-foreground/70', className)} {...props}>
            {relativeTime(notification.created_at)}
        </span>
    );
}

/**
 * The right edge of the first line. It holds one of two things and never both:
 * the unread dot, or the control that throws the row away.
 *
 * The order is the point. A notification cannot be deleted before it has been
 * opened — enforced on the server, not just hidden here — so "I never got it"
 * stops being a story anybody can tell. That the dot and the X are mutually
 * exclusive states falls out of the same rule, and is why they can share one
 * slot without ever competing for it.
 *
 * Fixed width either way, so the time lands on the same edge in both states.
 */
export function NotificationMarker({ className, ...props }: ComponentProps<'span'>) {
    const notification = useNotification();

    if (!notification.read_at) {
        return (
            <span className={cn('flex size-4 shrink-0 items-center justify-center', className)} {...props}>
                <span className="size-1.5 rounded-full bg-primary" />
            </span>
        );
    }

    return (
        <span className={cn('flex size-4 shrink-0 items-center justify-center', className)} {...props}>
            <DropdownMenu>
                <DropdownMenuTrigger
                    render={
                        <button type="button" aria-label="Notification options" className="relative rounded-xs text-muted-foreground transition-colors hover:text-foreground">
                            <MoreVertical className="size-3.5" />
                        </button>
                    }
                />

                <DropdownMenuContent className="min-w-60" align="end">
                        <DropdownMenuItem variant="destructive" className="whitespace-nowrap" onClick={() => router.visit(destroyNotification(notification.id), { only: ['unreadCount'], reset: ['notifications'], preserveScroll: true })}>
                            <Trash2 />
                            Delete notification
                        </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </span>
    );
}
