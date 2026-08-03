import { usePage } from '@inertiajs/react';
import { Bell, BellOff, BellRing, CalendarClock, CheckCheck, FileText, MessageSquare, ShieldAlert, TriangleAlert, UserPlus } from 'lucide-react';
import type { ComponentType, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ui/panel';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import type { AppNotification, NotificationTone } from '@/types/shell';

const ICONS: Record<string, ComponentType<{ className?: string }>> = { FileText, MessageSquare, ShieldAlert, TriangleAlert, UserPlus, CalendarClock };

/**
 * A notification's type shows up as the colour of its icon well. The tone is only
 * worn while the row is unread — once read, every type falls back to the same
 * muted grey, so "have I seen this" always outranks "what kind is it".
 */
const TONES: Record<NotificationTone, string> = {
    neutral: 'bg-primary/10 text-primary',
    info: 'bg-info/10 text-info',
    success: 'bg-success/10 text-success',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-destructive/10 text-destructive',
};

const linkTab = cn('h-auto flex-none link rounded-none border-0 p-0 text-xs after:hidden', 'focus-visible:border-transparent focus-visible:underline focus-visible:ring-0 focus-visible:outline-none', 'hover:text-primary! data-active:font-bold data-active:text-primary!', 'not-data-active:text-muted-foreground not-data-active:hover:text-foreground!');

/**
 * The smallest useful slice of Markdown: `**bold**`, `*italic*` and `` `code` ``.
 *
 * Rendered to React elements rather than HTML, so there is no injection surface
 * and no dependency to add. Links are deliberately absent — the row is already a
 * button, and an anchor inside a button is invalid markup with an ambiguous
 * click target. A notification's destination belongs in `data.url`.
 */
const INLINE = /\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`/g;

function renderInline(text: string): ReactNode[] {
    const nodes: ReactNode[] = [];
    let cursor = 0;

    for (const match of text.matchAll(INLINE)) {
        const [token, bold, italic, code] = match;

        if (match.index > cursor) {
            nodes.push(text.slice(cursor, match.index));
        }

        if (bold !== undefined) {
            nodes.push(<strong key={match.index} className="font-bold">{bold}</strong>);
        } else if (italic !== undefined) {
            nodes.push(<em key={match.index}>{italic}</em>);
        } else {
            nodes.push(
                <code key={match.index} className="rounded bg-muted px-1 py-0.5 font-mono text-[0.9em]">
                    {code}
                </code>,
            );
        }

        cursor = match.index + token.length;
    }

    nodes.push(text.slice(cursor));

    return nodes;
}

const RELATIVE = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

/** Coarse buckets only — a notification row never needs more precision than this. */
function relativeTime(iso: string): string {
    const minutes = Math.round((Date.parse(iso) - Date.now()) / 60_000);

    if (Math.abs(minutes) < 60) {
        return RELATIVE.format(minutes, 'minute');
    }

    if (Math.abs(minutes) < 1440) {
        return RELATIVE.format(Math.round(minutes / 60), 'hour');
    }

    return RELATIVE.format(Math.round(minutes / 1440), 'day');
}

/** `Today` / `Yesterday` / `12 March` — the sticky heading for each run of rows. */
function dayLabel(iso: string): string {
    const date = new Date(iso);
    const midnight = new Date();
    midnight.setHours(0, 0, 0, 0);

    const days = Math.floor((midnight.getTime() - date.getTime()) / 86_400_000) + 1;

    if (days <= 0) {
        return 'Today';
    }

    if (days === 1) {
        return 'Yesterday';
    }

    return date.toLocaleDateString('en', { day: 'numeric', month: 'long' });
}

function groupByDay(notifications: AppNotification[]) {
    const groups: { label: string; items: AppNotification[] }[] = [];

    for (const notification of notifications) {
        const label = dayLabel(notification.created_at);
        const last = groups.at(-1);

        if (last?.label === label) {
            last.items.push(notification);
        } else {
            groups.push({ label, items: [notification] });
        }
    }

    return groups;
}

function NotificationRow({ notification }: { notification: AppNotification }) {
    const Icon = ICONS[notification.data.icon ?? ''] ?? Bell;
    const unread = !notification.read_at;

    return (
        <button type="button" className={cn('group/row relative flex w-full clickable items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors', 'hover:bg-accent focus-visible:bg-accent focus-visible:outline-none')}>
            <span className={cn('flex size-8 shrink-0 items-center justify-center rounded-lg transition-colors', unread ? TONES[notification.data.tone ?? 'neutral'] : 'bg-muted text-muted-foreground')}>
                <Icon className="size-4" />
            </span>

            {/* `flex-1` so the text block fills the row and the dot is pushed to a
                fixed right edge — without it the dot trails each title's width. */}
            <span className="grid min-w-0 flex-1 gap-1">
                <span className={cn('line-clamp-2 text-xs leading-relaxed', unread ? 'font-semibold text-foreground' : 'font-medium text-muted-foreground')}>{renderInline(notification.data.title)}</span>
                <span className="text-xs text-muted-foreground/80">{relativeTime(notification.created_at)}</span>
            </span>

            <span className={cn('mt-3 size-1.5 shrink-0 rounded-full transition-colors', unread ? 'bg-primary' : 'bg-transparent')} />
        </button>
    );
}

function NotificationList({ notifications, empty }: { notifications: AppNotification[]; empty: string }) {
    if (notifications.length === 0) {
        return (
            <div className="flex min-h-56 flex-col items-center justify-center gap-3 px-6 text-center">
                <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                    <BellOff className="size-5" />
                </span>

                <span className="grid gap-1">
                    <span className="text-sm font-semibold text-foreground">{empty}</span>
                    <span className="text-xs text-muted-foreground">We'll let you know the moment something happens.</span>
                </span>
            </div>
        );
    }

    return (
        <div className="-mx-2 no-scrollbar max-h-96 min-h-56 overflow-y-auto overscroll-contain">
            {groupByDay(notifications).map((group) => (
                <section key={group.label} className="grid gap-0.5">
                    <h3 className="sticky top-0 z-10 bg-card/85 py-1.5 text-xs font-bold tracking-wide text-muted-foreground/50 uppercase">{group.label}</h3>

                    {group.items.map((notification) => (
                        <NotificationRow key={notification.id} notification={notification} />
                    ))}
                </section>
            ))}
        </div>
    );
}

export function NavNotifications() {
    const notifications = usePage().props.notifications;
    const unread = notifications.filter((notification) => !notification.read_at);

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground" aria-label="Notifications">
                        {unread.length > 0 ? <BellRing /> : <Bell />}

                        {unread.length > 0 && <span className="absolute top-2 right-2 size-2 animate-ping rounded-full bg-primary motion-reduce:animate-none" />}

                        <span className="sr-only">{unread.length > 0 ? `Notifications, ${unread.length} unread` : 'Notifications'}</span>
                    </Button>
                }
            />

            <PopoverContent className="w-96 max-w-[calc(100vw-2rem)] rounded-(--panel-radius) border-0 bg-transparent p-0 ring-0" align="end" sideOffset={8}>
                <Panel className="w-full [--panel-gap:--spacing(4)] [--panel-padding:--spacing(5)]">
                    <header className="grid gap-2">
                        <h2 className="text-lg leading-none font-bold text-primary">Notification Center</h2>
                        <p className="text-xs leading-none text-muted-foreground/75">Your hub for recent alerts and activity.</p>
                    </header>

                    <Tabs defaultValue="unread" className="gap-(--panel-gap)">
                        <div className="-mx-(--panel-padding) flex items-center justify-between gap-4 border-y border-border/60 bg-muted/60 px-(--panel-padding)">
                            <TabsList variant="line" className="gap-4 p-0">
                                <TabsTrigger value="unread" className={linkTab}>
                                    Unread ({unread.length})
                                </TabsTrigger>
                                <TabsTrigger value="all" className={linkTab}>
                                    All ({notifications.length})
                                </TabsTrigger>
                            </TabsList>

                            {unread.length > 0 && (
                                <button type="button" className="inline-flex shrink-0 link items-center gap-1.5 text-xs">
                                    <CheckCheck className="size-3.5" />
                                    Mark all as read
                                </button>
                            )}
                        </div>

                        <TabsContent value="unread">
                            <NotificationList notifications={unread} empty="You're all caught up" />
                        </TabsContent>

                        <TabsContent value="all">
                            <NotificationList notifications={notifications} empty="Nothing here yet" />
                        </TabsContent>
                    </Tabs>
                </Panel>
            </PopoverContent>
        </Popover>
    );
}
