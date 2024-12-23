import { HTMLAttributes, useState } from 'react'
import { Event } from '@/schemas/event'
import Button from '@/components/ui/Button'
import { useDeleteEvent } from '@/app/(home)/calendar/_hooks/useDeleteEvent'
import UpdateEventForm from '@/app/(home)/calendar/_components/UpdateEventForm'

interface EventItemProps {
  event?: Event
}

export default function EventItem({
  event,
  ...htmlProps
}: EventItemProps & HTMLAttributes<HTMLElement>) {
  const [isUpdate, setIsUpdate] = useState(false)
  const { mutate: deleteEvent } = useDeleteEvent()

  const handleDeleteEvent = () => {
    if (event) {
      deleteEvent(event.id)
    }
  }

  return (
    <section
      {...htmlProps}
      className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <h3 className="text-lg font-semibold text-gray-800">
            {event?.title}
          </h3>
          <span className="text-sm text-gray-500">({event?.registrant})</span>
        </div>
        <div className="text-sm text-gray-500">
          <Button onClick={() => setIsUpdate(!isUpdate)} variant={'ghost'}>
            {isUpdate ? '취소' : '수정'}
          </Button>
          <Button onClick={handleDeleteEvent} variant={'ghost'}>
            삭제
          </Button>
        </div>
      </div>
      <p className="text-gray-600">{event?.content}</p>
      {isUpdate && <UpdateEventForm event={event} setIsUpdate={setIsUpdate} />}
    </section>
  )
}
