import {Slot} from "@radix-ui/react-slot"
import {cva, type VariantProps} from "class-variance-authority"
import {cn} from "@/lib/utils"
import type {ComponentProps} from "react";

const buttonVariants = cva(
  "clickable inline-flex items-center justify-center transition-all duration-300 leading-none duration-100 [&>svg]:size-6 has-[>svg]:gap-1.5",
  {
    variants: {
      variant: {
        default: "rounded bg-button text-button-foreground border-2 border-button hover:bg-button/85 hover:border-button/10",
        primary: "rounded bg-primary text-primary-foreground border-2 border-primary hover:bg-primary/85 hover:border-primary/10",
        secondary: "rounded bg-secondary text-secondary-foreground border-2 border-secondary hover:bg-secondary/85 hover:border-secondary/10",
        destructive: "rounded bg-destructive text-destructive-foreground border-2 border-destructive hover:bg-destructive/75 hover:border-destructive/10",
        ghost: "rounded text-muted-foreground border-2 border-transparent hover:bg-accent hover:text-accent-foreground",
        outline: "rounded border-button text-button border-2 border-button hover:text-button/80 hover:border-button/50",
        link: "text-primary border-2 border-transparent underline-offset-4 hover:text-primary/80 hover:underline",
      },
      size: {
        default: "font-bold h-12 px-8 has-[>svg]:px-6 md:h-14 md:px-10 has-[>svg]:md:px-8 text-lg tracking-tighter",
        small: "font-bold h-8 px-4 has-[>svg]:px-2 md:h-10 md:px-6 has-[>svg]:md:px-5 tracking-tight",
        none: "font-bold p-0 pb-0.5",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({className, variant, size, asChild = false, ...props}: ComponentProps<"button"> & VariantProps<typeof buttonVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp data-slot="button" className={cn(buttonVariants({variant, size, className}))} {...props} />
  )
}

export {Button, buttonVariants}