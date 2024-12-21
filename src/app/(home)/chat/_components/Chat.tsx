import React, { HTMLAttributes } from 'react'
import User from './User'
import MessagePanel from './MessagePanel'
import useChat from '@/app/(home)/chat/_hooks/useChat'
import { Message } from '@/schemas/chat'
import { cn } from '@/lib/cn'

export default function Chat({
  className,
  ...htmlProps
}: HTMLAttributes<HTMLDivElement>) {
  const { users, selectedUser, onMessage, selectedUserID, onSelectUser } =
    useChat()

  const handleSendMessage = (message: Omit<Message, 'fromSelf'>) => {
    onMessage(message.type, message.content || '', {
      introduce: message.introduce,
      url: message.url,
      tel: message.tel,
    })
  }

  return (
    <div className="flex">
      <div
        {...htmlProps}
        className={cn(
          'w-32 md:w-64 bg-blue-900 text-white h-[calc(100vh-114px)] overflow-y-scroll',
          className,
        )}
      >
        <h2 className="w-full text-xl font-bold p-3">온라인 유저</h2>
        <ul>
          {users.map((user) => (
            <User
              key={user.userID}
              user={user}
              selected={selectedUserID === user.userID}
              onSelect={() => onSelectUser(user)}
            />
          ))}
        </ul>
      </div>

      {selectedUser ? (
        <MessagePanel user={selectedUser} onInput={handleSendMessage} />
      ) : (
        <div className="flex-1 flex justify-center items-center w-full bg-gray-100">
          <p className="font-bold text-gray-400 text-2xl">
            대화하고 싶은 유저를 선택하세요.
          </p>
        </div>
      )}
    </div>
  )
}
