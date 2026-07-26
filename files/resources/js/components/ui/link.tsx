import { Link as InertiaLink } from '@inertiajs/react';
import * as React from 'react';
import { cn } from '@/lib/utils';

function Link({ className, children, ...props }: React.ComponentProps<typeof InertiaLink>) {
    return (
        <InertiaLink {...props} className={cn('clickable text-link/85 font-bold hover:text-link hover:underline ho underline-offset-4', className)}>
            {children}
        </InertiaLink>
    );
}

export { Link };
