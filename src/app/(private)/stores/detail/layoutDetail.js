'use client'
import { getAllLayouts } from '@/api/layout'
import { updateLayout } from '@/api/store'
import React, { useEffect, useState } from 'react'
import ConfirmPriceModal from './confirmPriceModal'
import { swallError } from '@/utils/sweetAlerts'
import { useRouter, useSearchParams } from 'next/navigation'
import ProductCard from './productCard'

function LayoutDetail ({ storeId, products, layout, layoutId }) {
  // console.log(layout, 'layout del layoutDetail')
  const router = useRouter()
  const searchParams = useSearchParams()

  const storeName = searchParams.get('storeName')
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState(layoutId)
  // console.log(selectedLayout, 'selectedLayout')
  const [showLayout, setShowLayout] = useState(layout)
  // const [loader, setLoader] = useState(false)
  const [showPriceModal, setShowPriceModal] = useState(false)

  // const reloadPage = () => {
  //   window.location.reload()
  // }
  const handleUpdateStoreLayout = async (prices) => {
    // console.log(prices, 'prices')
    Object.keys(prices).forEach((productId) => {
      const productPrice = prices[productId]
      if (productPrice === 0) {
        return swallError('Los precios no pueden estar en 0', false)
      }
    })

    try {
      setShowPriceModal(false)
      // setLoader(true)
      const response = await updateLayout(storeId, selectedLayout, prices)
      // console.log(response)
      if (response.successful) {
        swallError('Layout actualizado correctamente', true)
        setShowPriceModal(false)
        // setTimeout(() => reloadPage(), 2000)
        router.push(`/stores/detail?storeId=${storeId}&layoutId=${selectedLayout}&storeName=${storeName}`)
      }
    } catch (error) {
      swallError('Error al actualizar el layout', false)
    }
  }
  const handleShowPriceModal = () => {
    setShowPriceModal(!showPriceModal)
  }

  useEffect(() => {
    const fetchLayouts = async () => {
      const response = await getAllLayouts()
      setLayouts(response)
    }
    fetchLayouts()
  }, [])
  useEffect(() => {
    const fetchLayout = async () => {
      // setLoader(true)
      const response = await getAllLayouts()
      setShowLayout(response.find(layout => layout.id === selectedLayout))
      // setLoader(false)
    }
    fetchLayout()
  }, [selectedLayout])
  return (
    <div className='overflow-x-auto'>
      <div className='flex flex-row justify-center items-center max-[431px]:flex-col'>
        <select
          onChange={(e) => setSelectedLayout(e.target.value)}
          className='select select-sm select-bordered rounded-full'
          value={selectedLayout}
        >
          <option value='0'>Selecciona un layout</option>
          {layouts && layouts.map((layout) => (
            <option key={layout.id} value={layout.id}>
              {layout.name}
            </option>
          ))}
        </select>
        <div className='p-3'>
          <button
            onClick={() => handleShowPriceModal()}
            className={`${selectedLayout !== layoutId ? 'flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'hidden'}`}
          >
            Asignar este layout a la tienda
          </button>
        </div>
      </div>

      {showLayout && showLayout.trays && showLayout.trays.map((tray, index) => (
        <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
          <div className='bg-d-dark-dark-purple'>
            <h2 className='text-d-soft-purple text-medium font-bold py-2 mb-2 mt-4'>BANDEJA {index + 1}</h2>
          </div>
          <div className='flex flex-row gap-2 items-center overflow-x-auto'>
            {tray.columns.map((column, index) => {
              const product = products?.find((product) => product.productId === column.productId)
              const maxQuantity = column.maxQuantity
              return (
                <ProductCard key={index} product={product} maxQuantity={maxQuantity} />
              )
            })}
          </div>
        </div>
      ))}

      {showPriceModal && (
        <ConfirmPriceModal showLayout={showLayout} products={products} storeId={storeId} handleUpdateStoreLayout={handleUpdateStoreLayout} handleShowPriceModal={handleShowPriceModal} />
      )}
    </div>
  )
}

export default LayoutDetail
