import InsideLayout from '@/components/admin/layouts/inside'
import React, { useEffect } from 'react'
import StepLayout from '../stepLayout'
import { useSearchParams, useRouter } from 'next/navigation'

export default function page () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')

  useEffect(() => {
    console.log(externalId, 'external_id')
    console.log(layoutId, 'layout_id')
    console.log(storeName, 'store_name')
  }, [])
  return (
    <div>
      <InsideLayout />
      <StepLayout />
      <button
        type='button'
        onClick={() => {
          router.push(
            'restock/stepTwo' + `?external_id=${selectedStore.external_id}&layout_id=${selectedStore.layout_id}&store_name=${selectedStore.name}`
          )
        }}
        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Abrir máquina
        <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
        </svg>
      </button>
    </div>
  )
}
