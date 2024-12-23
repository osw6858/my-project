'use client'

import React, { HTMLAttributes, useMemo } from 'react'
import dayjs from 'dayjs'
import { useCalendar } from '@/app/(home)/calendar/_hooks/useCalendar'
import { cn } from '@/lib/cn'
import Button from '@/components/ui/Button'
import { useDateStore } from '@/store/date'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { colorStyles } from '@/constant/background'

export default function Calendar({
  className,
  ...htmlProps
}: HTMLAttributes<HTMLDivElement>) {
  const { date: selectDate, setDate } = useDateStore()
  const { year, month, weeks, goToNextMonth, goToPrevMonth } = useCalendar()

  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토']
  const today = dayjs()

  const allEvents = weeks.flatMap((week) => week.flatMap((day) => day.events))

  const eventColorMap = useMemo(() => {
    const map = new Map()
    let colorIndex = 0
    for (const event of allEvents) {
      if (!map.has(event.id)) {
        map.set(event.id, colorStyles[colorIndex % colorStyles.length])
        colorIndex++
      }
    }
    return map
  }, [allEvents])

  const handleClick = (date: dayjs.Dayjs) => {
    const formatDate = date.format('YYYY-MM-DD')
    setDate(formatDate)
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
          <ChevronLeft />
        </Button>
        <h2 className="text-xl font-bold">
          {year}년 {month}월
        </h2>
        <Button
          variant={'ghost'}
          className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
          onClick={goToNextMonth}
        >
          <ChevronRight />
        </Button>
      </div>

      <div className="grid grid-cols-7 gap-1 text-center font-medium mb-2">
        {daysOfWeek.map((day, index) => (
          <span
            key={day}
            className={cn('text-gray-600', index === 0 && 'text-red-500')}
          >
            {day}
          </span>
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
                    'p-2 h-24 rounded relative overflow-hidden md:h-28',
                    currentMonth ? 'text-black' : 'text-gray-400',
                    isToday && 'text-blue-500 font-bold',
                    isSunday && currentMonth && 'text-red-500',
                    dayjs(selectDate)?.isSame(date, 'day') && 'bg-gray-50',
                  )}
                >
                  <span>{date.date()}</span>
                  <div className="absolute top-8 left-0 right-0 flex flex-col items-center space-y-1">
                    {events.slice(0, 2).map((event) => {
                      const style = eventColorMap.get(event.id)
                      return (
                        <div
                          key={event.id}
                          style={style}
                          className="text-xs px-1 w-full h-4"
                        >
                          <span>
                            {date.format('YYYY-MM-DD') ===
                            dayjs(event.startDate).format('YYYY-MM-DD')
                              ? event.title
                              : ''}
                          </span>
                        </div>
                      )
                    })}

                    {events.length > 3 && (
                      <div className="text-xs text-gray-500 px-1 w-full h-4">
                        <span>+ {events.length - 2}개</span>
                      </div>
                    )}
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
