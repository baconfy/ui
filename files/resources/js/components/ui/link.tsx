import { Link as InertiaLink } from '@inertiajs/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

function Link({ className, children, ...props }: React.ComponentProps<typeof InertiaLink>) {
    return (
        <InertiaLink {...props} className={cn('clickable text-link font-bold hover:underline underline-offset-4', className)}>
            {children}
        </InertiaLink>
    );
}

export { Link };
