import { fetchApi } from '@/api/axios/axiosInstance'
import { END_POINT } from '@/constant/endPoint'
import { EventsList, eventsListSchema } from '@/schemas/event'
import { AxiosError } from 'axios'
import { ApiResult } from '@/api/apiResult'

export const getEvent = async (
  month: string,
): Promise<ApiResult<EventsList>> => {
  try {
    const res = await fetchApi.get(END_POINT.event, {
      params: {
        month,
      },
    })

    const result = res.data

    const { data, success, error } = eventsListSchema.safeParse(result)

    if (success) {
      return {
        status: 'success',
        data: data,
      }
    } else {
      return {
        status: 'error',
        error: `서버 응답이 예상한 형식과 다릅니다: ${error}`,
      }
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
