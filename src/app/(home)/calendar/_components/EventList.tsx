'use client'

import { useDateStore } from '@/store/date'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import EventItem from '@/app/(home)/calendar/_components/EventItem'

export default function EventList() {
  const date = useDateStore.use.date()

  return (
    <div className="flex-1 min-h-60 p-4 bg-white border rounded shadow">
      {date && (
        <>
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-lg">{date}</h2>
            <Button asChild>
              <Link href={'/add-event'}>이벤트 추가</Link>
            </Button>
          </div>
          <div className="flex flex-col gap-3 py-5">
            <EventItem />
          </div>
        </>
      )}
    </div>
  )
}
