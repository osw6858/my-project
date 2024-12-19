import { ReactNode } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

interface LayoutProps {
  children: ReactNode
}

export default function HomeLayout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col min-h-[calc(100vh-112px)]">
        {children}
      </main>
      <Footer />
    </>
  )
}
