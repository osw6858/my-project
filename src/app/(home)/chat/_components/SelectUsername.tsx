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
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">닉네임 설정</h2>
        <Input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value)
            setError('')
          }}
          placeholder="닉네임 입력"
          className="w-full p-2 border border-gray-300 rounded mb-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        <Button className="w-full" type="submit">
          채팅 참가
        </Button>
      </form>
    </div>
  )
}
