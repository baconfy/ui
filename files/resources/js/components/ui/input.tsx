import * as React from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';

import { useFieldControl } from '@/components/ui/field';
import { cn } from '@/lib/utils';

const inputVariants = cva(
    "flex w-full min-w-0 rounded-lg border-2 bg-input text-input-foreground px-4 text-base font-bold outline-none transition-colors file:inline-flex file:h-8 file:border-0 file:bg-transparent file:text-sm file:font-bold file:text-input-foreground placeholder:text-input-foreground/50 read-only:cursor-default read-only:bg-muted disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
    {
        variants: {
            variant: {
                default: "border-transparent focus-visible:border-primary",
                outline: "border-input bg-background focus-visible:border-primary",
                ghost: "border-transparent bg-transparent hover:bg-muted focus-visible:border-primary",
            },
            size: {
                default: "h-12",
                sm: "h-10",
                lg: "h-14 px-6",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Input({ className, type, variant, size, id, ...props }: React.ComponentProps<"input"> & VariantProps<typeof inputVariants>) {
    const field = useFieldControl({ id })

    return (
        <InputPrimitive
            type={type}
            data-slot="input"
            className={cn(inputVariants({ variant, size }), className)}
            {...field}
            {...props}
        />
    )
}

export { Input, inputVariants }
