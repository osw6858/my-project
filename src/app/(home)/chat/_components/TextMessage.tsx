import React from 'react'
import { Message } from '@/schemas/chat'
import { cn } from '@/lib/cn'

export default function TextMessage({ message }: { message: Message }) {
  return (
    <div
      className={`flex ${message.fromSelf ? 'justify-end' : 'justify-start'}`}
    >
      <p
        className={cn(
          'max-w-xs p-2 rounded-lg shadow',
          message.fromSelf
            ? 'bg-green-200 text-right self-end'
            : 'bg-gray-100 text-left self-start',
        )}
      >
        {message.content}
      </p>
    </div>
  )
}
