import { TextareaHTMLAttributes, useRef } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { Slot } from '@radix-ui/react-slot'
import { cn } from '@/lib/cn'

export const textAreaVariants = cva(
  'flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'p-2 bg-white rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500',
        outline:
          'border border-gray-300 focus-visible:ring-2 focus-visible:ring-blue-500',
        filled: 'bg-gray-100 focus-visible:ring-2 focus-visible:ring-blue-500',
      },
      size: {
        default: 'h-auto',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

export interface TextAreaProps
  extends Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size'>,
    VariantProps<typeof textAreaVariants> {
  asChild?: boolean
}

export default function TextArea({
  className,
  variant,
  size,
  asChild = false,
  ...htmlProps
}: TextAreaProps) {
  const Comp = asChild ? Slot : 'textarea'
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <Comp
      ref={textAreaRef}
      style={{ resize: 'none' }}
      className={cn(textAreaVariants({ variant, size, className }))}
      {...htmlProps}
    />
  )
}
