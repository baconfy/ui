import {ComponentProps} from "react";
import {cn} from "@/lib/utils";

export const Section = ({children, ...props}: ComponentProps<'section'>) => (
  <section className={cn('space-y-2', props.className)} {...props}>{children}</section>
)

export const SectionTitle = ({children, ...props}: ComponentProps<'h1'>) => (
  <h1 className={cn('text-2xl font-bold', props.className)} {...props}>{children}</h1>
)

export const SectionContent = ({children, ...props}: ComponentProps<'div'>) => (
  <div className={cn('flex border bg-accent/25 text-accent-foreground border-border/25 item-center justify-center rounded p-16 gap-4', props.className)} {...props}>
    {children}
  </div>
)