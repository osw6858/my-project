import { http, HttpResponse } from 'msw'
import { DB } from '@/mock/db/event'
import { END_POINT } from '@/constant/endPoint'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'
import { Event, EventWithoutId } from '@/schemas/event' // 고유 ID 생성을 위해 추가

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

  http.post(END_POINT.event, async ({ request }) => {
    try {
      const newEvent = (await request.json()) as EventWithoutId

      if (!newEvent.title || !newEvent.startDate || !newEvent.endDate) {
        return HttpResponse.json(
          { error: '이벤트에 필요한 필드가 누락되었습니다.' },
          { status: 400 },
        )
      }

      const { ...eventData } = newEvent

      const eventToAdd = {
        id: uuidv4(),
        ...eventData,
      }

      DB.event.push(eventToAdd)

      return HttpResponse.json(
        { message: '이벤트가 성공적으로 추가되었습니다.', event: eventToAdd },
        { status: 201 },
      )
    } catch (error) {
      return HttpResponse.json(
        { error: `요청 처리 중 에러가 발생했습니다: ${error}` },
        { status: 500 },
      )
    }
  }),

  http.delete(`${END_POINT.event}/:id`, ({ params }) => {
    const { id } = params

    const eventIndex = DB.event.findIndex((event) => event.id === id)

    if (eventIndex === -1) {
      return HttpResponse.json(
        { error: '해당 ID의 이벤트를 찾을 수 없습니다.' },
        { status: 404 },
      )
    }

    DB.event.splice(eventIndex, 1)

    return HttpResponse.json(
      { message: '이벤트가 성공적으로 삭제되었습니다.' },
      { status: 200 },
    )
  }),

  http.patch(`${END_POINT.event}/:id`, async ({ params, request }) => {
    const { id } = params
    const updatedEvent = (await request.json()) as Event

    const eventIndex = DB.event.findIndex((event) => event.id === id)

    if (eventIndex === -1) {
      return HttpResponse.json(
        { error: '해당 ID의 이벤트를 찾을 수 없습니다.' },
        { status: 404 },
      )
    }

    DB.event[eventIndex] = {
      ...DB.event[eventIndex],
      ...updatedEvent,
    }

    return HttpResponse.json(
      {
        message: '이벤트가 성공적으로 수정되었습니다.',
        event: DB.event[eventIndex],
      },
      { status: 200 },
    )
  }),
]
