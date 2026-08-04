import { InfiniteScroll, Link, router, usePage } from '@inertiajs/react';
import { useEchoNotification } from '@laravel/echo-react';
import { Bell, BellOff, BellRing, CheckCheck } from 'lucide-react';
import { useRef } from 'react';

import markNotificationAsRead from '@/actions/App/Http/Controllers/Notifications/MarkNotificationAsReadController';
import { resolveNotification } from '@/components/domain/notifications';
import { Button } from '@/components/ui/button';
import { Panel } from '@/components/ui/panel';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import type { Notification } from '@/types/shell';

export function NavNotifications() {
    const { auth, notifications, unreadCount = 0 } = usePage().props;
    const rows = notifications?.data ?? [];

    const scrollArea = useRef<HTMLDivElement>(null);

    useEchoNotification(`App.Models.User.${auth.user.id}`, () => {
        router.reload({ only: ['unreadCount'], reset: ['notifications'] });
    });

    return (
        <Popover>
            <PopoverTrigger
                render={
                    <Button variant="ghost" size="icon" className="relative text-muted-foreground">
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
                            <Link href={markNotificationAsRead()} as="button" only={['notifications', 'unreadCount']} preserveScroll className="inline-flex shrink-0 link items-center gap-1.5 text-xs">
                                <CheckCheck className="size-3.5" />
                                Mark all as read
                            </Link>
                        )}
                    </div>

                    {rows.length === 0 ? (
                        <EmptyState />
                    ) : (
                        <div ref={scrollArea} className="-mx-2 no-scrollbar max-h-96 min-h-56 overflow-y-auto overscroll-contain">
                            <InfiniteScroll data="notifications" itemsElement={scrollArea} preserveUrl onlyNext loading={<p className="py-3 text-center text-xs text-muted-foreground">Loading…</p>}>
                                {groupByReadState(rows).map((group) => (
                                    <section key={group.label} className="mb-2 grid gap-0.5">
                                        <h3 className="sticky top-0 z-10 bg-card py-1.5 text-xs font-bold tracking-wide text-muted-foreground/50 uppercase">{group.label}</h3>

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

function groupByReadState(notifications: Notification[]) {
    return [
        { label: 'New', items: notifications.filter((notification) => !notification.read_at) },
        { label: 'Older', items: notifications.filter((notification) => notification.read_at) },
    ].filter((group) => group.items.length > 0);
}

function EmptyState() {
    return (
        <div className="flex min-h-56 flex-col items-center justify-center gap-4 text-center">
            <span className="flex size-24 items-center justify-center rounded-full bg-muted text-muted-foreground">
                <BellOff className="size-12" />
            </span>

            <span className="grid gap-1">
                <span className="text-sm font-semibold text-primary">Nothing here yet</span>
                <span className="max-w-48 text-xs text-muted-foreground/50">We'll let you know the moment something happens.</span>
            </span>
        </div>
    );
}
