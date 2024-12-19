import { HTMLAttributes } from 'react'

interface EventItemProps {
  event?: Event
}

export default function EventItem({
  event,
  ...htmlProps
}: EventItemProps & HTMLAttributes<HTMLElement>) {
  return (
    <section
      {...htmlProps}
      className="border border-solid border-gray-200 p-2 rounded"
    >
      이벤트1
    </section>
  )
}
