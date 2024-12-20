import { fetchApi } from '@/api/axios/axiosInstance'
import { END_POINT } from '@/constant/endPoint'
import { EventWithoutId, eventWithoutIdSchema } from '@/schemas/event'
import { AxiosError } from 'axios'

export const addEvent = async (event: EventWithoutId) => {
  try {
    const { error } = eventWithoutIdSchema.safeParse(event)

    if (error) {
      return {
        status: 'error',
        error: `올바르지 않은 요청 값입니다: ${error}`,
      }
    }

    const { data } = await fetchApi.post(END_POINT.event, event)

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
