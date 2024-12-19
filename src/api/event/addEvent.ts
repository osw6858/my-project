import { fetchApi } from '@/api/axios/axiosInstance'
import { END_POINT } from '@/constant/endPoint'
import { Event } from '@/schemas/event'
import { AxiosError } from 'axios'

export const addEvent = async (event: Omit<Event, 'id'>) => {
  try {
    const res = await fetchApi.post(END_POINT.event, event)

    const result = res.data

    return {
      status: 'success',
      data: result,
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
