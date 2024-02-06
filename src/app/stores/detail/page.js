'use client'

import { getInventoryByStore } from '@/api/store'
import { swallError } from '@/utils/sweetAlerts'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Products from './products'
import useGetLayout from '@/hooks/useGetLayout'
import TabsComponent from '@/components/admin/common/tabs'
import DspLoader from '@/components/admin/common/loader'
import LayoutDetail from './layoutDetail'
import useGetReiteProd from '@/hooks/useGetReiteProd'

function Detail () {
  const searchParams = useSearchParams()
  const storeId = searchParams.get('storeId')
  const layoutId = searchParams.get('layoutId')
  const storeName = searchParams.get('storeName')
  const [loader, setLoader] = useState(false)
  const { products, loading } = useGetReiteProd()
  const [inventory, setInventory] = useState([])
  const [newQuantity, setNewQuantity] = useState(null)
  const { layout } = useGetLayout(layoutId)
  const [expandedRows, setExpandedRows] = useState([])

  useEffect(() => {
    const updateProductsInventory = async () => {
      setLoader(true)
      if (storeId) {
        try {
          const store = await getInventoryByStore(storeId)
          setNewQuantity(null)
          setInventory(store.data.products)
          setLoader(false)
        } catch (error) {
          console.log(error)
          swallError('Ocurrió un error inesperado', false)
        }
      }
    }
    updateProductsInventory()
  }, [storeId])
  const tabs = [
    {
      id: 'products',
      name: 'Productos',
      active: true,
      content: (
        <div className='p-3'>
          {loading ? <DspLoader /> : <Products loader={loader} products={products} inventory={inventory} newQuantity={newQuantity} storeId={storeId} layout={layout} expandedRows={expandedRows} setExpandedRows={setExpandedRows} />}
        </div>
      )

    },
    {
      id: 'layout',
      name: 'Layout',
      active: false,
      content: (
        <div className='flex justify-center gap-6 '>
          {loader || loading ? <DspLoader /> : <LayoutDetail products={products} layout={layout} layoutId={layoutId} />}

        </div>
      )

    }
  ]

  return (
    <div className='p-5'>
      <div className='flex justify-center text-center p-5'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Detalle de tienda {storeName}</h2>
      </div>
      <div className='flex justify-center text-center h-full w-full'>

        <TabsComponent tabs={tabs} />
      </div>

    </div>
  )
}

export default Detail
