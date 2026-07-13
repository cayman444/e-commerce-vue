import type { VariantProps } from "class-variance-authority"
import { cva } from "class-variance-authority"

export { default as Button } from "./Button.vue"

export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-none text-xs font-semibold uppercase tracking-wider transition-all duration-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-secondary disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 cursor-pointer border-0 select-none",
  {
    variants: {
      variant: {
        default: "bg-primary text-neutral hover:opacity-90",
        destructive: "bg-error text-white hover:bg-error/90",
        outline:
          "border border-secondary/10 bg-transparent hover:bg-secondary/5 text-secondary",
        secondary: "bg-secondary text-neutral hover:opacity-90",
        ghost: "hover:bg-secondary/5 text-secondary",
        link: "text-secondary underline hover:opacity-85",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 px-4 py-2",
        lg: "h-13 px-8 py-4",
        icon: "h-10 w-10",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export type ButtonVariants = VariantProps<typeof buttonVariants>
