import type { ComponentProps, ReactElement } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export const navAction = 'flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground';

interface NavActionProps {
    label: string;
    side?: ComponentProps<typeof TooltipContent>['side'];
    render: ReactElement;
}

export function NavAction({ label, side = 'top', render }: NavActionProps) {
    return (
        <Tooltip>
            <TooltipTrigger render={render} />
            <TooltipContent side={side}>{label}</TooltipContent>
        </Tooltip>
    );
}
