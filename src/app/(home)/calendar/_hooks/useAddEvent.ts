import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addEvent } from '@/api/event/addEvent'
import { Event } from '@/schemas/event'
import { QUERY_KEY } from '@/constant/queryKey'

export const useAddEvent = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (event: Omit<Event, 'id'>) => {
      const res = await addEvent(event)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return res.data
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: [QUERY_KEY.event] })
    },
    onError: (error) => {
      console.error(error)
    },
  })
}
