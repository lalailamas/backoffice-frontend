// import Analytics from '@/components/admin/analitics/analytics'

import SessionAuthProvider from '@/context/SessionAuthProvider'
import 'tailwindcss/tailwind.css'
import { GoogleTagManager } from '@next/third-parties/google'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body data-theme='light' className='bg-d-white'>
        <GoogleTagManager gtmId='GTM-WK457DPP' />

        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
