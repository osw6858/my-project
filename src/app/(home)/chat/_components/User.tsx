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
        'sm:gap-4 md:gap-6',
        selected && 'bg-blue-700',
        className,
      )}
      onClick={onSelect}
    >
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="font-semibold text-sm md:text-base flex items-center gap-2">
          {user.username}
          {user.self && <span className="text-xs text-gray-300">(본인)</span>}
        </span>
      </div>
      <div className="flex items-center space-x-2">
        {user.hasNewMessages && (
          <MessageSquareDot className="w-4 h-4 md:w-5 md:h-5" />
        )}
        <span className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-green-500" />
      </div>
    </li>
  )
}
