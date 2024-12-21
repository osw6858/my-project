import { useEffect, useState } from 'react'
import socket from '@/socket'

export const useUsernameSelection = () => {
  const [usernameAlreadySelected, setUsernameAlreadySelected] =
    useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const onUsernameSelection = (username: string) => {
    setUsernameAlreadySelected(true)
    socket.auth = { username }
    socket.connect()
  }

  useEffect(() => {
    const handleConnectError = (err: Error) => {
      if (err.message === 'invalid username') {
        setUsernameAlreadySelected(false)
        setError('이미 사용 중인 사용자 이름입니다. 다른 이름을 선택해주세요.')
      } else {
        setError(err.message)
      }
    }

    socket.on('connect_error', handleConnectError)

    return () => {
      socket.off('connect_error', handleConnectError)
    }
  }, [])

  return { usernameAlreadySelected, onUsernameSelection, error }
}
