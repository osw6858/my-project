import React from 'react'
import { cn } from '@/lib/cn'
import Image from 'next/image'

interface FileMessageProps {
  fileName: string
  fileType: string
  fileData: string
  fromSelf: boolean
}

export default function FileMessage({
  fileName,
  fileType,
  fileData,
  fromSelf,
}: FileMessageProps) {
  return (
    <div
      className={cn(
        'max-w-sm w-full p-6 rounded-3xl shadow-lg border transition-transform transform hover:scale-105 flex flex-col',
        fromSelf
          ? 'bg-gradient-to-r from-indigo-600 to-purple-500 text-white self-end'
          : 'bg-white border-gray-300 text-gray-800 self-start',
      )}
    >
      <div className="mb-4">
        <p
          className={cn(
            'font-bold text-lg',
            fromSelf ? 'text-white' : 'text-indigo-600',
          )}
        >
          {fileName}
        </p>
      </div>
      {fileType.startsWith('image/') ? (
        <Image
          width={200}
          height={200}
          src={`data:${fileType};base64,${fileData}`}
          alt={fileName}
          className="max-w-full h-auto rounded-lg"
        />
      ) : (
        <div>
          <p
            className={cn(
              'text-sm mt-1',
              fromSelf ? 'text-indigo-200' : 'text-gray-600',
            )}
          >
            파일: {fileName}
          </p>
          <a
            href={`data:${fileType};base64,${fileData}`}
            download={fileName}
            className={cn(
              'inline-block text-sm font-medium underline mt-2',
              fromSelf ? 'text-indigo-100' : 'text-indigo-600',
            )}
          >
            다운로드
          </a>
        </div>
      )}
    </div>
  )
}
