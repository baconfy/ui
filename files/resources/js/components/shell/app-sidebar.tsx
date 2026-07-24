import type { ComponentProps } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';

export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader />
            <SidebarContent />
            <SidebarFooter />
        </Sidebar>
    );
}
