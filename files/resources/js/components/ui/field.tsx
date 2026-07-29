"use client"

import React, { useMemo } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

type FieldContextValue = {
  id: string
  errorId: string
  hasError: boolean
  setHasError: React.Dispatch<React.SetStateAction<boolean>>
}

const FieldContext = React.createContext<FieldContextValue | null>(null)

function useFieldControl({ id }: { id?: string }) {
  const field = React.useContext(FieldContext)

  if (!field) {
    return { id }
  }

  return {
    id: id ?? field.id,
    "aria-describedby": field.hasError ? field.errorId : undefined,
    "aria-invalid": field.hasError || undefined,
  }
}

function FieldSet({ className, ...props }: React.ComponentProps<"fieldset">) {
  return (
    <fieldset data-slot="field-set" className={cn("flex flex-col gap-8", className)} {...props} />
  )
}

function FieldLegend({ className, variant = "legend", ...props }: React.ComponentProps<"legend"> & { variant?: "legend" | "label" }) {
  return (
    <legend data-slot="field-legend" data-variant={variant} className={cn("font-medium data-[variant=label]:text-sm", className)} {...props} />
  )
}

function FieldGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field-group" className={cn("group/field-group @container/field-group flex w-full flex-col gap-6", className)} {...props} />
  )
}

const fieldVariants = cva(
  "group/field flex w-full gap-2 data-[invalid=true]:text-destructive",
  {
    variants: {
      orientation: {
        vertical: "flex-col *:w-full [&>.sr-only]:w-auto",
        horizontal: "flex-row items-center has-[>[data-slot=field-content]]:items-start *:data-[slot=field-label]:flex-auto has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
        responsive: "flex-col *:w-full @md/field-group:flex-row @md/field-group:items-center @md/field-group:*:w-auto @md/field-group:has-[>[data-slot=field-content]]:items-start @md/field-group:*:data-[slot=field-label]:flex-auto [&>.sr-only]:w-auto @md/field-group:has-[>[data-slot=field-content]]:[&>[role=checkbox],[role=radio]]:mt-px",
      },
    },
    defaultVariants: {
      orientation: "vertical",
    },
  }
)

function Field({ className, orientation = "vertical", id, ...props }: React.ComponentProps<"div"> & VariantProps<typeof fieldVariants>) {
  const generatedId = React.useId()
  const fieldId = id ?? generatedId
  const [hasError, setHasError] = React.useState(false)

  const context = useMemo<FieldContextValue>(
    () => ({ id: fieldId, errorId: `${fieldId}-error`, hasError, setHasError }),
    [fieldId, hasError]
  )

  return (
    <FieldContext.Provider value={context}>
      <div
        role="group"
        data-slot="field"
        data-orientation={orientation}
        data-invalid={hasError || undefined}
        className={cn(fieldVariants({ orientation }), className)}
        {...props}
      />
    </FieldContext.Provider>
  )
}

function FieldActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field-actions" className={cn("flex w-full flex-col gap-2 *:w-full", className)} {...props} />
  )
}

function FieldContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="field-content" className={cn("group/field-content flex flex-1 flex-col gap-2 leading-snug", className)} {...props} />
  )
}

function FieldLabel({ className, htmlFor, ...props }: React.ComponentProps<typeof Label>) {
  const field = React.useContext(FieldContext)

  return (
    <Label
      data-slot="field-label"
      htmlFor={htmlFor ?? field?.id}
      className={cn(
        "group/field-label peer/field-label text-sm flex w-fit gap-2 leading-snug group-data-[disabled=true]/field:opacity-50 has-data-checked:border-primary/30 has-data-checked:bg-primary/5 has-[>[data-slot=field]]:rounded-md has-[>[data-slot=field]]:border *:data-[slot=field]:p-4",
        "has-[>[data-slot=field]]:w-full has-[>[data-slot=field]]:flex-col [[for]]:clickable",
        className
      )}
      {...props}
    />
  )
}

function FieldTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="field-label"
      className={cn(
        "flex w-fit items-center gap-2 text-base font-medium group-data-[disabled=true]/field:opacity-50",
        className
      )}
      {...props}
    />
  )
}

function FieldDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="field-description"
      className={cn(
        "text-left text-sm leading-normal font-normal text-muted-foreground group-has-data-horizontal/field:text-balance [[data-variant=legend]+&]:-mt-2",
        "last:mt-0",
        "[&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-link",
        className
      )}
      {...props}
    />
  )
}

function FieldSeparator({ children, className, ...props }: React.ComponentProps<"div"> & { children?: React.ReactNode }) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      aria-label={typeof children === "string" ? children : undefined}
      data-slot="field-separator"
      data-content={!!children}
      className={cn("flex items-center gap-4 text-xs font-bold tracking-tight text-muted-foreground uppercase", className)}
      {...props}
    >
      <div className="h-px flex-1 bg-border" />

      {children && (
        <>
          <span data-slot="field-separator-content">{children}</span>
          <div className="h-px flex-1 bg-border" />
        </>
      )}
    </div>
  )
}

function FieldError({ className, children, errors, id, ...props }: React.ComponentProps<"div"> & { errors?: Array<{ message?: string } | undefined> }) {
  const field = React.useContext(FieldContext)
  const setHasError = field?.setHasError

  const content = useMemo(() => {
    if (children) {
      return children
    }

    if (!errors?.length) {
      return null
    }

    const uniqueErrors = [
      ...new Map(errors.map((error) => [error?.message, error])).values(),
    ]

    if (uniqueErrors?.length == 1) {
      return uniqueErrors[0]?.message
    }

    return (
      <ul className="ml-4 flex list-disc flex-col gap-2">
        {uniqueErrors.map(
          (error, index) => error?.message && <li key={index}>{error.message}</li>
        )}
      </ul>
    )
  }, [children, errors])

  /**
   * Announcing the error is the `Field`'s job, not this component's: the
   * control needs `aria-describedby` pointing here, and the whole group needs
   * `data-invalid` for the destructive styling. Both live above us, so we
   * report presence upwards instead of the form having to declare it twice.
   */
  React.useEffect(() => {
    if (!setHasError) {
      return
    }

    setHasError(Boolean(content))

    return () => setHasError(false)
  }, [setHasError, content])

  if (!content) {
    return null
  }

  return (
    <div role="alert" id={id ?? field?.errorId} data-slot="field-error" className={cn("text-sm font-normal text-destructive", className)} {...props}>
      {content}
    </div>
  )
}

export { Field, FieldActions, FieldLabel, FieldDescription, FieldError, FieldGroup, FieldLegend, FieldSeparator, FieldSet, FieldContent, FieldTitle, useFieldControl }
