import { useId } from 'react';
import { cn } from '@/lib/utils';

interface PatternProps {
    className?: string;
}

export function Pattern({ className }: PatternProps) {
    const patternId = useId();

    return (
        <svg className={cn('absolute inset-0 size-full stroke-card-foreground/20', className)} fill="none">
            <defs>
                <pattern id={patternId} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path>
                </pattern>
            </defs>
            <rect stroke="none" fill={`url(#${patternId})`} width="100%" height="100%"></rect>
        </svg>
    );
}
