import { HTMLAttributes } from 'react'
import { Event } from '@/schemas/event'
import Button from '@/components/ui/Button'

interface EventItemProps {
  event?: Event
}

export default function EventItem({
  event,
  ...htmlProps
}: EventItemProps & HTMLAttributes<HTMLElement>) {
  return (
    <section
      {...htmlProps}
      className="border border-gray-200 rounded-lg p-4 shadow-sm bg-white hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{event?.title}</h3>
        <div className="text-sm text-gray-500">
          <Button variant={'ghost'}>수정</Button>
          <Button variant={'ghost'}>삭제</Button>
        </div>
      </div>
      <p className="text-gray-600">{event?.content}</p>
    </section>
  )
}
