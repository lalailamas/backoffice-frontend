'use client'
import SessionAuthProvider from '../context/SessionAuthProvider'
import 'tailwindcss/tailwind.css'
import Sidebar from '@/components/admin/common/sidebar'
import Navbar from '@/components/admin/common/navbar'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

export default function RootLayout ({ children }) {
  const [showDrawer, setShowDrawer] = useState(false)
  const pathname = usePathname()
  const isLoginPage = pathname === '/'

  return (
    <html lang='es'>
      <body data-theme='light' className='bg-d-white'>
        <SessionAuthProvider>
          <div className='drawer-content overflow-x-auto h-screen bg-d-white'>
            <div className='drawer' data-theme='light'>
              <input
                id='dsp-drawer'
                type='checkbox'
                checked={showDrawer}
                onChange={() => setShowDrawer(!showDrawer)}
                className='drawer-toggle'
              />
              <div className='drawer-content overflow-x-auto bg-d-white'>
                {!isLoginPage && <Navbar toggle={() => setShowDrawer(!showDrawer)} />}

              </div>

              <div className='z-10 drawer-side'>
                <label htmlFor='dsp-drawer' className='drawer-overlay' />
                {!isLoginPage && showDrawer && <Sidebar toggle={() => setShowDrawer(!showDrawer)} />}
              </div>
            </div>

            {children}

          </div>
        </SessionAuthProvider>
      </body>
    </html>
  )
}
