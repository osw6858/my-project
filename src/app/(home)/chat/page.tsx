'use client'

import Chat from '@/app/(home)/chat/_components/Chat'
import SelectUsername from '@/app/(home)/chat/_components/SelectUsername'
import { useUsernameSelection } from '@/app/(home)/chat/_hooks/useUsernameSelection'

export default function ChatPage() {
  const { usernameAlreadySelected, onUsernameSelection } =
    useUsernameSelection()

  return (
    <>
      {!usernameAlreadySelected ? (
        <SelectUsername onUsernameSelection={onUsernameSelection} />
      ) : (
        <Chat />
      )}
    </>
  )
}
