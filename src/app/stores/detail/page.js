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
  const [loader, setLoader] = useState(false)
  const { products, loading } = useGetReiteProd()
  console.log(products, 'products')
  const [inventory, setInventory] = useState([])
  const [newQuantity, setNewQuantity] = useState(null)
  const { layout } = useGetLayout(layoutId)
  // console.log(layout, 'layout')
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
        <div>
          {loading ? <DspLoader /> : <Products loader={loader} products={products} inventory={inventory} newQuantity={newQuantity} storeId={storeId} layout={layout} expandedRows={expandedRows} setExpandedRows={setExpandedRows} />}
        </div>
      )

    },
    {
      id: 'layout',
      name: 'Layout',
      active: false,
      content: (
        <div>
          {loader || loading ? <DspLoader /> : <LayoutDetail products={products} layout={layout} layoutId={layoutId} />}

        </div>
      )

    }
  ]

  return (
    <>
      <h3>Administra {storeId} </h3>
      <div className='p-10'>
        <TabsComponent tabs={tabs} />
      </div>
    </>
  )
}

export default Detail
