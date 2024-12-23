import Link from 'next/link'

export default function Header() {
  return (
    <header className="w-full border-b border-solid border-gray-200">
      <div className="container mx-auto flex items-center h-14 gap-10 px-3">
        <Link href="/">
          <h1 className="font-bold text-xl">Logo</h1>
        </Link>
        <nav className="space-x-5 text-sm">
          <Link href="/calendar">캘린더</Link>
          <Link href="/chat">채팅</Link>
        </nav>
      </div>
    </header>
  )
}
