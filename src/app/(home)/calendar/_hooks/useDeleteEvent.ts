import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteEvent } from '@/api/event/deleteEvent'
import { QUERY_KEY } from '@/constant/queryKey'

export const useDeleteEvent = () => {
  const client = useQueryClient()

  return useMutation({
    mutationFn: async (id: string) => {
      const res = await deleteEvent(id)
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
