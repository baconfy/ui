import { Link } from '@inertiajs/react';
import { ChevronDown, House, PanelLeftOpen } from 'lucide-react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { NavAction } from '@/components/shell/nav-action';
import { NavNotifications } from '@/components/shell/nav-notifications';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types/shell';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    actions?: ReactNode;
    onToggle: () => void;
}

const rescueToggle = cn('max-md:order-last md:hidden', 'md:group-data-[collapsible=offcanvas]/shell:group-data-[state=collapsed]/shell:flex');

export function AppHeader({ breadcrumbs = [], actions, onToggle }: AppHeaderProps) {
    return (
        <header className="flex h-12 shrink-0 items-center gap-2 px-2 md:px-6">
            <NavAction
                label="Expand navigation"
                side="bottom"
                render={
                    <Button variant="ghost" size="icon-sm" onClick={onToggle} aria-controls="app-navigation" className={cn('-ml-1 text-muted-foreground', rescueToggle)}>
                        <PanelLeftOpen className="size-6" />
                        <span className="sr-only">Expand navigation</span>
                    </Button>
                }
            />

            <BreadcrumbMenu breadcrumbs={breadcrumbs} />
            <BreadcrumbTrail breadcrumbs={breadcrumbs} />

            <div className="ml-auto flex items-center gap-2">
                {actions}

                <NavNotifications />
            </div>
        </header>
    );
}

/**
 * The trail on a phone: one wide target saying where you are, opening into
 * everywhere you could go instead.
 *
 * A trail cannot be laid out sideways on a screen this narrow — a few levels
 * deep and it either wraps out of a fixed-height header or truncates away the
 * part that matters. Turning it inside out keeps every level reachable and
 * costs exactly one line, whatever the depth.
 */
function BreadcrumbMenu({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    const current = breadcrumbs.at(-1);

    const ancestors = breadcrumbs.slice(0, -1);

    return (
        <DropdownMenu>
            <DropdownMenuTrigger
                render={
                    <button type="button" className="flex min-w-0 clickable items-center gap-1.5 text-base text-muted-foreground md:hidden">
                        <span className="truncate">{current?.title ?? 'Dashboard'}</span>
                        <ChevronDown className="size-4 shrink-0" />
                        <span className="sr-only">Open breadcrumb trail</span>
                    </button>
                }
            />

            <DropdownMenuContent className="min-w-56" align="start">
                <DropdownMenuItem render={<Link href={dashboard()} />}>
                    <House />
                    Dashboard
                </DropdownMenuItem>

                {ancestors.map((item, index) =>
                    item.href ? (
                        <DropdownMenuItem key={index} render={<Link href={item.href} />}>
                            {item.title}
                        </DropdownMenuItem>
                    ) : (
                        <DropdownMenuItem key={index} disabled>
                            {item.title}
                        </DropdownMenuItem>
                    ),
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

/**
 * The trail everywhere else, laid out sideways as a trail should be.
 *
 * The root is injected here rather than repeated by every page: it never
 * changes, and pages only declare what comes after it. On the dashboard itself
 * the house stands alone.
 */
function BreadcrumbTrail({ breadcrumbs }: { breadcrumbs: BreadcrumbItemType[] }) {
    return (
        <Breadcrumb className="max-md:hidden">
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink render={<Link href={dashboard()} />}>
                        <House className="size-6" />
                        <span className="sr-only">Dashboard</span>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {breadcrumbs.map((item, index) => {
                    const isLast = index === breadcrumbs.length - 1;

                    return (
                        <Fragment key={index}>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>{isLast || !item.href ? <BreadcrumbPage>{item.title}</BreadcrumbPage> : <BreadcrumbLink render={<Link href={item.href} />}>{item.title}</BreadcrumbLink>}</BreadcrumbItem>
                        </Fragment>
                    );
                })}
            </BreadcrumbList>
        </Breadcrumb>
    );
}
