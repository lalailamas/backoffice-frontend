// import Analytics from '@/components/admin/analitics/analytics'

import DspLoader from '@/components/admin/common/loader'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import { Suspense } from 'react'
import 'tailwindcss/tailwind.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body data-theme='light' className='bg-d-white'>

        <SessionAuthProvider>
          <Suspense fallback={<DspLoader />}>
            {children}
          </Suspense>
        </SessionAuthProvider>

      </body>
    </html>
  )
}
