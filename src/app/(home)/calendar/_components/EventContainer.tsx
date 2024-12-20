'use client'

import { useDateStore } from '@/store/date'
import EventList from '@/app/(home)/calendar/_components/EventList'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'

export default function EventContainer() {
  const date = useDateStore.use.date() || dayjs().format('YYYY-MM-DD')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (date) {
      setIsLoading(false)
    }
  }, [date])

  return (
    <div className="flex-1 min-h-60 px-4 pb-4 bg-white border rounded shadow md:max-h-[800px] md:overflow-y-scroll">
      {!isLoading ? (
        <>
          <div className="sticky top-0 left-0 right-0 bg-white z-10 p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-lg">{date}</h2>
              <Button asChild>
                <Link scroll={false} href={'/add-event'}>
                  이벤트 추가
                </Link>
              </Button>
            </div>
          </div>
          <EventList date={date} />
        </>
      ) : (
        <div>로딩중...</div>
      )}
    </div>
  )
}
