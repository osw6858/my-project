import React, { FormEvent } from 'react'
import { Message, MessageType, UserType } from '@/schemas/chat'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Messages from '@/app/(home)/chat/_components/Messages'
import { useMessageForm } from '@/app/(home)/chat/_hooks/useMessageForm'
import { useAutoScroll } from '@/app/(home)/chat/_hooks/useAutoScroll'
import CardInputs from '@/app/(home)/chat/_components/CardInputs'
import Select from '@/app/(home)/chat/_components/Select'

interface MessagePanelProps {
  user: UserType
  onInput: (message: Omit<Message, 'fromSelf'>) => void
}

export default function MessagePanel({ user, onInput }: MessagePanelProps) {
  const {
    messageType,
    setMessageType,
    content,
    setContent,
    introduce,
    setIntroduce,
    url,
    setUrl,
    tel,
    setTel,
  } = useMessageForm()

  const messagesEndRef = useAutoScroll(user.messages)

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (content.trim() === '') return

    if (messageType === 'text') {
      onInput({ type: 'text', content })
      setContent('')
      return
    }

    if (messageType === 'card') {
      onInput({ type: 'card', content, introduce, url, tel })
      setContent('')
      setUrl('')
      setTel('')
      setIntroduce('')
      return
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-blue-50">
      <div className="flex-1 overflow-y-auto p-6 bg-white shadow-md">
        <div className="flex flex-col space-y-4">
          {user.messages.map((msg, index) => (
            <Messages key={`${index}${msg.content}`} message={msg} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={handleSend}
        className="bg-blue-100 p-4 shadow-lg border-t border-blue-300"
      >
        <div className="flex items-center space-x-4">
          <Select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value as MessageType)}
          >
            <option value="text">텍스트 메시지</option>
            <option value="card">카드 메시지</option>
          </Select>
          {messageType === 'text' && (
            <Input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="텍스트 메시지 입력..."
              className="flex-1 p-2 rounded border border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          )}
          {messageType === 'card' && (
            <div className="flex-1">
              <CardInputs
                content={content}
                setContent={setContent}
                introduce={introduce}
                setIntroduce={setIntroduce}
                url={url}
                setUrl={setUrl}
                tel={tel}
                setTel={setTel}
              />
            </div>
          )}
          <Button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            전송
          </Button>
        </div>
      </form>
    </div>
  )
}
