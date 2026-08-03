"use client"

import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';

import { useFieldControl } from '@/components/ui/field';
import { cn } from '@/lib/utils';

function Checkbox({ className, id, ...props }: CheckboxPrimitive.Root.Props) {
    const field = useFieldControl({ id });

    return (
        <CheckboxPrimitive.Root
            data-slot="checkbox"
            {...field}
            className={cn(
                "peer size-6 shrink-0 flex items-center justify-center cursor-pointer appearance-none rounded-sm border-2 border-primary bg-transparent outline-none transition-all",
                "focus-visible:ring-2 focus-visible:ring-foreground/20 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                "aria-invalid:border-destructive aria-invalid:ring-destructive/20",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground",
                className
            )}
            {...props}
        >
            <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="grid place-content-center transition-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="size-3.5 stroke-2" viewBox="0 0 20 20" fill="currentColor" stroke="currentColor" strokeWidth="2">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                </svg>
            </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
    )
}

export { Checkbox }
