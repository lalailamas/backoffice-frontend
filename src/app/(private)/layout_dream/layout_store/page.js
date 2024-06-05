'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { getStores } from '@/api/store'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import DspLoader from '@/components/admin/common/loader'
import { useEffect, useState } from 'react'
import { getLayout } from '@/api/layout'
import ErrorMessage from '@/components/admin/common/error'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import StoreLayout from '../storelayout'

function LayoutStore () {
  const searchParams = useSearchParams()
  const storeId = searchParams.get('id')
  const [store, setStore] = useState()
  const [layout, setLayout] = useState()
  const router = useRouter()

  const { products, loading, error } = useGetProdByStore(storeId)

  const handleLayout = async (layoutId) => {
    try {
      const result = await getLayout(layoutId)
      if (result) {
        setLayout(result)
      }
    } catch (error) {
      console.error(error, 'ERROR')
    }
  }

  const handleBringStore = async () => {
    try {
      const storesResponse = await getStores()
      if (!storesResponse.error) {
        const storeResponse = storesResponse.filter((store) => store.storeId === storeId)
        if (storeResponse.length === 0) {
          return
        }
        setStore(storeResponse[0])
        handleLayout(storeResponse[0].layoutId)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    handleBringStore()
  }, [])
  if (error) {
    return <ErrorMessage />
  }

  const handleNewLayout = () => {
    router.push(`/layout_dream/new_layout?id=${storeId}`)
  }
  return (

    <>
      {(loading)
        ? (
          <DspLoader />
          )
        : (
          <div className='p-2'>
            <div className='flex justify-end p-4'>
              <ButtonPrimary text='Crear nuevo' onClick={handleNewLayout} />
            </div>
            <StoreLayout store={store} layout={layout} products={products} />
          </div>
          )}
    </>
  )
}

export default LayoutStore
