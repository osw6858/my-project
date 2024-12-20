import { useMutation, useQueryClient } from '@tanstack/react-query'
import { addEvent } from '@/api/event/addEvent'
import { EventWithoutId } from '@/schemas/event'
import { QUERY_KEY } from '@/constant/queryKey'

export const useAddEvent = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (event: EventWithoutId) => {
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
