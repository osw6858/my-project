'use client'

import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useDateStore } from '@/store/date'
import { useAddEvent } from '@/app/(home)/calendar/_hooks/useAddEvent'
import { FormEvent, useState } from 'react'

export default function AddEventPage() {
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [startDate, setStartDate] = useState<string>(useDateStore.use.date())
  const [endDate, setEndDate] = useState<string>(useDateStore.use.date())

  const router = useRouter()
  const { mutate } = useAddEvent()

  const onEventSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!title || !startDate || !endDate) {
      return
    }
    mutate({ title, content, startDate, endDate })
    router.back()
  }

  return (
    <Modal className="p-3 pt-8">
      <form onSubmit={onEventSubmit}>
        <div className="flex gap-3 mb-3">
          <Input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
          <Input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-3">
          <Input
            type="text"
            placeholder="이벤트 제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextArea
            placeholder="이벤트 내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="w-full flex justify-end gap-2 mt-5">
          <Button type="button" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit">등록</Button>
        </div>
      </form>
    </Modal>
  )
}
