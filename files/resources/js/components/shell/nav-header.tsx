import { usePage } from '@inertiajs/react';
import { PanelLeftClose, PanelLeftOpen } from 'lucide-react';

import { NavAction } from '@/components/shell/nav-action';
import { Brand } from '@/components/ui/brand';

interface NavHeaderProps {
    expanded: boolean;
    onToggle: () => void;
}

export function NavHeader({ expanded, onToggle }: NavHeaderProps) {
    const { name } = usePage().props;
    const label = expanded ? 'Collapse navigation' : 'Expand navigation';

    return (
        <div className="group/brand flex shrink-0 items-center gap-2 px-1.5 @max-[10rem]:relative @max-[10rem]:justify-center">
            <Brand className="size-8 text-primary transition-opacity @max-[10rem]:group-hover/brand:opacity-0 @max-[10rem]:group-has-[:focus-visible]/brand:opacity-0" />

            <span className="font-title text-xl font-black tracking-tight @max-[10rem]:hidden">{name}</span>

            <NavAction
                label={label}
                side="right"
                render={
                    <button type="button" onClick={onToggle} aria-expanded={expanded} aria-controls="app-navigation" className="shrink-0 clickable text-muted-foreground transition-[color,opacity] hover:text-primary-strong @max-[10rem]:absolute @max-[10rem]:opacity-0 @max-[10rem]:group-hover/brand:opacity-100 @max-[10rem]:focus-visible:opacity-100 @min-[10rem]:ml-auto">
                        {expanded ? <PanelLeftClose className="size-6" /> : <PanelLeftOpen className="size-6" />}
                        <span className="sr-only">{label}</span>
                    </button>
                }
            />
        </div>
    );
}
