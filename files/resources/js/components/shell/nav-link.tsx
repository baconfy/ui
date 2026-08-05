import { Link } from '@inertiajs/react';
import type { ReactElement } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, toUrl } from '@/lib/utils';
import type { NavItem } from '@/types/navigation';

export function NavLink({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed: boolean }) {
    const className = cn('group flex h-12 items-center gap-2 rounded-md px-4 font-bold whitespace-nowrap text-foreground tracking-tight transition-colors @max-[10rem]:justify-center', active ? 'cursor-default bg-primary text-primary-foreground [&>svg]:text-primary-foreground' : 'clickable hover:bg-accent hover:[&>svg]:text-primary');

    const content = (
        <>
            {item.icon && <item.icon className="size-4 shrink-0 transition-all duration-200 stroke-2" />}
            <span className={cn('truncate @max-[10rem]:hidden', { 'transition-all duration-200 group-hover:ml-1': !active })}>{item.title}</span>
        </>
    );

    const link: ReactElement = item.external ? (
        <a href={toUrl(item.href)} target="_blank" rel="noopener noreferrer" className={className}>
            {content}
        </a>
    ) : (
        <Link href={item.href} prefetch className={className} viewTransition>
            {content}
        </Link>
    );

    if (!collapsed) {
        return link;
    }

    return (
        <Tooltip>
            <TooltipTrigger render={link} />
            <TooltipContent side="right">{item.title}</TooltipContent>
        </Tooltip>
    );
}
