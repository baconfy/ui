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
        <SidebarProvider defaultOpen={sidebarOpen} className="h-svh overflow-hidden">
            <AppSidebar variant={variant} collapsible={collapsible} side={side} />
            <SidebarInset className="overflow-hidden">
                <AppHeader breadcrumbs={breadcrumbs} actions={headerActions} />
                <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-4 overflow-auto p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
