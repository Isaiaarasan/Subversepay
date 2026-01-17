import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
        destructive:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-600/20 dark:focus-visible:ring-red-600/40 shadow-sm",
        outline:
          "border border-input bg-background shadow-xs hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        success: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm",
        warning: "bg-amber-500 text-white hover:bg-amber-600 shadow-sm",
        info: "bg-blue-500 text-white hover:bg-blue-600 shadow-sm",
        grey: "bg-gray-500 text-white hover:bg-gray-600 shadow-sm",
      },
      size: {
        giant: "h-[58px] px-8 text-lg rounded-xl",
        lg: "h-[48px] px-6 text-base rounded-lg",
        default: "h-[38px] px-4 text-sm rounded-lg",
        sm: "h-[34px] px-3 text-xs rounded-md",
        tiny: "h-[28px] px-2.5 text-[10px] rounded-md",
        icon: "size-[38px]",
        "icon-sm": "size-[34px]",
        "icon-lg": "size-[48px]",
      },
    },
    defaultVariants: {
      variant: "default",
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
