'use client'

import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useAddEvent } from '@/app/(home)/calendar/_hooks/useAddEvent'
import { FormEvent } from 'react'
import { useEventForm } from '@/app/(home)/calendar/_hooks/useEventForm'
import { validateEvent } from '@/util/validate'

export default function AddEventPage() {
  const {
    title,
    setTitle,
    registrant,
    setRegistrant,
    content,
    setContent,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  } = useEventForm()

  const router = useRouter()
  const { mutate } = useAddEvent()

  const onEventSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const event = { title, content, registrant, startDate, endDate }

    const { result, message } = validateEvent(event)

    if (!result) {
      alert(message)
      return
    }

    mutate({ title, content, registrant, startDate, endDate })
    router.back()
  }

  return (
    <Modal className="py-5 px-3">
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
          <div className="flex gap-3">
            <Input
              type="text"
              placeholder="이벤트 제목"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Input
              type="text"
              placeholder="등록인"
              value={registrant}
              onChange={(e) => setRegistrant(e.target.value)}
            />
          </div>
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
