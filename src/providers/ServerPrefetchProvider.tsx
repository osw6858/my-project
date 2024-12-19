import {
  dehydrate,
  HydrationBoundary,
  QueryFunction,
  QueryKey,
} from '@tanstack/react-query'

import { ReactNode } from 'react'
import { getSingleQueryClient } from '@/lib/queryClient'

export interface QueryConfig {
  queryKey: QueryKey
  queryFn: QueryFunction
}

export interface ServerPrefetchProviderProps {
  children: ReactNode
  queries: QueryConfig | QueryConfig[]
}

export default async function ServerPrefetchProvider({
  children,
  queries,
}: ServerPrefetchProviderProps) {
  const queryClient = getSingleQueryClient()

  const queriesToPrefetch = Array.isArray(queries) ? queries : [queries]

  try {
    await Promise.all(
      queriesToPrefetch.map(({ queryKey, queryFn }) =>
        queryClient.prefetchQuery({ queryKey, queryFn }),
      ),
    )
  } catch (error) {
    console.error('서버사이드 프리패칭 실패:', error)
    queryClient.setQueryData(['serverError'], error)
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  )
}
