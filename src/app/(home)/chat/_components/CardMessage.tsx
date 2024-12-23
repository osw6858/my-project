import { Link, Phone } from 'lucide-react'
import React from 'react'
import { cn } from '@/lib/cn'

interface CardMessageProps {
  title: string
  introduce?: string
  url?: string
  tel?: string
  fromSelf: boolean
}

export default function CardMessage({
  title,
  introduce,
  url,
  tel,
  fromSelf,
}: CardMessageProps) {
  console.log(fromSelf)
  const getFullUrl = (url?: string) => {
    if (!url) return

    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url
    }
    return `https://${url}`
  }

  return (
    <div
      className={cn(`flex  my-2 ${fromSelf ? 'justify-end' : 'justify-start'}`)}
    >
      <div
        className={cn(
          'max-w-sm w-full p-6 rounded-3xl shadow-lg border transition-transform transform hover:scale-105 flex flex-col',
          fromSelf
            ? 'bg-gradient-to-r from-indigo-600 to-purple-500 text-white '
            : 'bg-white border-gray-300 text-gray-800',
        )}
      >
        <div className="mb-4 flex items-center">
          <div
            className={cn(
              'w-12 h-12 rounded-full flex items-center justify-center mr-4 text-xl font-semibold',
              fromSelf
                ? 'bg-white text-indigo-600'
                : 'bg-indigo-600 text-white',
            )}
          >
            {title.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3
              className={cn(
                'font-bold text-lg',
                fromSelf ? 'text-white' : 'text-indigo-600',
              )}
            >
              {title || '이름 없음'}
            </h3>
            {introduce && (
              <p
                className={cn(
                  'text-sm mt-1',
                  fromSelf ? 'text-indigo-200' : 'text-gray-600',
                )}
              >
                {introduce}
              </p>
            )}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {url && (
            <a
              href={getFullUrl(url)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'flex items-center text-sm font-medium gap-3 hover:underline',
                fromSelf ? 'text-indigo-100' : 'text-indigo-600',
              )}
            >
              <Link className="w-4 h-4" />
              {url}
            </a>
          )}
          {tel && (
            <a
              href={`tel:${tel}`}
              className={cn(
                'flex items-center text-sm font-medium gap-3 hover:underline',
                fromSelf ? 'text-indigo-100' : 'text-indigo-600',
              )}
            >
              <Phone className="w-4 h-4" />
              {tel}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
