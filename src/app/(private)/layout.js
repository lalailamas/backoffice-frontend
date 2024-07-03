'use client'

import 'tailwindcss/tailwind.css'
import Sidebar from '@/components/admin/common/sidebar'
import Navbar from '@/components/admin/common/navbar'
import Footer from '@/components/admin/common/footer'
import { useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * RootLayout component for managing the layout of the admin panel.
 * Includes a sidebar, navbar, and footer.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The child components to be rendered within the layout.
 * @returns {JSX.Element} The rendered RootLayout component.
 */
export default function RootLayout ({ children }) {
  // State to manage the visibility of the drawer
  const [showDrawer, setShowDrawer] = useState(false)

  // Get the current pathname
  const pathname = usePathname()

  // Determine if the current page is the login page
  const isLoginPage = pathname === '/'

  return (
    <div className='drawer-content overflow-x-auto flex flex-col min-h-screen bg-d-white'>
      <div className='drawer' data-theme='light'>
        <input
          id='dsp-drawer'
          type='checkbox'
          checked={showDrawer}
          onChange={() => setShowDrawer(!showDrawer)}
          className='drawer-toggle'
        />
        <div className='drawer-content overflow-x-auto bg-d-white'>
          {/* Conditionally render the Navbar only if it's not the login page */}
          {!isLoginPage && (
            <Navbar toggle={() => setShowDrawer(!showDrawer)} />
          )}
        </div>
        <div className='z-10 drawer-side'>
          <label htmlFor='dsp-drawer' className='drawer-overlay' />
          {/* Conditionally render the Sidebar only if it's not the login page and the drawer is shown */}
          {!isLoginPage && showDrawer && <Sidebar toggle={() => setShowDrawer(!showDrawer)} />}
        </div>
      </div>

      {/* Main content area */}
      <div className='flex-grow'>
        {children}
      </div>

      {/* Footer */}
      <div className='mt-auto drawer-content overflow-x-auto bg-d-white'>
        <Footer />
      </div>
    </div>
  )
}
