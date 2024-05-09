// import Analytics from '@/components/admin/analitics/analytics'

import DspLoader from '@/components/admin/common/loader'
import SessionAuthProvider from '@/context/SessionAuthProvider'
import { Suspense } from 'react'
import 'tailwindcss/tailwind.css'
import InitDataDog from '@/lib/datadogConfig'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body data-theme='light' className='bg-d-white'>

        <SessionAuthProvider>
          <Suspense fallback={<DspLoader />}>
            <InitDataDog />
            {children}
          </Suspense>
        </SessionAuthProvider>

      </body>
    </html>
  )
}
