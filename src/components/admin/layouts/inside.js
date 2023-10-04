import { useEffect, useState } from 'react'
import Navbar from '../common/navbar'
import Sidebar from '../common/sidebar'
// import { useRouter } from 'next/navigation'
import DspLoader from '../common/loader'

export default function InsideLayout ({ children }) {
  const [showDrawer, setShowDrawer] = useState(false)
  // const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(
    () => {
      // if (!user) {
      //   router.push('/admin/login')
      // }
      setLoading(false)
    },
    []
  )

  if (loading) {
    return <DspLoader />
  }

  return (
    <>
      <div className='drawer' data-theme='light'>
        <input id='dsp-drawer' type='checkbox' checked={showDrawer} onChange={() => setShowDrawer(!showDrawer)} className='drawer-toggle' />
        <div className='drawer-content overflow-x-auto bg-d-white'>
          <Navbar toggle={() => setShowDrawer(!showDrawer)} />
          {children}

        </div>

        <div className='z-10 drawer-side'>
          <label htmlFor='dsp-drawer' className='drawer-overlay' />
          <Sidebar />

        </div>

      </div>

    </>
  )
}
