'use client'
import { getReiteProdByStore } from '@/api/product/reite'
import { getInventoryByStore } from '@/api/store'
import { swallError } from '@/utils/sweetAlerts'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import Products from './products'
import useGetLayout from '@/hooks/useGetLayout'
import TabsComponent from '@/components/admin/common/tabs'
import DspLoader from '@/components/admin/common/loader'

function Detail () {
  const searchParams = useSearchParams()
  const storeId = searchParams.get('storeId')
  const layoutId = searchParams.get('layoutId')
  const [loader, setLoader] = useState(false)
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])
  const [newQuantity, setNewQuantity] = useState(null)
  const { layout } = useGetLayout(layoutId)
  console.log(layout, 'layout')
  const [expandedRows, setExpandedRows] = useState([])

  useEffect(() => {
    const updateProductsInventory = async () => {
      setLoader(true)
      if (storeId) {
        try {
          const products = await getReiteProdByStore(storeId)
          const store = await getInventoryByStore(storeId)
          setNewQuantity(null)
          setProducts(products)
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
        <Products loader={loader} products={products} inventory={inventory} newQuantity={newQuantity} storeId={storeId} layout={layout} expandedRows={expandedRows} setExpandedRows={setExpandedRows} />
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
