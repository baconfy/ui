import { router, usePage } from '@inertiajs/react';
import type { ReactNode } from 'react';
import { useEffect, useState } from 'react';

import { AppHeader } from '@/components/shell/app-header';
import { AppSidebar } from '@/components/shell/app-sidebar';
import { Panel } from '@/components/ui/panel';
import { useLayoutPreferences } from '@/hooks/use-layout-preferences';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';
import type { BreadcrumbItem } from '@/types/shell';

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

const shell = cn('group/shell flex h-dvh overflow-hidden md:gap-4 max-md:gap-2 max-md:p-2 md:p-shell', 'data-[side=right]:flex-row-reverse', 'data-[variant=sidebar]:gap-0 data-[variant=sidebar]:p-0', 'data-[variant=sidebar]:[--panel-card-radius:0px] data-[variant=sidebar]:[--panel-frame-padding:0px] data-[variant=sidebar]:[--panel-radius:0px]', 'md:data-[collapsible=offcanvas]:data-[state=collapsed]:gap-0', 'md:data-[collapsible=offcanvas]:data-[state=collapsed]:[--panel-border:0px] md:data-[collapsible=offcanvas]:data-[state=collapsed]:[--panel-frame-padding:0px]');

const sidebarPanel = cn('@container w-panel shrink-0 [--panel-gap:--spacing(8)] overflow-hidden transition-[width,translate] duration-200 motion-reduce:transition-none', 'max-md:max-w-[calc(100%-1rem)]', 'md:group-data-[state=collapsed]/shell:w-panel-collapsed', 'md:group-data-[collapsible=offcanvas]/shell:group-data-[state=collapsed]/shell:w-0', 'max-md:fixed max-md:inset-y-2 max-md:start-2 max-md:z-50 max-md:translate-x-0', 'max-md:group-data-[side=right]/shell:start-auto max-md:group-data-[side=right]/shell:end-2', 'max-md:group-data-[drawer=closed]/shell:-translate-x-[calc(100%+var(--spacing-shell))]', 'max-md:group-data-[drawer=closed]/shell:group-data-[side=right]/shell:translate-x-[calc(100%+var(--spacing-shell))]');

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    headerActions?: ReactNode;
}

export default function AppLayout({ children, breadcrumbs = [], headerActions }: AppLayoutProps) {
    const { variant, collapsible, side } = useLayoutPreferences();
    const isMobile = useIsMobile();
    const { props } = usePage();

    const [expanded, setExpanded] = useState(props.sidebarOpen);
    const [drawerOpen, setDrawerOpen] = useState(false);

    useEffect(() => router.on('navigate', () => setDrawerOpen(false)), []);

    const collapsed = collapsible !== 'none' && !expanded;

    function toggle() {
        if (isMobile) {
            setDrawerOpen((open) => !open);

            return;
        }

        const next = !expanded;

        setExpanded(next);
        document.cookie = `sidebar_state=${next}; path=/; max-age=${COOKIE_MAX_AGE}; samesite=lax`;
    }

    return (
        <div className={shell} data-variant={variant} data-collapsible={collapsible} data-side={side} data-state={collapsed ? 'collapsed' : 'expanded'} data-drawer={drawerOpen ? 'open' : 'closed'}>
            {drawerOpen && <button type="button" aria-label="Close navigation" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-40 backdrop-blur-sm backdrop-brightness-90 md:hidden" />}

            <Panel id="app-navigation" className={sidebarPanel}>
                <AppSidebar collapsed={collapsed} onToggle={toggle} />
            </Panel>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
                <AppHeader breadcrumbs={breadcrumbs} actions={headerActions} onToggle={toggle} />

                {/* The page inset lives here, not on each page: it is what keeps a
                    PageHeader lined up with the breadcrumb above it, and the app
                    header carries the same horizontal value for that reason.

                    Left, right and bottom are tuned so the content sits in an even
                    gutter: the shell's own padding plus this inset has to come to
                    the same number on every side, which is also why the shell's gap
                    matches its padding rather than doubling it. */}
                <main className="min-h-0 flex-1 overflow-y-auto no-scrollbar px-2 md:px-6">{children}</main>
            </div>
        </div>
    );
}
