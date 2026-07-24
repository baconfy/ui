import type { ReactNode } from 'react';

import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { useLayoutPreferences } from '@/hooks/use-layout-preferences';
import type { BreadcrumbItem } from '@/types/shell';
import { AppHeader } from '@/components/shell/app-header';
import { AppSidebar } from '@/components/shell/app-sidebar';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
    headerActions?: ReactNode;
    sidebarOpen?: boolean;
}

export default function AppLayout({ children, breadcrumbs = [], headerActions, sidebarOpen = true }: AppLayoutProps) {
    const { variant, collapsible, side } = useLayoutPreferences();

    return (
        <SidebarProvider defaultOpen={sidebarOpen}>
            <AppSidebar variant={variant} collapsible={collapsible} side={side} />
            <SidebarInset>
                <AppHeader breadcrumbs={breadcrumbs} actions={headerActions} />
                <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
            </SidebarInset>
        </SidebarProvider>
    );
}
