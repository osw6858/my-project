import React from 'react'
import { Message } from '@/schemas/chat'
import CardMessage from '@/app/(home)/chat/_components/CardMessage'
import TextMessage from '@/app/(home)/chat/_components/TextMessage'
import FileMessage from '@/app/(home)/chat/_components/FileMessage'

interface MessageProps {
  message: Message
}

const Messages = React.memo(
  ({ message }: MessageProps) => {
    console.log('리렌더링')
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
  },
  (prevProps, nextProps) => {
    return prevProps.message === nextProps.message
  },
)

Messages.displayName = 'Messages'

export default Messages
