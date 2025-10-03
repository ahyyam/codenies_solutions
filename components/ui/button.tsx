import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none touch-manipulation btn-touch no-tap-highlight focus-mobile",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--color-button-primary-bg)] text-[var(--color-button-primary-text)] shadow-[0_4px_14px_0_rgba(90,0,210,0.2)] hover:bg-gradient-to-r hover:from-[var(--color-accent)] hover:to-[var(--color-secondary)] hover:-translate-y-0.5 hover:shadow-[0_8px_25px_rgba(90,0,210,0.3)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2 active:translate-y-0 active:shadow-[0_4px_14px_0_rgba(90,0,210,0.2)]",
        secondary:
          "bg-transparent text-[var(--color-button-secondary-text)] border-2 border-[var(--color-button-secondary-border)] hover:bg-[var(--color-primary)] hover:text-[var(--color-background)] hover:-translate-y-0.5 hover:shadow-[0_4px_15px_rgba(90,0,210,0.2)] focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2 active:translate-y-0",
        destructive:
          "bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-[42px] px-6 py-3 text-[15px]",
        sm: "min-h-[38px] px-5 py-2.5 text-sm",
        lg: "min-h-[46px] px-7 py-3.5 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
