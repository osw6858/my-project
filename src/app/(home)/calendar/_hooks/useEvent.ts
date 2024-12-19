import { useQuery } from '@tanstack/react-query'
import { QUERY_KEY } from '@/constant/queryKey'
import { getEvent } from '@/api/event/getEvent'

export const useEvent = (month: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.event, month],
    queryFn: async () => {
      const res = await getEvent(month)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return res.data
    },
    enabled: !!month,
  })
}
