import { InputHTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/cn'

export const inputVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default: '',
        outline:
          'border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500',
        filled: 'bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500',
      },
      inputSize: {
        default: 'h-9',
        sm: 'h-8 text-xs',
        lg: 'h-11 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      inputSize: 'default',
    },
  },
)

export interface InputProps
  extends InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  asChild?: boolean
}

export default function Input({
  className,
  variant,
  inputSize,
  asChild = false,
  ...htmlProps
}: InputProps) {
  const Comp = asChild ? Slot : 'input'
  return (
    <Comp
      className={cn(inputVariants({ variant, inputSize, className }))}
      {...htmlProps}
    />
  )
}