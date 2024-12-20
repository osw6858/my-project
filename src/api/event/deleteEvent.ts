import { fetchApi } from '@/api/axios/axiosInstance'
import { END_POINT } from '@/constant/endPoint'
import { AxiosError } from 'axios'
import { ApiResult } from '@/api/apiResult'

export const deleteEvent = async (id: string): Promise<ApiResult<null>> => {
  try {
    await fetchApi.delete(`${END_POINT.event}/${id}`)
    return {
      status: 'success',
      data: null,
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
