/* eslint-disable multiline-ternary */
'use client'
import useGetStores2 from '@/hooks/useStores2'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { SearchField } from '@/components/admin/common/search'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import { getReiteProdByStore } from '@/api/product/reite'
import { getInventoryByStore } from '@/api/store'
import { getLayout } from '@/api/layout'
import ToggleSwitch from '@/components/admin/common/toggleswitch/ToogleSwitch'
import DspLoader from '@/components/admin/common/loader'

function Stores () {
  const { stores } = useGetStores2(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [inventoryData, setInventoryData] = useState({})
  const [layoutData, setLayoutData] = useState({})
  const [showActiveStores, setShowActiveStores] = useState(true)
  const [loading, setLoading] = useState(true)

  const filteredStores = stores
    ? stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []

  const handleToggle = () => {
    setShowActiveStores(!showActiveStores)
  }

  const activeStores = filteredStores.filter(store => inventoryData[store.storeId] && inventoryData[store.storeId].length > 0)

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!stores || stores.length === 0) return

      try {
        const productPromises = stores.map(store => getReiteProdByStore(store.storeId))
        const inventoryPromises = stores.map(store => getInventoryByStore(store.storeId))
        const layoutPromises = stores.map(store =>
          store.layoutId ? getLayout(store.layoutId) : Promise.resolve({ status: 'no_layout' })
        )

        const [productsData, inventoryDataResults, layoutDataResults] = await Promise.all([
          Promise.allSettled(productPromises),
          Promise.allSettled(inventoryPromises),
          Promise.allSettled(layoutPromises)
        ])
        const newInventoryData = {}
        const newLayoutData = {}

        stores.forEach((store, index) => {
          const isProductFulfilled = productsData[index]?.status === 'fulfilled'
          const isInventoryFulfilled = inventoryDataResults[index]?.status === 'fulfilled'
          const isLayoutFulfilled = store.layoutId && layoutDataResults[index]?.status === 'fulfilled'

          if (isProductFulfilled && isInventoryFulfilled) {
            newInventoryData[store.storeId] = inventoryDataResults[index].value.data.products

            if (isLayoutFulfilled) {
              newLayoutData[store.storeId] = layoutDataResults[index].value
            }
          } else {
            console.error(`Fallo en la promesa para la tienda con storeId: ${store.storeId}`)
          }
        })

        setInventoryData(newInventoryData)
        setLayoutData(newLayoutData)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchStoreData()
  }, [stores])

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }

  const calculateStockDetails = (inventory, layout) => {
    const totalQuantity = inventory.reduce((sum, prod) => sum + (prod.quantity || 0), 0)
    const maxQuantities = layout.maxQuantities || {}
    const maxQuantity = Object.values(maxQuantities).reduce((sum, qty) => sum + (qty || 0), 0)
    const stockPercentage = maxQuantity ? (totalQuantity / maxQuantity) * 100 : 0
    return { stockPercentage, totalQuantity, maxQuantity }
  }

  const SymbolLegend = () => (
    <div className='flex flex-wrap gap-2 mb-4'>
      <div className='flex items-center w-full sm:w-auto'>
        <span className='w-4 h-4 bg-purple-500 rounded-full inline-block' />
        <span className='ml-2 text-sm'> Sobrestock </span>
      </div>
      <div className='flex items-center w-full sm:w-auto'>
        <span className='w-4 h-4 bg-green-500 rounded-full inline-block' />
        <span className='ml-2 text-sm'> Suficiente stock</span>
      </div>
      <div className='flex items-center w-full sm:w-auto'>
        <span className='w-4 h-4 bg-yellow-500 rounded-full inline-block' />
        <span className='ml-2 text-sm'>Reponer stock</span>
      </div>
      <div className='flex items-center w-full sm:w-auto'>
        <span className='w-4 h-4 bg-red-500 rounded-full inline-block' />
        <span className='ml-2 text-sm'> Stock crítico</span>
      </div>
    </div>
  )

  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <section className='w-full p-6 rounded-lg max-w-2xl'>
          <MainTitle>Tiendas</MainTitle>
          <div className='flex gap-4'>
            <SearchField
              placeholder='Busca una tienda...'
              onChange={handleSearchChange}
            />
            <div className='inline-block'>
              <ToggleSwitch isChecked={showActiveStores} onToggle={handleToggle} />
              {showActiveStores && (
                <span className='ml-2'>
                  Tiendas Activas
                </span>
              )}
            </div>
          </div>
          {loading ? (
            <div className='flex justify-center'>
              <DspLoader />
            </div>
          ) : (

            <section className='py-4 flex flex-col gap-2 text-sm m-2'>
              <SymbolLegend />
              {(showActiveStores ? activeStores : filteredStores).map((store) => {
                const inventory = inventoryData[store.storeId] || []
                const layout = layoutData[store.storeId] || {}
                const { stockPercentage, totalQuantity, maxQuantity } = calculateStockDetails(inventory, layout)
                let bgColor
                if (stockPercentage > 100) {
                  bgColor = 'bg-purple-500'
                } else if (stockPercentage > 50) {
                  bgColor = 'bg-green-500'
                } else if (stockPercentage >= 20) {
                  bgColor = 'bg-yellow-500'
                } else {
                  bgColor = 'bg-red-500'
                }

                const barWidth = stockPercentage > 0 ? `${stockPercentage}%` : '40px'

                return (
                  <Link href={`/stores/detail?storeId=${store.storeId}&layoutId=${store.layoutId}&storeName=${store.name}`} key={store.storeId}>
                    <div className='flex items-center p-4 cursor-pointer shadow-md hover:shadow-lg rounded-md'>
                      <span
                        className='w-8 h-8 shrink-0 mr-4 rounded-full bg-green-50 flex items-center justify-center'
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6 animate-ping'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                        </svg>
                      </span>
                      <div className='space-y-3 flex-1'>
                        <div className='flex items-center'>
                          <h4
                            className='font-medium text-sm mr-auto text-gray-700 flex items-center'
                          >
                            {store.name}
                          </h4>
                          <span className='px-2 py-1 rounded-lg bg-gray-50 text-black-500 text-xs'>
                            Capacidad: {totalQuantity}/{maxQuantity}
                          </span>
                        </div>
                        <div className='overflow-hidden bg-blue-50 h-3.5 rounded-full w-full'>
                          <span
                            className={`h-full ${bgColor} block rounded-full relative`}
                            style={{ width: barWidth }}
                          >
                            <span className='absolute inset-0 flex items-center justify-center text-white font-bold'>
                              {Math.round(stockPercentage)}%
                            </span>
                          </span>
                        </div>

                      </div>
                    </div>
                  </Link>
                )
              })}
            </section>

          )}

        </section>
      </div>
    </>
  )
}

export default Stores
