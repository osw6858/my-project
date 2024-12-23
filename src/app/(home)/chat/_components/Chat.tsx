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
      file: message.file,
    })
  }

  return (
    <div
      {...htmlProps}
      className={cn(
        'flex flex-col md:flex-row h-[calc(100vh-113px)] bg-blue-50',
        className,
      )}
    >
      <aside
        className={cn(
          'flex-shrink-0 w-full md:w-64 bg-blue-900 text-white h-52 md:h-full overflow-y-auto',
          'border-b border-blue-800 md:static absolute z-30 w-fit',
        )}
      >
        <h2 className="text-lg md:text-xl font-bold p-4 border-b border-blue-800">
          온라인 유저
        </h2>
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
      </aside>

      <div className="flex-1 flex flex-col">
        {selectedUser ? (
          <MessagePanel user={selectedUser} onInput={handleSendMessage} />
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <p className="text-center font-bold text-gray-500 text-xl px-4">
              대화하고 싶은 유저를 선택하세요.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
