import { SelectHTMLAttributes } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'

export const selectVariants = cva(
  'rounded border bg-white text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'border-blue-300',
        ghost: 'border-transparent hover:bg-gray-100',
        error: 'border-red-500',
      },
      selectSize: {
        default: 'h-10 px-3',
        sm: 'h-8 px-2 text-xs',
        lg: 'h-12 px-4 text-lg',
      },
    },
    defaultVariants: {
      variant: 'default',
      selectSize: 'default',
    },
  },
)

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement>,
    VariantProps<typeof selectVariants> {}

export default function Select({
  className,
  variant,
  selectSize,
  children,
  ...htmlProps
}: SelectProps) {
  return (
    <select
      className={cn(selectVariants({ variant, selectSize, className }))}
      {...htmlProps}
    >
      {children}
    </select>
  )
}
