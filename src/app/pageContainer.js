'use client'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import DspLoader from '@/components/admin/common/loader'

const PageContainer = ({ children }) => {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleStart = () => setLoading(true)
    const handleComplete = () => setLoading(false)

    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    <div>
      {loading && <DspLoader />}
      {children}
    </div>
  )
}

export default PageContainer
