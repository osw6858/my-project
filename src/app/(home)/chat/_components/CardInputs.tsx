import React, { HTMLAttributes } from 'react'
import Input from '@/components/ui/Input'
import { cn } from '@/lib/cn'
import TextArea from '@/components/ui/TextArea'

interface CardInputsProps {
  content: string
  setContent: (value: string) => void
  introduce: string
  setIntroduce: (value: string) => void
  url: string
  setUrl: (value: string) => void
  tel: string
  setTel: (value: string) => void
}

export default function CardInputs({
  content,
  setContent,
  introduce,
  setIntroduce,
  url,
  setUrl,
  tel,
  setTel,
  className,
  ...htmlProps
}: CardInputsProps & HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...htmlProps}
      className={cn(
        'flex flex-col gap-4 p-4 bg-white rounded shadow-md',
        'md:gap-6 md:p-6 lg:max-w-lg lg:mx-auto',
        className,
      )}
    >
      <div className="flex flex-col">
        <label
          htmlFor="card-title"
          className="text-sm font-medium text-gray-700"
        >
          카드 제목
        </label>
        <Input
          id="card-title"
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="카드 제목을 입력하세요"
          className="mt-1"
        />
      </div>

      <div className="flex flex-col">
        <label
          htmlFor="card-content"
          className="text-sm font-medium text-gray-700"
        >
          카드 내용
        </label>
        <TextArea
          id="card-content"
          value={introduce}
          onChange={(e) => setIntroduce(e.target.value)}
          placeholder="카드 내용을 입력하세요"
          className="mt-1"
        />
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex-1">
          <label
            htmlFor="card-url"
            className="text-sm font-medium text-gray-700"
          >
            URL
          </label>
          <Input
            id="card-url"
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL을 입력하세요 (선택)"
            className="mt-1"
          />
        </div>
        <div className="flex-1">
          <label
            htmlFor="card-tel"
            className="text-sm font-medium text-gray-700"
          >
            연락처
          </label>
          <Input
            id="card-tel"
            type="text"
            value={tel}
            onChange={(e) => setTel(e.target.value)}
            placeholder="연락처를 입력하세요 (선택)"
            className="mt-1"
          />
        </div>
      </div>
    </div>
  )
}
