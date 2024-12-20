import { fetchApi } from '@/api/axios/axiosInstance'
import { END_POINT } from '@/constant/endPoint'
import { Event, eventSchema } from '@/schemas/event'
import { AxiosError } from 'axios'
import { ApiResult } from '@/api/apiResult'

export const updateEvent = async (
  id: string,
  updatedEvent: Partial<Event>,
): Promise<ApiResult<Event>> => {
  try {
    const event = { id, ...updatedEvent }
    const { error } = eventSchema.safeParse(event)

    if (error) {
      return {
        status: 'error',
        error: `올바르지 않은 요청 값입니다: ${error}`,
      }
    }

    const { data } = await fetchApi.patch(
      `${END_POINT.event}/${id}`,
      updatedEvent,
    )

    return {
      status: 'success',
      data,
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      return {
        status: 'error',
        error: error.response?.data?.message || error.message,
      }
    }
    return {
      status: 'error',
      error: '알 수 없는 에러가 발생했습니다.',
    }
  }
}
