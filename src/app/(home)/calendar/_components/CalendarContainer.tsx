import Calendar from '@/app/(home)/calendar/_components/Calendar'
import EventContainer from '@/app/(home)/calendar/_components/EventContainer'

export default function CalendarContainer() {
  return (
    <div className="flex-1">
      <div className="flex flex-col lg:flex-row pt-5 gap-2">
        <Calendar className="flex-1" />
        <EventContainer />
      </div>
    </div>
  )
}
