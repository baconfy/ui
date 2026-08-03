import { Link } from '@inertiajs/react';
import { House, PanelLeftOpen } from 'lucide-react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { NavAction } from '@/components/shell/nav-action';
import { NavNotifications } from '@/components/shell/nav-notifications';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { dashboard } from '@/routes';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types/shell';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    actions?: ReactNode;
    onToggle: () => void;
}

const rescueToggle = cn('md:hidden', 'md:group-data-[collapsible=offcanvas]/shell:group-data-[state=collapsed]/shell:flex');

export function AppHeader({ breadcrumbs = [], actions, onToggle }: AppHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 px-4">
            <NavAction
                label="Expand navigation"
                side="bottom"
                render={
                    <Button variant="ghost" size="icon-sm" onClick={onToggle} aria-controls="app-navigation" className={cn('-ml-1 text-muted-foreground', rescueToggle)}>
                        <PanelLeftOpen className="size-4" />
                        <span className="sr-only">Expand navigation</span>
                    </Button>
                }
            />

            {/* The trail always starts at home, injected here rather than repeated
                by every page: the root never changes, and pages only declare what
                comes after it. On the dashboard itself the house stands alone. */}
            <Breadcrumb>
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

            <div className="ml-auto flex items-center gap-2">
                {actions}

                <NavNotifications />
            </div>
        </header>
    );
}
