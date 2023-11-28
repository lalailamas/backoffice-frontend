import SessionAuthProvider from '../context/SessionAuthProvider'
import 'tailwindcss/tailwind.css'
// import Sidebar from '@/components/admin/common/sidebar'
// import Navbar from '@/components/admin/common/navbar'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body data-theme='light' className='bg-d-white'>
        <SessionAuthProvider>
          <div className='drawer-content bg-d-white'>

            {children}

          </div>
        </SessionAuthProvider>
      </body>
    </html>
  )
}
