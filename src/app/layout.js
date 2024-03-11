import SessionAuthProvider from '@/context/SessionAuthProvider'
import 'tailwindcss/tailwind.css'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body data-theme='light' className='bg-d-white'>
        <SessionAuthProvider>
          {children}
        </SessionAuthProvider>
      </body>
    </html>
  )
}
