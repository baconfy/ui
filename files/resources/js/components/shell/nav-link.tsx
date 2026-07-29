import { Link } from '@inertiajs/react';
import type { ReactElement } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cn, toUrl } from '@/lib/utils';
import type { NavItem } from '@/types/navigation';

export function NavLink({ item, active, collapsed }: { item: NavItem; active: boolean; collapsed: boolean }) {
    // Ativo e inativo como ramos exclusivos, não como base + sobreposição: o
    // `hover:bg-accent` é (0,2,0) e venceria o fundo do ativo (0,1,0), fazendo o
    // item da página atual mudar ao passar o mouse — justo o oposto do que o
    // `cursor-default` comunica.
    //
    // No claro o ativo é uma superfície escura, e não mais um cinza sutil: além
    // de marcar melhor, é o que devolve legibilidade ao ícone dourado, que
    // sobre `muted` dava 1.33:1. Sobre o escuro dá 5.88:1. O escuro segue com
    // `muted` porque lá inverter deixaria o fundo quase branco, onde o mesmo
    // dourado cairia para 1.56:1.
    //
    // No hover o fundo continua claro, então ali o ícone usa a versão escurecida
    // da marca — 4.62:1 contra os 1.23:1 do dourado puro.
    const className = cn(
        'group flex h-10 items-center gap-3 rounded-lg px-3.5 font-bold whitespace-nowrap text-foreground transition-colors @max-[10rem]:justify-center',
        active
            ? 'cursor-default bg-foreground text-background dark:bg-muted dark:text-foreground [&>svg]:text-primary'
            : 'clickable hover:bg-accent hover:[&>svg]:text-primary-strong',
    );

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
