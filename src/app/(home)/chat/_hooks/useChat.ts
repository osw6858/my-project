import { useEffect, useState } from 'react'
import socket from '@/socket'
import {
  IncomingPrivateMessage,
  Message,
  MessageType,
  UserType,
} from '@/schemas/chat'

interface AdditionalDataType {
  url?: string
  tel?: string
  introduce?: string
}

export default function useChat() {
  const [selectedUserID, setSelectedUserID] = useState<string | null>(null)
  const [users, setUsers] = useState<UserType[]>([])

  const selectedUser =
    users.find((user) => user.userID === selectedUserID) || null

  const onMessage = (
    type: MessageType,
    content: string,
    additionalData?: AdditionalDataType,
  ) => {
    if (!selectedUser) {
      return
    }

    // 전송할 메시지 객체
    const newMessage: Omit<Message, 'fromSelf'> = {
      type,
      content,
      ...additionalData,
    }

    socket.emit('private message', {
      ...newMessage,
      to: selectedUser.userID,
    })

    setUsers((prevUsers) =>
      prevUsers.map((user) => {
        if (user.userID === selectedUser.userID) {
          return {
            ...user,
            messages: [...user.messages, { ...newMessage, fromSelf: true }],
          }
        }
        return user
      }),
    )
  }

  const onSelectUser = (user: UserType) => {
    setSelectedUserID(user.userID)
    setUsers((prevUsers) =>
      prevUsers.map((u) =>
        u.userID === user.userID ? { ...u, hasNewMessages: false } : u,
      ),
    )
  }

  useEffect(() => {
    const handleUsers = (usersData: UserType[]) => {
      const initializedUsers = usersData.map((user) => ({
        ...user,
        self: user.userID === socket.id,
        connected: true,
        messages: [],
        hasNewMessages: false,
      }))

      // 본인이 첫번째, 그 다음 사용자 이름 순으로 정렬
      initializedUsers.sort((a, b) => {
        if (a.self) return -1
        if (b.self) return 1
        return a.username.localeCompare(b.username)
      })

      setUsers(initializedUsers)
    }

    const handleUserConnected = (user: UserType) => {
      const newUser: UserType = {
        ...user,
        connected: true,
        messages: [],
        hasNewMessages: false,
      }
      setUsers((prevUsers) =>
        [...prevUsers, newUser].sort((a, b) => {
          if (a.self) return -1
          if (b.self) return 1
          return a.username.localeCompare(b.username)
        }),
      )
    }

    const handleUserDisconnected = (id: string) => {
      setUsers(
        (prevUsers) => prevUsers.filter((user) => user.userID !== id), // 목록에서 제거
      )

      // alert('상대방이 채팅방을 나갔습니다.')
    }

    const handleConnect = () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.self ? { ...user, connected: true } : user,
        ),
      )
    }

    const handleDisconnect = () => {
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.self ? { ...user, connected: false } : user,
        ),
      )
    }

    const handlePrivateMessage = ({
      type,
      content,
      introduce,
      from,
      url,
      tel,
    }: IncomingPrivateMessage & {
      type: MessageType
      introduce?: string
      url?: string
      tel?: string
    }) => {
      setUsers((prevUsers) =>
        prevUsers.map((user) => {
          if (user.userID === from) {
            const updatedMessages = [
              ...user.messages,
              {
                type,
                content,
                introduce,
                url,
                tel,
                fromSelf: false,
              },
            ]

            return {
              ...user,
              messages: updatedMessages,
              hasNewMessages:
                selectedUserID !== from ? true : user.hasNewMessages,
            }
          }
          return user
        }),
      )
    }

    socket.on('users', handleUsers)
    socket.on('user connected', handleUserConnected)
    socket.on('user disconnected', handleUserDisconnected)
    socket.on('connect', handleConnect)
    socket.on('disconnect', handleDisconnect)
    socket.on('private message', handlePrivateMessage)

    return () => {
      socket.off('connect', handleConnect)
      socket.off('disconnect', handleDisconnect)
      socket.off('users', handleUsers)
      socket.off('user connected', handleUserConnected)
      socket.off('user disconnected', handleUserDisconnected)
      socket.off('private message', handlePrivateMessage)
    }
  }, [selectedUserID])

  return { users, selectedUser, onMessage, selectedUserID, onSelectUser }
}
