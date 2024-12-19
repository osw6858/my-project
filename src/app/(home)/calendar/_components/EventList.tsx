import EventItem from '@/app/(home)/calendar/_components/EventItem'
import { useEvent } from '@/app/(home)/calendar/_hooks/useEvent'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

dayjs.extend(isBetween)

interface EventItemContainerProps {
  date: string
}

export default function EventList({
  date,
  className,
  ...htmlProps
}: EventItemContainerProps & HTMLAttributes<HTMLDivElement>) {
  const month = String(dayjs(date).month() + 1)

  const { data } = useEvent(month)

  const filteredEvents = data?.filter((event) => {
    const targetDate = dayjs(date)
    const startDate = dayjs(event.startDate)
    const endDate = dayjs(event.endDate)

    return targetDate.isBetween(startDate, endDate, 'day', '[]')
  })

  return (
    <div {...htmlProps} className={cn('flex flex-col gap-3 py-5', className)}>
      {filteredEvents && filteredEvents.length > 0 ? (
        filteredEvents.map((event) => (
          <EventItem key={event.id} event={event} />
        ))
      ) : (
        <div className="flex justify-center items-center h-56">
          <p className="text-gray-500">해당 날짜에 이벤트가 없습니다.</p>
        </div>
      )}
    </div>
  )
}
