import { http, HttpResponse } from 'msw'
import { DB } from '@/mock/db/event'
import { END_POINT } from '@/constant/endPoint'
import dayjs from 'dayjs'

export const handlers = [
  http.get(END_POINT.event, ({ request }) => {
    const url = new URL(request.url)
    const monthParam = url.searchParams.get('month')

    if (!monthParam) {
      return HttpResponse.json(
        { error: '월이 누락되었습니다.' },
        { status: 400 },
      )
    }

    const month = parseInt(monthParam, 10)

    if (isNaN(month) || month < 1 || month > 12) {
      return HttpResponse.json({ error: '올바르지 않는 월' }, { status: 400 })
    }

    const filteredEvents = DB.event.filter((event) => {
      const eventMonth = dayjs(event.startDate).month() + 1
      return eventMonth === month
    })

    return HttpResponse.json(filteredEvents)
  }),
]
