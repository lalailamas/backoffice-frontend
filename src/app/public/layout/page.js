'use client'
import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import useGetLayout from '@/hooks/useGetLayout'
import useGetProdByStore from '@/hooks/useGetProdByStore'

function LayoutMachine () {
  const router = useRouter()
  const searchParams = useSearchParams()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const [selectedStore, setSelectedStore] = useState({
    layoutId: 'DEV_WE862puc_v5-5680609',
    name: 'DEV PUC Lo Contador',
    products: []
  })

  useEffect(() => {
    if (selectedStore && selectedStore.layoutId !== null) {
      router.push(`/public/layout?layout_id=${selectedStore.layoutId}&store_name=${selectedStore.name}`)
    }
  }, [selectedStore])

  return (
    <>
      <div className='flex items-center flex-col m-4 p-4'>
        <div className='max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{selectedStore.name}</h5>
        </div>
      </div>

    </>
  )
}

export default LayoutMachine
