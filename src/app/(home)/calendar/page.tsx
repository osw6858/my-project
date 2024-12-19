import ServerPrefetchProvider from '@/providers/ServerPrefetchProvider'
import { getEvent } from '@/api/event/getEvent'
import { QUERY_KEY } from '@/constant/queryKey'
import dayjs from 'dayjs'
import CalendarContainer from '@/app/(home)/calendar/_components/CalendarContainer'

export default function CalendarPage() {
  const currentMonth = String(dayjs().month() + 1)

  const prefetchQuery = {
    queryKey: [QUERY_KEY.event, currentMonth],
    queryFn: async () => {
      const res = await getEvent(currentMonth)
      if (res.status === 'error') {
        throw new Error(res.error)
      }
      return res.data
    },
  }

  return (
    <ServerPrefetchProvider queries={prefetchQuery}>
      <CalendarContainer />
    </ServerPrefetchProvider>
  )
}
