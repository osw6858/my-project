import { useState } from 'react'
import { MessageType } from '@/schemas/chat'

export const useMessageForm = () => {
  const [messageType, setMessageType] = useState<MessageType>('text') // 메시지 타입 상태
  const [content, setContent] = useState<string>('') // 공통 텍스트 필드
  const [introduce, setIntroduce] = useState<string>('') // 소개
  const [url, setUrl] = useState<string>('') // 카드 URL 필드
  const [tel, setTel] = useState<string>('') // 카드 전화번호 필드
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  return {
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
  }
}
