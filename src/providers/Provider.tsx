'use client'

import { ReactNode } from 'react'
import TanStackQueryProvider from '@/providers/TanStackQueryProvider'

interface ProviderProps {
  children: ReactNode
}

export default function Provider({ children }: ProviderProps) {
  return <TanStackQueryProvider>{children}</TanStackQueryProvider>
}
