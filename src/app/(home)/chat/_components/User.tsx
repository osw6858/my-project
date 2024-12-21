import React, { HTMLAttributes } from 'react'
import { UserType } from '@/schemas/chat'
import { MessageSquareDot } from 'lucide-react'
import { cn } from '@/lib/cn'

interface UserProps {
  user: UserType
  selected: boolean
  onSelect: () => void
}

export default function User({
  user,
  selected,
  onSelect,
  className,
  ...htmlProps
}: UserProps & HTMLAttributes<HTMLLIElement>) {
  return (
    <li
      {...htmlProps}
      className={cn(
        'flex justify-between items-center p-4 cursor-pointer hover:bg-blue-800',
        selected && 'bg-blue-700',
        className,
      )}
      onClick={onSelect}
    >
      <span className="font-semibold flex items-center gap-2">
        {user.username}
        {user.self && <span className="text-sm text-gray-300">(본인)</span>}
      </span>
      <p className="flex items-center space-x-2">
        {user.hasNewMessages && <MessageSquareDot />}
        <span className={`w-3 h-3 rounded-full bg-green-500`} />
      </p>
    </li>
  )
}
