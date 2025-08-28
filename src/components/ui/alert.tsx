import * as React from "react"
import {cva, type VariantProps} from "class-variance-authority"

import {cn} from "@/lib/utils"

export const alertVariants = cva(
  "grid rounded relative select-none leading-snug px-4 py-2.5 has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 items-start [&>svg]:size-5 [&>svg]:translate-y-1 [&>svg]:text-current",
  {
    variants: {
      variant: {
        ghost: "text-button",
        outline: "border border-button text-button",
        default: "border border-button bg-button text-button-foreground",
        success: "border border-success bg-success text-success-foreground",
        primary: "border border-primary bg-primary text-primary-foreground",
        secondary: "border border-secondary bg-secondary text-secondary-foreground",
        destructive: "border border-destructive bg-destructive text-destructive-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Alert({className, variant, ...props}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div data-slot="alert" role="alert" className={cn(alertVariants({variant}), className)} {...props} />
  )
}

function AlertTitle({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-title" className={cn("col-start-2 line-clamp-1 text-lg font-bold tracking-tighter", className)} {...props} />
  )
}

function AlertDescription({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-description" className={cn("col-start-2 opacity-85", className)} {...props} />
  )
}

export {Alert, AlertTitle, AlertDescription}
