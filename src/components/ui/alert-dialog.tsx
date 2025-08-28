import * as React from "react"
import * as AlertDialogPrimitive from "@radix-ui/react-alert-dialog"

import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"

function AlertDialog({...props}: React.ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}

function AlertDialogTrigger({...props}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  )
}

function AlertDialogPortal({...props}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  )
}

function AlertDialogOverlay({className, ...props}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) {
  return (
    <AlertDialogPrimitive.Overlay data-slot="alert-dialog-overlay" className={cn("data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 backdrop-blur backdrop-brightness-50", className)} {...props} />
  )
}

function AlertDialogContent({className, ...props}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay/>
      <AlertDialogPrimitive.Content data-slot="alert-dialog-content" className={cn(
        "fixed rounded border border-white/35 p-2 z-50 duration-200 backdrop-brightness-150 shadow-lg sm:max-w-lg top-[50%] left-[50%] data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%]",
        className
      )} {...props}>
        <div className={cn("grid rounded border border-black/35 shadow-xs bg-background text-foreground p-4 gap-8")}>
          {props.children}
        </div>
      </AlertDialogPrimitive.Content>
    </AlertDialogPortal>
  )
}

function AlertDialogHeader({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-dialog-header" className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />
  )
}

function AlertDialogFooter({className, ...props}: React.ComponentProps<"div">) {
  return (
    <div data-slot="alert-dialog-footer" className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)} {...props} />
  )
}

function AlertDialogTitle({className, ...props}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title data-slot="alert-dialog-title" className={cn("text-xl font-bold tracking-tight", className)} {...props} />
  )
}

function AlertDialogDescription({className, ...props}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description data-slot="alert-dialog-description" className={cn("text-muted-foreground text-balance", className)} {...props} />
  )
}

function AlertDialogAction({className, ...props}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) {
  return (
    <AlertDialogPrimitive.Action className={cn(buttonVariants({size: "small"}), className)} {...props} />
  )
}

function AlertDialogCancel({className, ...props}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) {
  return (
    <AlertDialogPrimitive.Cancel className={cn(buttonVariants({variant: "outline", size: "small"}), className)} {...props} />
  )
}

export {AlertDialog, AlertDialogPortal, AlertDialogOverlay, AlertDialogTrigger, AlertDialogContent, AlertDialogHeader, AlertDialogFooter, AlertDialogTitle, AlertDialogDescription, AlertDialogAction, AlertDialogCancel}
