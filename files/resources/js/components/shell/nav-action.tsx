import type { ComponentProps, ReactElement } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';


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
