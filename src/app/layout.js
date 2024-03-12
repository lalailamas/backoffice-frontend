import Analytics from '@/components/admin/analitics/analytics'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import { Suspense } from 'react'
import 'tailwindcss/tailwind.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body data-theme='light' className='bg-d-white'>
        <Suspense>
          <Analytics />
        </Suspense>

        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
