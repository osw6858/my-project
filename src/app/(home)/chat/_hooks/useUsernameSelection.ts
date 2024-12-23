import { useEffect, useState } from 'react'
import socket from '@/socket'

export const useUsernameSelection = () => {
  const [usernameAlreadySelected, setUsernameAlreadySelected] =
    useState<boolean>(false)

  const onUsernameSelection = (username: string) => {
    setUsernameAlreadySelected(true)
    socket.auth = { username }
    socket.connect()
  }

  useEffect(() => {
    const handleConnectError = (err: Error) => {
      if (err.message === 'invalid username') {
        setUsernameAlreadySelected(false)
      }
    }

    socket.on('connect_error', handleConnectError)

    return () => {
      socket.off('connect_error', handleConnectError)
    }
  }, [])

  return { usernameAlreadySelected, onUsernameSelection }
}
