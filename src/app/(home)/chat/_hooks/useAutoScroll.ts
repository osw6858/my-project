import { useEffect, useRef } from 'react'
import { Message } from '@/schemas/chat'

export function useAutoScroll(messages: Message[]) {
  const messagesEndRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return messagesEndRef
}
