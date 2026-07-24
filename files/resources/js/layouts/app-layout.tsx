import type { ReactNode } from 'react';

import { AppHeader } from '@/components/shell/app-header';
import { AppSidebar } from '@/components/shell/app-sidebar';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useLayoutPreferences } from '@/hooks/use-layout-preferences';
import type { BreadcrumbItem } from '@/types/shell';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    headerActions?: ReactNode;
    sidebarOpen?: boolean;
}

export default function AppLayout({ children, breadcrumbs = [], headerActions, sidebarOpen = true }: AppLayoutProps) {
    const { variant, collapsible, side } = useLayoutPreferences();

    return (
        /*
         * `h-svh` is what makes internal scrolling work, and it has to live here.
         * The provider wrapper ships `min-h-svh` — a MINIMUM, so the box still
         * grows with its content and its height stays indefinite. Without a
         * definite height at the top, every `overflow-auto` further down is inert
         * on the vertical axis: the document scrolls instead, and the header
         * scrolls off with it.
         *
         * With a definite height here, `align-items: stretch` gives SidebarInset a
         * definite cross size, which gives the content column below a definite
         * height to overflow against.
         *
         * `overflow-hidden` is a guard, not the mechanism: it keeps a stray child
         * from scrolling the document. It cannot clip the sidebar or any overlay —
         * the desktop sidebar container is `fixed`, and Sheet/Tooltip/Popover/
         * DropdownMenu all render through a Portal.
         */
        <SidebarProvider defaultOpen={sidebarOpen} className="h-svh overflow-hidden">
            <AppSidebar variant={variant} collapsible={collapsible} side={side} />
            <SidebarInset className="overflow-hidden">
                <AppHeader breadcrumbs={breadcrumbs} actions={headerActions} />
                {/*
                 * The scroll region for page content. `min-h-0` lets this flex child
                 * shrink below its content size (flex items default to `min-height:
                 * auto`), which is the precondition for `overflow-auto` to scroll
                 * here instead of pushing the column taller. `min-w-0` does the same
                 * on the inline axis, so a wide child never scrolls the document.
                 */}
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-auto p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
