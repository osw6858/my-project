import { EventWithoutId } from '@/schemas/event'
import dayjs from 'dayjs'

export const validateEvent = (event: EventWithoutId) => {
  const { title, startDate, endDate } = event

  if (!title || title.trim() === '') {
    return { result: false, message: '제목은 필수 입니다.' }
  }

  const start = dayjs(startDate)
  const end = dayjs(endDate)

  if (!start.isValid()) {
    return { result: false, message: '시작 날짜가 유효하지 않습니다.' }
  }

  if (!end.isValid()) {
    return { result: false, message: '끝나는 날짜가 유효하지 않습니다.' }
  }

  if (start.isAfter(end)) {
    return {
      result: false,
      message: '시작 날짜는 끝나는 날짜보다 앞서야 합니다.',
    }
  }

  return { result: true, message: null }
}
