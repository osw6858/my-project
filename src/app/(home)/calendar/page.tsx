import Calendar from '@/app/(home)/calendar/_components/Calendar'

export default function CalendarPage() {
  return (
    <div className="flex-1">
      <div className="grid grid-cols-2">
        <Calendar />
        <div className=""></div>
      </div>
    </div>
  )
}
