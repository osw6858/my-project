import React, { useState } from 'react'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'

interface SelectUsernameProps {
  onUsernameSelection: (username: string) => void
}

export default function SelectUsername({
  onUsernameSelection,
}: SelectUsernameProps) {
  const [username, setUsername] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!username.trim()) {
      setError('닉네임은 필수 입니다.')
      return
    }
    onUsernameSelection(username.trim())
  }

  return (
    <div className="flex items-center justify-center h-[calc(100vh-114px)]">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg border border-blue-200"
      >
        <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
          닉네임 설정
        </h2>
        <Input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError('')
          }}
          placeholder="닉네임을 입력하세요"
          className="w-full p-4 text-gray-700 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}
        <Button className="w-full h-full py-3" type="submit">
          채팅 참가
        </Button>
      </form>
    </div>
  )
}
