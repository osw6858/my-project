'use client'

import { useDateStore } from '@/store/date'
import EventList from '@/app/(home)/calendar/_components/EventList'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import dayjs from 'dayjs'

export default function EventContainer() {
  const date = useDateStore.use.date() || dayjs().format('YYYY-MM-DD')

  return (
    <div className="flex-1 min-h-60 p-4 bg-white border rounded shadow">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg">{date}</h2>
        <Button asChild>
          <Link href={'/add-event'}>이벤트 추가</Link>
        </Button>
      </div>
      {date && <EventList date={date} />}
    </div>
  )
}
