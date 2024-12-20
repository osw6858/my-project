import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateEvent } from '@/api/event/updateEvent'
import { Event } from '@/schemas/event'
import { QUERY_KEY } from '@/constant/queryKey'

export const useUpdateEvent = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      updatedEvent,
    }: {
      id: string
      updatedEvent: Partial<Event>
    }) => {
      const res = await updateEvent(id, updatedEvent)
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
