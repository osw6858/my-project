import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <nav className="flex flex-col gap-3">
        <Link href="/calendar">캘린더 바로가기</Link>
        <Link href="/">채팅 바로가기</Link>
      </nav>
    </div>
  )
}
