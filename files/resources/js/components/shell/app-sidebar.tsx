import { NavFooter } from '@/components/shell/nav-footer';
import { NavHeader } from '@/components/shell/nav-header';
import { NavMain } from '@/components/shell/nav-main';
import { navigation, navigationFooter } from '@/navigation';

interface AppSidebarProps {
    collapsed: boolean;
    onToggle: () => void;
}

export function AppSidebar({ collapsed, onToggle }: AppSidebarProps) {
    return (
        <>
            <NavHeader expanded={!collapsed} onToggle={onToggle} />

            <NavMain groups={navigation} collapsed={collapsed} />

            <NavFooter items={navigationFooter} />
        </>
    );
}
