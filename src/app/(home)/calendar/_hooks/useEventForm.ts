import { useEffect, useState } from 'react'
import { useDateStore } from '@/store/date'
import { Event } from '@/schemas/event'

export const useEventForm = (event?: Event) => {
  const date = useDateStore.use.date()

  const [title, setTitle] = useState<string>(event?.title || '')
  const [registrant, setRegistrant] = useState<string>(event?.registrant || '')
  const [content, setContent] = useState<string>(event?.content || '')
  const [startDate, setStartDate] = useState<string>(event?.startDate || '')
  const [endDate, setEndDate] = useState<string>(event?.endDate || '')

  useEffect(() => {
    if (!event && date) {
      setStartDate(date)
      setEndDate(date)
    }
  }, [date, event])

  return {
    title,
    setTitle,
    registrant,
    setRegistrant,
    content,
    setContent,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
  }
}
