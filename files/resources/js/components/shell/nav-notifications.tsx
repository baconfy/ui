import { InfiniteScroll, usePage } from '@inertiajs/react';
import { Bell, BellOff, BellRing, CheckCheck } from 'lucide-react';

import { resolveNotification } from '@/components/domain/notifications';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ui/panel';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { dayLabel } from '@/lib/datetime';
import type { Notification } from '@/types/shell';

function groupByDay(notifications: Notification[]) {
    const groups: { label: string; items: Notification[] }[] = [];

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

function EmptyState() {
    return (
        <div className="flex min-h-56 flex-col items-center justify-center gap-3 px-6 text-center">
            <span className="flex size-11 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <BellOff className="size-5" />
            </span>

            <span className="grid gap-1">
                <span className="text-sm font-semibold text-foreground">Nothing here yet</span>
                <span className="text-xs max-w-48 text-muted-foreground">We'll let you know the moment something happens.</span>
            </span>
        </div>
    );
}

export function NavNotifications() {
    const { notifications, unreadCount = 0 } = usePage().props;
    const rows = notifications?.data ?? [];

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground" aria-label="Notifications">
                        {unreadCount > 0 ? <BellRing /> : <Bell />}

                        {unreadCount > 0 && <span className="absolute top-2 right-2 size-2 animate-ping rounded-full bg-primary motion-reduce:animate-none" />}

                        <span className="sr-only">{unreadCount > 0 ? `Notifications, ${unreadCount} unread` : 'Notifications'}</span>
                    </Button>
                }
            />

            <PopoverContent className="w-96 max-w-[calc(100vw-2rem)] rounded-(--panel-radius) border-0 bg-transparent p-0 ring-0" align="end" sideOffset={8}>
                <Panel className="w-full [--panel-gap:--spacing(4)] [--panel-padding:--spacing(5)]">
                    <header className="grid gap-2">
                        <h2 className="text-lg leading-none font-bold text-primary">Notification Center</h2>
                        <p className="text-xs leading-none text-muted-foreground/75">Your hub for recent alerts and activity.</p>
                    </header>

                    <div className="-mx-(--panel-padding) flex items-center justify-between gap-4 border-y border-border/60 bg-muted/60 px-(--panel-padding) py-2">
                        <span className="text-xs text-muted-foreground">{unreadCount > 0 ? `${unreadCount} unread` : 'All caught up'}</span>

                        {unreadCount > 0 && (
                            <button type="button" className="link inline-flex shrink-0 items-center gap-1.5 text-xs">
                                <CheckCheck className="size-3.5" />
                                Mark all as read
                            </button>
                        )}
                    </div>

                    {rows.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div className="no-scrollbar -mx-2 max-h-96 min-h-56 overflow-y-auto overscroll-contain">
                            {/* `preserveUrl` because this is a popover, not a page — a cursor
                                in the address bar would outlive the panel and mean nothing.
                                `onlyNext` because the list always starts at the newest row. */}
                            <InfiniteScroll data="notifications" preserveUrl onlyNext loading={<p className="py-3 text-center text-xs text-muted-foreground">Loading…</p>}>
                                {groupByDay(rows).map((group) => (
                                    <section key={group.label} className="grid gap-0.5">
                                        <h3 className="sticky top-0 z-10 bg-card/85 py-1.5 text-xs font-bold tracking-wide text-muted-foreground/50 uppercase">{group.label}</h3>

                                        {group.items.map((notification) => {
                                            const Row = resolveNotification(notification.data.type);

                                            return <Row key={notification.id} notification={notification} />;
                                        })}
                                    </section>
                                ))}
                            </InfiniteScroll>
                        </div>
                    )}
                </Panel>
            </PopoverContent>
        </Popover>
    );
}
