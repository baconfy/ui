import { NavLink } from '@/components/shell/nav-link';
import { useCurrentUrl } from '@/hooks/use-current-url';
import type { NavGroup } from '@/types/navigation';

interface NavMainProps {
    groups: NavGroup[];
    collapsed: boolean;
}

export function NavMain({ groups, collapsed }: NavMainProps) {
    const { isCurrentUrl } = useCurrentUrl();

    return (
        <nav className="no-scrollbar flex min-h-0 flex-1 flex-col gap-8 overflow-y-auto">
            {groups.map((group, index) => (
                <div key={group.label ?? index} className="flex flex-col gap-2">
                    {group.label && <span className="text-xs font-black tracking-tight text-muted-foreground/50 uppercase @max-[10rem]:hidden">{group.label}</span>}

                    <ul className="flex flex-col gap-1">
                        {group.items.map((item) => (
                            <li key={item.title}>
                                <NavLink item={item} active={!item.external && isCurrentUrl(item.href)} collapsed={collapsed} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </nav>
    );
}
