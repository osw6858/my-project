import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full border-b border-solid border-gray-200">
      <div className="container mx-auto flex items-center h-14 gap-10">
        <Link href="/">
          <h1>logo</h1>
        </Link>
        <nav className="space-x-5">
          <Link href="/calendar">캘린더</Link>
          <Link href="/">채팅</Link>
        </nav>
      </div>
    </header>
  )
}
