'use client'
import React, { useState } from 'react'
import DspLoader from '@/components/admin/common/loader'
import AccordeonCard from '../acordeonCard'
import { useSearchParams, useRouter } from 'next/navigation'
import StepLayout from '../stepLayout'
import InsideLayout from '@/components/admin/layouts/inside'
import useGetInventory from '@/hooks/useGetInventory'
import useGetLayout from '@/hooks/useGetLayout'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import { putRestockInventory } from '@/api/restock'
// import useGetReiteProd from '@/hooks/useGetReiteProd'

function StepTwo () {
  const searchParams = useSearchParams()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const transactionId = searchParams.get('transactionId')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  const { layout, layoutLoad } = useGetLayout(layoutId)
  const { products, loading } = useGetProdByStore(externalId)
  const [tempInventory, setTempInventory] = useState({})

  const router = useRouter()

  const quantityChangeHandler = (index, productId, differential) => {
    if (differential !== 0) {
      setTempInventory({
        ...tempInventory,
        [index]: {
          [productId]: differential
        }

      })
    }
  }
  const setHandleStock = async () => {
    const flatInventory = Object.values(tempInventory).reduce((acc, curr) => {
      Object.entries(curr).forEach(([productId, quantity]) => {
        acc[productId] = (acc[productId] || 0) + quantity
      })
      return acc
    }, {})

    const stockData = {
      added: [],
      removed: []
    }

    Object.entries(flatInventory).forEach(([productId, quantity]) => {
      if (quantity > 0) {
        stockData.added.push({
          productId,
          quantity
        })
      } else if (quantity < 0) {
        stockData.removed.push({
          productId,
          quantity: Math.abs(quantity)
        })
      }
    })
    try {
      const response = await putRestockInventory(externalId, stockData)
      if (response) {
        router.push(
          'stepThree' +
          `?external_id=${externalId}&layout_id=${layoutId}&store_name=${storeName}&transactionId=${transactionId}`
        )
      }
    } catch (error) {
      // Handle error if the API call fails
      console.error('Error in API call:', error)
    }
  }

  return (
    <div>
      {(loading || inventoryLoad || layoutLoad)
        ? (<DspLoader />)
        : (
          <div className='text-center'>
            <InsideLayout />
            <StepLayout />
            <div className='px-4 md:px-6 lg:px-8'>
              {externalId && (
                <div className='text-center mb-4 md:mb-8'>
                  <h1 className='text-d-dark-dark-purple text-2x2 font-bold'>Confirma el inventario de {storeName}</h1>
                </div>
              )}
              {layout && layout.trays && layout.trays.map((tray, index) => {
                return (
                  <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
                    <div className='bg-d-dark-dark-purple'>
                      <h2 className='text-d-soft-purple text-d-title font-bold py-5 mb-5 md:mb-8'>BANDEJA {index + 1}</h2>
                    </div>
                    {/* <div className='flex flex-col md:flex-row gap-4 items-center md:items-start'> */}
                    <div className='flex flex-row gap-2 items-center overflow-x-auto'>

                      {
                  tray
                    ? tray.columns.map((column, index) => {
                      const product = products?.filter((product) => product.productId === column.productId)
                      const quantityProd = inventory.products.find((prod) => prod.productId === column.productId)
                      const maxQuantity = column.maxQuantity
                      const multipleOccurrences = tray.columns.filter(
                        (c) => c.productId === column.productId
                      ).length > 1
                      return (

                        <AccordeonCard
                          quantityChangeHandler={quantityChangeHandler}
                          step={2}
                          key={index}
                          index={index}
                          productId={column.productId}
                          initialQuantity={multipleOccurrences ? 0 : quantityProd ? quantityProd.quantity : 0}
                          occurrence={multipleOccurrences ? quantityProd?.quantity : false}
                          maxQuantity={maxQuantity}
                          header={<div>
                            {product[0] &&

                              <div className='flex flex-col items-center align-start'>
                                <div className=''>
                                  <img
                                    className='w-auto max-w-[50px] h-[50px]'
                                    src={product[0].metadata?.imageUrl}
                                    width={120}
                                    height={120}
                                    alt='Product'
                                  />
                                </div>
                                <div className='flex justify-center'>
                                  <h1 className='flex justify-center items-center text-center text-d-title-purple font-bold m-1 w-full line-clamp-2'>{product[0]?.productName || 'product missing'}</h1>
                                </div>
                              </div>}

                                  </div>}//eslint-disable-line
                        />
                      )
                    })
                    : null
                }
                    </div>

                  </div>

                )
              })}

            </div>
            <button
              type='button'
              onClick={() => {
                setHandleStock()
              }}
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
            >
              Confirmar Stock
              <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
                <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
              </svg>
            </button>
          </div>
          )}
    </div>
  )
}

export default StepTwo
