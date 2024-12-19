import { isServer, QueryClient } from '@tanstack/react-query'
import { cache } from 'react'

const options = {
  queries: {
    staleTime: 60 * 1000,
    refetchOnWindowFocus: false,
    retry: 1,
  },
}

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: options,
  })
}

const getSingleQueryClient = cache(
  () =>
    new QueryClient({
      defaultOptions: options,
    })
)

let browserQueryClient: QueryClient | undefined = undefined

function getQueryClient() {
  if (isServer) {
    return makeQueryClient()
  } else {
    if (!browserQueryClient) browserQueryClient = makeQueryClient()
    return browserQueryClient
  }
}

export { makeQueryClient, getQueryClient, getSingleQueryClient }
