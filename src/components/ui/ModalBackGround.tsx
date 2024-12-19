'use client'

import { ReactNode, useEffect } from 'react'

interface ModalBackGroundProps {
  children: ReactNode
}

export default function ModalBackGround({ children }: ModalBackGroundProps) {
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed; 
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`
    return () => {
      const scrollY = document.body.style.top
      document.body.style.cssText = ''
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
    }
  }, [])

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      {children}
    </div>
  )
}
