import React, { RefObject } from 'react'
import Messages from '@/app/(home)/chat/_components/Messages'
import { Message } from '@/schemas/chat'
import { useMessageVirtualizer } from '@/hooks/useMessageVirtualizer'

interface VirtualMessageListProps {
  messages: Message[]
  messagesEndRef: RefObject<HTMLDivElement | null>
}

export default function VirtualMessageList({
  messages,
  messagesEndRef,
}: VirtualMessageListProps) {
  const { parentRef, virtualizer } = useMessageVirtualizer(messages)

  return (
    <div
      ref={parentRef}
      className="flex-1 overflow-y-auto p-4 sm:p-6 shadow-md"
    >
      <div
        style={{
          height: `${virtualizer.getTotalSize()}px`,
          position: 'relative',
        }}
      >
        {virtualizer.getVirtualItems().map((virtualRow) => {
          const message = messages[virtualRow.index]
          return (
            <div
              key={message.content + virtualRow.index}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              style={{
                position: 'absolute',
                top: `${virtualRow.start}px`,
                left: 0,
                width: '100%',
              }}
            >
              <Messages message={message} />
            </div>
          )
        })}
      </div>
      <div ref={messagesEndRef} />
    </div>
  )
}
