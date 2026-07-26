import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function Password({ className, disabled, ...props }: Omit<React.ComponentProps<typeof Input>, 'type'>) {
    const [visible, setVisible] = React.useState(false);

    return (
        <div data-slot="password" className="relative">
            <Input type={visible ? 'text' : 'password'} className={cn('pr-10', className)} disabled={disabled} {...props} />
            <Button type="button" variant="ghost" size="icon-xs" disabled={disabled} aria-label={visible ? 'Hide password' : 'Show password'} aria-pressed={visible} onClick={() => setVisible((previous) => !previous)} className="absolute top-1/2 right-2 -translate-y-1/2">
                {visible ? <EyeOffIcon /> : <EyeIcon />}
            </Button>
        </div>
    );
}

export { Password };
