import SessionAuthProvider from '../context/SessionAuthProvider'
import Sidebar from '@/components/admin/common/sidebar'
import Navbar from '@/components/admin/common/navbar'

export default function RootLayout ({ children }) {
  return (
    <html lang='es'>
      <body data-theme='light' className='bg-d-white'>
        <SessionAuthProvider>
          <div className='drawer-content overflow-x-auto bg-d-white'>
            <Navbar />
            {children}

          </div>

          <div className='z-10 drawer-side'>
            <label htmlFor='dsp-drawer' className='drawer-overlay' />
            <Sidebar />

          </div>
        </SessionAuthProvider>
      </body>
    </html>
  )
}
