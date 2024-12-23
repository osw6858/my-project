import React, { FormEvent, useMemo, useRef } from 'react'
import { Message, MessageType, UserType } from '@/schemas/chat'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Messages from '@/app/(home)/chat/_components/Messages'
import { useMessageForm } from '@/app/(home)/chat/_hooks/useMessageForm'
import { useAutoScroll } from '@/app/(home)/chat/_hooks/useAutoScroll'
import CardInputs from '@/app/(home)/chat/_components/CardInputs'
import Select from '@/components/ui/Select'

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
    selectedFile,
    setSelectedFile,
  } = useMessageForm()

  const messagesEndRef = useAutoScroll(user.messages)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (messageType === 'text' && content.trim() !== '') {
      onInput({ type: 'text', content })
      setContent('')
      return
    }

    if (messageType === 'card' && content.trim() !== '') {
      onInput({ type: 'card', content, introduce, url, tel })
      setContent('')
      setUrl('')
      setTel('')
      setIntroduce('')
      return
    }

    if (messageType === 'file' && selectedFile) {
      const reader = new FileReader()

      reader.onload = () => {
        const base64Data = reader.result?.toString().split(',')[1] || ''
        onInput({
          type: 'file',
          content: '',
          file: {
            fileName: selectedFile.name,
            fileType: selectedFile.type,
            fileData: base64Data,
          },
        })

        if (fileInputRef.current) {
          fileInputRef.current.value = ''
        }
        setSelectedFile(null)
      }
      reader.readAsDataURL(selectedFile)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    setSelectedFile(file)
    setMessageType('file')
  }

  const memoizedMessages = useMemo(
    () => user,
    [user.messages.length, user.userID],
  )

  return (
    <div className="flex-1 flex flex-col max-h-[calc(100vh-114px)]">
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 shadow-md">
        <div className="flex flex-col space-y-4">
          {memoizedMessages.messages.map((msg, index) => (
            <Messages key={`${index}${msg.content}`} message={msg} />
          ))}
        </div>
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSend}
        className="bg-blue-100 p-4 sm:p-6 shadow-lg border-t border-blue-300"
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-6">
          <Select
            value={messageType}
            onChange={(e) => setMessageType(e.target.value as MessageType)}
            className="w-full md:w-40 p-1"
          >
            <option value="text">텍스트 메시지</option>
            <option value="card">카드 메시지</option>
            <option value="file">파일 메시지</option>
          </Select>

          {messageType === 'text' && (
            <Input
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="텍스트 메시지 입력..."
              className="flex-1 p-3"
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
                className="bg-white rounded-lg"
              />
            </div>
          )}

          {messageType === 'file' && (
            <Input
              ref={fileInputRef}
              type="file"
              onChange={handleFileChange}
              className="bg-transparent border-0 block w-full text-sm text-gray-500 cursor-pointer
              file:mr-4 file:py-1 file:px-4 file:cursor-pointer
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
            />
          )}

          <Button type="submit" className="w-full md:w-auto px-6 py-2 shadow">
            전송
          </Button>
        </div>
      </form>
    </div>
  )
}
