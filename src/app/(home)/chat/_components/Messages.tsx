import { Message } from '@/schemas/chat'
import React from 'react'
import CardMessage from '@/app/(home)/chat/_components/CardMessage'
import TextMessage from '@/app/(home)/chat/_components/TextMessage'

interface MessageProps {
  message: Message
}

export default function Messages({ message }: MessageProps) {
  if (message.type === 'card') {
    return (
      <CardMessage
        title={message.content}
        introduce={message.introduce}
        url={message.url}
        tel={message.tel}
        fromSelf={message.fromSelf}
      />
    )
  }

  return <TextMessage message={message} />
}
