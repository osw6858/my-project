import React from 'react'
import { Message } from '@/schemas/chat'
import CardMessage from '@/app/(home)/chat/_components/CardMessage'
import TextMessage from '@/app/(home)/chat/_components/TextMessage'
import FileMessage from '@/app/(home)/chat/_components/FileMessage'

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

  if (message.type === 'file' && message.file) {
    return (
      <FileMessage
        fileName={message.file.fileName}
        fileType={message.file.fileType}
        fileData={message.file.fileData}
        fromSelf={message.fromSelf}
      />
    )
  }

  return <TextMessage message={message} />
}
