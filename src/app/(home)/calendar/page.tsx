import Calendar from '@/app/(home)/calendar/_components/Calendar'
import EventList from '@/app/(home)/calendar/_components/EventList'

export default function CalendarPage() {
  return (
    <div className="flex-1">
      <div className="flex flex-col lg:flex-row pt-5 gap-2">
        <Calendar className="flex-1" />
        <EventList />
      </div>
    </div>
  )
}
