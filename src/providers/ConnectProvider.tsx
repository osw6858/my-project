'use client'

import { ReactNode, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import socket from '@/socket'

export default function ConnectProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname.includes('chat')) {
      socket.disconnect()
    }
  }, [pathname])

  return <>{children}</>
}
