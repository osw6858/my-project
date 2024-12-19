'use client'

import Modal from '@/components/ui/Modal'
import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import Button from '@/components/ui/Button'
import { useRouter } from 'next/navigation'
import { useDateStore } from '@/store/date'

export default function AddEventPage() {
  const router = useRouter()
  const date = useDateStore.use.date()

  return (
    <Modal className="p-3">
      <div className="flex gap-3 mb-3">
        <Input type={'date'} defaultValue={date} />
        <Input type={'date'} defaultValue={date} />
      </div>
      <div className="flex flex-col gap-3">
        <Input type="text" placeholder="이벤트 제목" />
        <TextArea placeholder="이벤트 내용" />
      </div>
      <div className="w-full flex justify-end gap-2 mt-5">
        <Button onClick={() => router.back()}>취소</Button>
        <Button>등록</Button>
      </div>
    </Modal>
  )
}
