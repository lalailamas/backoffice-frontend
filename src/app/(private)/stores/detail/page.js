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
import StockRequestTable from '@/components/admin/tables/stock_request'
import { getStockRequest } from '@/api/stock'
import GoBack from '@/components/admin/common/goback'
import LayoutHistory from './layoutHistory'

/**
 * Detail component to display the detailed view of a store, including products, layout, and stock requests.
 */
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
  const [stockRequest, setStockRequest] = useState([])

  useEffect(() => {
    const updateProductsInventory = async () => {
      setLoader(true)
      if (storeId) {
        try {
          const store = await getInventoryByStore(storeId)
          const response = await getStockRequest(storeId)
          setStockRequest(response)
          setNewQuantity(null)
          setInventory(store.data.products)
          setLoader(false)
        } catch (error) {
          swallError('Ocurrió un error inesperado', false)
        }
      }
    }
    updateProductsInventory()
  }, [storeId, layoutId])

  // Define the tabs for the component
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
          {loader || loading ? <DspLoader /> : <LayoutDetail storeId={storeId} products={products} layout={layout} layoutId={layoutId} />}

        </div>
      )

    },
    {
      id: 'stock',
      name: 'Faltante de stock',
      active: false,
      content: (
        <div className='overflow-x-auto'>
          {stockRequest.length === 0 ? <DspLoader /> : <StockRequestTable data={stockRequest} />}

        </div>
      )

    },
    {
      id: 'historial',
      name: 'Historial de Layout',
      active: false,
      content: (
        <div className='overflow-x-auto'>
          {stockRequest.length === 0 ? <DspLoader /> : <LayoutHistory storeId={storeId} products={products} layout={layout} layoutId={layoutId} />}

        </div>
      )

    }
  ]

  return (
    <div className='p-5'>
      <div className='flex justify-center text-center p-5'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold '>Detalle de tienda {storeName}</h2>
      </div>
      <GoBack />
      <TabsComponent tabs={tabs} />

    </div>
  )
}

export default Detail
