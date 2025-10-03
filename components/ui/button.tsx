import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl font-semibold relative overflow-hidden transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none touch-manipulation btn-touch no-tap-highlight focus-mobile group",
  {
    variants: {
      variant: {
        primary:
          "bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white shadow-lg shadow-[var(--color-primary)]/25 border border-[var(--color-primary)]/20 hover:from-[var(--color-accent)] hover:to-[var(--color-secondary)] hover:shadow-xl hover:shadow-[var(--color-primary)]/40 hover:scale-105 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2 active:scale-95 active:shadow-lg active:shadow-[var(--color-primary)]/30 before:absolute before:inset-0 before:bg-gradient-to-r before:from-white/20 before:to-transparent before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        secondary:
          "bg-gradient-to-r from-transparent to-transparent text-[var(--color-primary)] border-2 border-[var(--color-primary)] shadow-lg shadow-[var(--color-primary)]/10 hover:bg-gradient-to-r hover:from-[var(--color-primary)] hover:to-[var(--color-accent)] hover:text-white hover:shadow-xl hover:shadow-[var(--color-primary)]/25 hover:scale-105 hover:-translate-y-1 focus-visible:outline-2 focus-visible:outline-[var(--color-accent)] focus-visible:outline-offset-2 active:scale-95",
        destructive:
          "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-500/25 hover:from-red-500 hover:to-red-600 hover:shadow-xl hover:shadow-red-500/40 hover:scale-105 hover:-translate-y-1 focus-visible:ring-red-500/20 active:scale-95",
        outline:
          "bg-white/80 backdrop-blur-sm text-gray-700 border-2 border-gray-200 shadow-lg shadow-gray-500/10 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300 hover:shadow-xl hover:shadow-gray-500/20 hover:scale-105 hover:-translate-y-1 active:scale-95 dark:bg-gray-800/80 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white",
        ghost:
          "bg-transparent text-gray-600 hover:bg-gray-100 hover:text-gray-900 hover:scale-105 hover:-translate-y-0.5 active:scale-95 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200",
        link: "text-[var(--color-primary)] underline-offset-4 hover:underline hover:text-[var(--color-accent)] transition-colors",
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
