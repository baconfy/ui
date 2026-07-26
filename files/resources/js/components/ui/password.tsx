import * as React from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from '@/components/ui/input-group';

function Password({ className, disabled, ...props }: Omit<React.ComponentProps<typeof InputGroupInput>, 'type'>) {
    const [visible, setVisible] = React.useState(false);

    return (
        <InputGroup data-disabled={disabled || undefined} className={className}>
            <InputGroupInput type={visible ? 'text' : 'password'} disabled={disabled} {...props} />

            <InputGroupAddon align="inline-end">
                <InputGroupButton
                    size="icon-sm"
                    disabled={disabled}
                    aria-label={visible ? 'Hide password' : 'Show password'}
                    aria-pressed={visible}
                    onClick={() => setVisible((previous) => !previous)}
                >
                    {visible ? <EyeOffIcon /> : <EyeIcon />}
                </InputGroupButton>
            </InputGroupAddon>
        </InputGroup>
    );
}

export { Password };
