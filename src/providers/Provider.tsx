'use client'

import { ReactNode } from 'react'
import TanStackQueryProvider from '@/providers/TanStackQueryProvider'
import ConnectProvider from '@/providers/ConnectProvider'

interface ProviderProps {
  children: ReactNode
}

export default function Provider({ children }: ProviderProps) {
  return (
    <TanStackQueryProvider>
      <ConnectProvider>{children}</ConnectProvider>
    </TanStackQueryProvider>
  )
}
