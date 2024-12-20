import { ReactNode } from 'react'
import Header from '@/components/ui/Header'
import Footer from '@/components/ui/Footer'

interface LayoutProps {
  children: ReactNode
  modal: ReactNode
}

export default function HomeLayout({ children, modal }: LayoutProps) {
  return (
    <>
      <Header />
      <main className="container mx-auto flex flex-col min-h-[calc(100vh-113px)]">
        {children}
        {modal}
      </main>
      <Footer />
    </>
  )
}
