import { type HTMLAttributes, ReactNode } from 'react'
import { cva, VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/cn'
import ModalBackGround from '@/components/ui/ModalBackGround'

export const ModalVariants = cva('mx-2.5', {
  variants: {
    variant: {
      default: 'bg-white rounded',
    },
    size: {
      default: 'w-screen max-w-3xl h-auto max-h-screen',
      middle: 'w-screen max-w-xl',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
})

interface ModalProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof ModalVariants> {
  children?: ReactNode
}

export default function Modal({
  children,
  variant,
  size,
  className,
  ...htmlProps
}: ModalProps) {
  return (
    <ModalBackGround>
      <div
        {...htmlProps}
        className={cn(ModalVariants({ variant, size, className }))}
      >
        {children}
      </div>
    </ModalBackGround>
  )
}
