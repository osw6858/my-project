import Input from '@/components/ui/Input'
import TextArea from '@/components/ui/TextArea'
import Button from '@/components/ui/Button'
import { Event } from '@/schemas/event'
import { useEventForm } from '@/app/(home)/calendar/_hooks/useEventForm'
import { FormEvent } from 'react'
import { useUpdateEvent } from '@/app/(home)/calendar/_hooks/useUpdateEvent'
import { validateEvent } from '@/util/validate'

interface UpdateEventProps {
  event?: Event
  setIsUpdate: (value: boolean) => void
}

export default function UpdateEventForm({
  event,
  setIsUpdate,
}: UpdateEventProps) {
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
  } = useEventForm(event)

  const { mutate } = useUpdateEvent()

  const handleUpdateEvent = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const submitEvent = { title, registrant, content, startDate, endDate }
    const { result, message } = validateEvent(submitEvent)

    if (!result) {
      alert(message)
      return
    }

    if (!event?.id) {
      console.error('올바르지 않은 이벤트.')
      return
    }

    mutate({
      id: event.id,
      updatedEvent: { title, registrant, content, startDate, endDate },
    })
    setIsUpdate(false)
  }

  return (
    <form onSubmit={handleUpdateEvent} className="flex flex-col gap-3 mt-4">
      <div className="flex gap-3">
        <Input
          type={'date'}
          onChange={(e) => setStartDate(e.target.value)}
          value={startDate}
        />
        <Input
          type={'date'}
          onChange={(e) => setEndDate(e.target.value)}
          defaultValue={endDate}
        />
      </div>

      <div className="flex gap-2">
        <Input onChange={(e) => setTitle(e.target.value)} value={title} />
        <Input
          onChange={(e) => setRegistrant(e.target.value)}
          value={registrant}
        />
      </div>
      <TextArea
        onChange={(e) => setContent(e.target.value)}
        defaultValue={content}
      />
      <Button type={'submit'}>저장</Button>
    </form>
  )
}
