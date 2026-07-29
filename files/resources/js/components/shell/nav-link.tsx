import { Link } from '@inertiajs/react';
import type { ReactElement } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, toUrl } from '@/lib/utils';
import type { NavItem } from '@/types/navigation';

export function NavLink({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed: boolean }) {
    const className = cn('group flex h-10 items-center gap-3 rounded-lg px-3.5 font-bold whitespace-nowrap text-foreground transition-colors @max-[10rem]:justify-center', active ? 'cursor-default bg-foreground text-background dark:bg-muted dark:text-foreground [&>svg]:text-primary' : 'clickable hover:bg-accent hover:[&>svg]:text-primary-strong');

    const content = (
        <>
            {item.icon && <item.icon className="size-4 shrink-0 transition-all duration-200 group-hover:stroke-2" />}
            <span className={cn('truncate @max-[10rem]:hidden', { 'transition-all duration-200 group-hover:ml-1': !active })}>{item.title}</span>
        </>
    );

    const link: ReactElement = item.external ? (
        <a href={toUrl(item.href)} target="_blank" rel="noopener noreferrer" className={className}>
            {content}
        </a>
    ) : (
        <Link href={item.href} prefetch className={className}>
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
