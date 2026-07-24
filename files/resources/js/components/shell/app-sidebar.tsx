import type { ComponentProps } from 'react';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader } from '@/components/ui/sidebar';

// No SidebarRail here: collapsing is handled by the visible, labelled,
// keyboard-reachable SidebarTrigger in AppHeader (plus Cmd/Ctrl+B). The rail
// was a redundant edge control with a native, unstyleable tooltip and a resize
// cursor that promised a resize it never performed; its definition was removed
// from components/ui/sidebar.tsx too. See design.md.
export function AppSidebar(props: ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader />
            <SidebarContent />
            <SidebarFooter />
        </Sidebar>
    );
}
