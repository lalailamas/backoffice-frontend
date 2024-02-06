'use client'
import { getAllLayouts } from '@/api/layout'
import { getProduct } from '@/api/product'
import { getReiteProdByStore } from '@/api/product/reite'
import { getStores } from '@/api/store'
import { errorHandler } from '@/utils/errors/errors'
import React, { useEffect, useState } from 'react'

function layoutStores () {
  const [stores, setStores] = useState([])
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState('')
  const [trays, setTrays] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)
  const [products, setProducts] = useState([])
  console.log('selectedStore', selectedStore)
  console.log(layouts, 'layouts')
  console.log(products, 'products')
  console.log('selectedLayout', selectedLayout)
  console.log('trays', trays)

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores('active')
        setStores(response)
      } catch (error) {
        errorHandler(error, { storeId: selectedStore.storeId })
      }
    }
    const fetchLayouts = async () => {
      try {
        const response = await getAllLayouts()
        setLayouts(response)
      } catch (error) {
        errorHandler(error, { storeId: selectedStore.storeId })
      }
    }

    fetchStores()
    fetchLayouts()
  }, [])
  useEffect(() => {
  }, [selectedStore])
  useEffect(() => {
    if (!selectedLayout) return

    const layout = layouts.find((layout) => layout.id === selectedLayout)
    console.log(layout, 'layout-------------------------------------------------')
    setTrays(layout.trays)
  }, [selectedLayout])

  const handleStoreChange = async (id) => {
    // console.log('id', id)
    const store = stores.find((store) => store.storeId === id)
    setSelectedStore(store)
    // console.log(store, 'store')
    const layoutIdForSelectedStore = store.layoutId
    setSelectedLayout(layoutIdForSelectedStore)
    const response = await getReiteProdByStore(id)
    setProducts(response)
  }
  return (
    <div>
      <div className='flex justify-center text-center p-5'>
        <h1 className='text-d-dark-dark-purple text-2xl font-bold'> Layout por Tienda</h1>
      </div>
      <div className=' flex flex-col  justify-center items-center p-5'>
        <select
          onChange={(e) => handleStoreChange(e.target.value)}
          className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
          value={selectedStore ? selectedStore.storeId : '0'}
        >
          <option value='0'>Selecciona una tienda</option>
          {stores && stores.map((store) => (
            <option key={store.storeId} value={store.storeId}>
              {store.name}
            </option>
          ))}
        </select>
      </div>
      <div className={`${selectedLayout?.trays?.length > 0 ? 'flex flex-col justify-center items-center p-5' : 'hidden'}`}>
        <h3> Layout</h3>
        <select
          onChange={(e) => setSelectedLayout(e.target.value)}
          className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
          value={selectedLayout}
        >
          <option value='0'>Selecciona un layout</option>
          {layouts && layouts.map((layout) => (
            <option key={layout.id} value={layout.id}>
              {layout.name}
            </option>
          ))}
        </select>
      </div>
      <div className='px-4 md:px-6 lg:px-8'>
        {(products && trays && trays.length > 0)
          ? (
              trays.map((tray, index) => {
                return (
                  <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
                    <div className='bg-d-dark-dark-purple'>
                      <h2 className='text-d-soft-purple text-medium font-bold py-2 mb-2 md:mb-8'>Bandeja {index + 1}</h2>
                    </div>
                    <div className='flex flex-row gap-2 items-center overflow-x-auto'>
                      {
                      tray
                        ? tray.columns.map((column, index) => {
                          const product = products?.filter((product) => product.productId === column.productId)
                          console.log(product, 'product')
                          //   const maxQuantity = column.maxQuantity
                          return (
                            <li key={index}>
                              {product
                                ? (
                                  <div className='flex flex-col items-center w-[100px] h-[80px] border border-gray-200 rounded-lg shadow text-xs'>
                                    <img
                                      className='w-auto max-w-[30px] h-[30px]'
                                      src={product?.metadata.imageUrl}
                                      width={120}
                                      height={120}
                                      alt='Product'
                                    />
                                    {product.productName}
                                  </div>
                                  )
                                : null}
                            </li>
                          )
                        })
                        : null
                    }
                    </div>
                  </div>
                )
              }

              )
            )
          : null}
      </div>

    </div>
  )
}

export default layoutStores
