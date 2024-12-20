import Calendar from '@/app/(home)/calendar/_components/Calendar'
import EventContainer from '@/app/(home)/calendar/_components/EventContainer'
import { HTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

export default function CalendarContainer({
  className,
  ...htmlProps
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...htmlProps}
      className={cn('flex-1 flex items-center justify-center mb-2', className)}
    >
      <div className="flex-1 flex flex-col lg:flex-row pt-5 gap-2 px-2">
        <Calendar className="flex-1" />
        <EventContainer />
      </div>
    </div>
  )
}
