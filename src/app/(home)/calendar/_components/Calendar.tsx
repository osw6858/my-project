'use client'

import React, { HTMLAttributes } from 'react'
import dayjs from 'dayjs'
import { useCalendar } from '@/app/(home)/calendar/_hooks/useCalendar'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import { useDateStore } from '@/store/date'

export interface Event {
  id: string
  title: string
  content?: string
  startDate: string
  endDate: string
}

interface CalendarProps {
  events?: Event[]
}

export default function Calendar({
  events = [],
  className,
  ...htmlProps
}: CalendarProps & HTMLAttributes<HTMLDivElement>) {
  const { date: selectDate, setDate } = useDateStore()
  const { year, month, weeks, goToNextMonth, goToPrevMonth } =
    useCalendar(events)

  console.log(selectDate)

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']
  const today = dayjs()

  const handleClick = (date: dayjs.Dayjs) => {
    const formatDate = date.format('YYYY-MM-DD')
    setDate(formatDate)
    console.log(date.format('YYYY-MM-DD'))
  }

  return (
    <div
      {...htmlProps}
      className={cn('p-4 bg-white border rounded shadow', className)}
    >
      <div className="flex justify-between items-center mb-4">
        <Button
          variant={'ghost'}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={goToPrevMonth}
        >
          &lt;
        </Button>
        <h2 className="text-xl font-bold">
          {year}년 {month}월
        </h2>
        <Button
          variant={'ghost'}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={goToNextMonth}
        >
          &gt;
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={day}
            className={cn('text-gray-600', index === 0 && 'text-red-500')}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 text-center">
        {weeks.map((week, wIndex) => (
          <React.Fragment key={wIndex}>
            {week.map(({ date, currentMonth, events }, dIndex) => {
              const isToday = date.isSame(today, 'day')
              const isSunday = date.day() === 0

              return (
                <div
                  onClick={() => handleClick(date)}
                  key={dIndex}
                  className={cn(
                    'p-2 h-20 rounded relative overflow-hidden md:h-28',
                    currentMonth ? 'text-black' : 'text-gray-400',
                    isToday && 'text-blue-500 font-bold',
                    isSunday && currentMonth && 'text-red-500',
                    dayjs(selectDate)?.isSame(date, 'day') && 'bg-gray-50',
                  )}
                >
                  <div>{date.date()}</div>
                  <div className="absolute top-8 left-0 right-0 flex flex-col items-center space-y-1">
                    {events.map((event) => (
                      <div
                        key={event.id}
                        className="bg-green-200 text-green-800 text-xs px-1 w-full h-4"
                      >
                        {date.format('YYYY-MM-DD') ===
                        dayjs(event.startDate).format('YYYY-MM-DD')
                          ? event.title
                          : ''}
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
