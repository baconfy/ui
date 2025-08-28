import * as React from "react"
import * as AccordionPrimitive from "@radix-ui/react-accordion"
import {ChevronDownIcon} from "lucide-react"
import {cn} from "@/lib";

function Accordion({...props}: React.ComponentProps<typeof AccordionPrimitive.Root>) {
  return <AccordionPrimitive.Root data-slot="accordion" className="w-full" {...props} />
}

function AccordionItem({className, ...props}: React.ComponentProps<typeof AccordionPrimitive.Item>) {
  return (
    <AccordionPrimitive.Item data-slot="accordion-item" className={cn("border-b border-border last:border-b-0", className)} {...props} />
  )
}

function AccordionTrigger({className, children, ...props}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger data-slot="accordion-trigger" className={cn("flex flex-1 items-start justify-between text-left font-bold text-border transition-all outline-none cursor-pointer gap-4 py-4 hover:underline disabled:pointer-events-none disabled:opacity-50 [&[data-state=open]>svg]:rotate-180", className)} {...props}>
        {children} <ChevronDownIcon className="text-border pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200"/>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}

function AccordionContent({className, children, ...props}: React.ComponentProps<typeof AccordionPrimitive.Content>) {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className="w-full data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden" {...props}>
      <div className={cn("text-balance pt-0 pb-4 space-y-2", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}

export {Accordion, AccordionItem, AccordionTrigger, AccordionContent}
