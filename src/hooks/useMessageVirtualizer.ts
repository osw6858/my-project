import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'
import { Message } from '@/schemas/chat'

export function useMessageVirtualizer(messages: Message[]) {
  const parentRef = useRef<HTMLDivElement | null>(null)

  const virtualizer = useVirtualizer({
    count: messages.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 45,
    overscan: 5,
  })

  return { parentRef, virtualizer }
}
