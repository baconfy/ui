import { Link } from '@inertiajs/react';
import { Bell, PanelLeftOpen } from 'lucide-react';
import type { ReactNode } from 'react';
import { Fragment } from 'react';

import { NavAction, navAction } from '@/components/shell/nav-action';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem as BreadcrumbItemType } from '@/types/shell';

interface AppHeaderProps {
    breadcrumbs?: BreadcrumbItemType[];
    actions?: ReactNode;
    onToggle: () => void;
}

const rescueToggle = cn('md:hidden', 'md:group-data-[collapsible=offcanvas]/shell:group-data-[state=collapsed]/shell:flex');

export function AppHeader({ breadcrumbs = [], actions, onToggle }: AppHeaderProps) {
    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <NavAction
                label="Expand navigation"
                side="bottom"
                render={
                    <button type="button" onClick={onToggle} aria-controls="app-navigation" className={cn(navAction, '-ml-1', rescueToggle)}>
                        <PanelLeftOpen className="size-4" />
                        <span className="sr-only">Expand navigation</span>
                    </button>
                }
            />

            {breadcrumbs.length > 0 && (
                <Breadcrumb>
                    <BreadcrumbList>
                        {breadcrumbs.map((item, index) => {
                            const isLast = index === breadcrumbs.length - 1;

                            return (
                                <Fragment key={index}>
                                    <BreadcrumbItem>{isLast || !item.href ? <BreadcrumbPage>{item.title}</BreadcrumbPage> : <BreadcrumbLink render={<Link href={item.href} />}>{item.title}</BreadcrumbLink>}</BreadcrumbItem>
                                    {!isLast && <BreadcrumbSeparator />}
                                </Fragment>
                            );
                        })}
                    </BreadcrumbList>
                </Breadcrumb>
            )}

            <div className="ml-auto flex items-center gap-2">
                {actions}

                <NavAction
                    label="Notifications"
                    side="bottom"
                    render={
                        <Link href="/notifications" className={navAction}>
                            <Bell className="size-4" />
                            <span className="sr-only">Notifications</span>
                        </Link>
                    }
                />
            </div>
        </header>
    );
}
