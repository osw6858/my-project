import { useCallback, useMemo, useState } from 'react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import { useEvent } from '@/app/(home)/calendar/_hooks/useEvent'
import { EventsList } from '@/schemas/event'

dayjs.extend(isBetween)

interface Day {
  date: dayjs.Dayjs
  currentMonth: boolean
  events: EventsList
}

export function useCalendar() {
  const [year, setYear] = useState(dayjs().year())
  const [month, setMonth] = useState(dayjs().month() + 1)

  const { data: events } = useEvent(String(month))

  const currentMonth = dayjs()
    .year(year)
    .month(month - 1)
  const firstDayOfMonth = currentMonth.startOf('month')
  const lastDayOfMonth = currentMonth.endOf('month')
  const startDay = firstDayOfMonth.day()
  const prevMonthLastDay = currentMonth.subtract(1, 'month').daysInMonth()

  const getEventsForDate = (date: dayjs.Dayjs) => {
    return (
      events?.filter((event) =>
        date.isBetween(
          dayjs(event.startDate).startOf('day'),
          dayjs(event.endDate).startOf('day'),
          'day',
          '[]',
        ),
      ) || []
    )
  }

  const calendarDays = useMemo(() => {
    const days: Day[] = []

    for (let i = 0; i < startDay; i++) {
      const date = currentMonth
        .subtract(1, 'month')
        .date(prevMonthLastDay - (startDay - 1 - i))
      days.push({ date, currentMonth: false, events: getEventsForDate(date) })
    }

    for (let d = 1; d <= lastDayOfMonth.date(); d++) {
      const date = currentMonth.date(d)
      days.push({ date, currentMonth: true, events: getEventsForDate(date) })
    }

    const totalCells = 42
    const remainingCells = totalCells - days.length
    for (let i = 1; i <= remainingCells; i++) {
      const date = currentMonth.add(1, 'month').date(i)
      days.push({ date, currentMonth: false, events: getEventsForDate(date) })
    }

    return days
  }, [year, month, events])

  const weeks = useMemo(() => {
    const weeksArr: Day[][] = []
    for (let i = 0; i < calendarDays.length; i += 7) {
      weeksArr.push(calendarDays.slice(i, i + 7))
    }
    return weeksArr
  }, [calendarDays])

  const goToNextMonth = useCallback(() => {
    if (month === 12) {
      setYear((y) => y + 1)
      setMonth(1)
    } else {
      setMonth((m) => m + 1)
    }
  }, [month])

  const goToPrevMonth = useCallback(() => {
    if (month === 1) {
      setYear((y) => y - 1)
      setMonth(12)
    } else {
      setMonth((m) => m - 1)
    }
  }, [month])

  return {
    year,
    month,
    weeks,
    goToNextMonth,
    goToPrevMonth,
  }
}
