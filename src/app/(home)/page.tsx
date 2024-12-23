import Link from 'next/link'
import Button from '@/components/ui/Button'

export default function Home() {
  return (
    <div className="flex-1 flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-blue-500 mb-6">
          Welcome to My App
        </h1>
        <p className="text-gray-600 text-lg mb-8">
          원하는 페이지로 이동하려면 아래 버튼을 클릭하세요!
        </p>
        <nav className="flex flex-col gap-4">
          <Button className="py-3 px-6 h-full text-lg" asChild>
            <Link href="/calendar">캘린더 바로가기</Link>
          </Button>
          <Button className="py-3 px-6 h-full text-lg" asChild>
            <Link href="/chat">채팅 바로가기</Link>
          </Button>
        </nav>
      </div>
    </div>
  )
}
