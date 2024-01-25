'use client'
import React, { useState } from 'react'
import DspLoader from '@/components/admin/common/loader'
import AccordeonCard from '../acordeonCard'
import { useSearchParams, useRouter } from 'next/navigation'
import StepLayout from '../stepLayout'
import useGetInventory from '@/hooks/useGetInventory'
import useGetLayout from '@/hooks/useGetLayout'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import { postRestockInventory } from '@/api/restock'
import ConfirmationModal from '../../../components/admin/modals/confirmationModal'
import useFlattenLayout from '@/hooks/useFlattenLayout'
import { swallError } from '@/utils/sweetAlerts'
import { errorHandler } from '@/utils/errors/errors'

// import useGetReiteProd from '@/hooks/useGetReiteProd'

function StepTwo () {
  const searchParams = useSearchParams()
  const externalId = searchParams.get('external_id')
  console.log(externalId, 'external ID en steptwo')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const externalTransactionId = searchParams.get('externalTransactionId')
  const transactionId = searchParams.get('transactionId')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  const { layout, layoutLoad } = useGetLayout(layoutId)
  const { products, loading } = useGetProdByStore(externalId)
  const [occInventory, setOccInventory] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(false)
  const { flattenedLayout } = useFlattenLayout(layoutId)
  console.log(inventory, 'inventory')
  console.log(layout, 'layout')
  console.log(products, 'products')

  const router = useRouter()

  const quantityChangeHandler = (index, productId, differential, occurrence) => {
    if (occurrence !== false) {
      setOccInventory({
        ...occInventory,
        [index]: {
          [productId]: differential
        }
      })
    }
  }
  const flattenData = (data) => {
    const flatData = Object.values(data).reduce((acc, curr) => {
      Object.entries(curr).forEach(([productId, quantity]) => {
        acc[productId] = (acc[productId] || 0) + quantity
      })
      return acc
    }, {})

    return flatData
  }
  const mergeOccurrence = async (data) => {
    const mergedOccurrenceQuantity = {}
    if (Object.keys(data).length === 0) {
      flattenedLayout.forEach(productId => {
        const inventoryProd = inventory.products.find(prod => prod.productId === productId)
        if (inventoryProd) {
          mergedOccurrenceQuantity[productId] = parseInt(inventoryProd.quantity) * -1
        }
      })
    } else {
      Object.entries(data).forEach(([productId, quantity]) => {
        mergedOccurrenceQuantity[productId] = quantity

        if (flattenedLayout.includes(productId)) {
          const inventoryProd = inventory.products.find(prod => prod.productId === productId)
          if (inventoryProd) {
            mergedOccurrenceQuantity[productId] = quantity - inventoryProd.quantity
          }
        }
        flattenedLayout.forEach(productId => {
          const inventoryProd = inventory.products.find(prod => prod.productId === productId)
          if (!(productId in data)) {
            mergedOccurrenceQuantity[productId] = (parseInt(inventoryProd.quantity) * -1)
          }
        })
      })
    }
    return mergedOccurrenceQuantity
  }
  const setHandleStock = async () => {
    const flatOccInventory = await flattenData(occInventory)
    const mergedOccurrence = await mergeOccurrence(flatOccInventory)

    const stockData = {
      added: [],
      removed: []
    }

    Object.entries(mergedOccurrence).forEach(([productId, quantity]) => {
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
      console.log('Step 2: stockData to Confirm Inventory', stockData)
      setLoaderVisible(true)
      const response = await postRestockInventory(externalId, transactionId, stockData)
      console.log('Step 2: inventory response', response)
      if (response.result.successful) {
        swallError('Stock confirmado', true)
        router.push(
          'stepThree' +
          `?external_id=${externalId}&layout_id=${layoutId}&store_name=${storeName}&externalTransactionId=${externalTransactionId}&transactionId=${transactionId}`
        )
      }
    } catch (error) {
      errorHandler(error, stockData)
      // swallError('Ocurrió un error, lo sentimos mucho', false)
    }
  }

  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }
  if (loaderVisible) {
    return <DspLoader />
  }

  return (
    <div>
      {(loading || inventoryLoad || layoutLoad)
        ? (
          <DspLoader />
          )
        : (
          <div className='text-center'>
            <StepLayout />
            <div className='px-4 md:px-6 lg:px-8'>
              {externalId && (
                <div className='text-center mb-4 md:mb-8'>
                  <h1 className='text-d-dark-dark-purple text-2x2 font-bold'>
                    Confirma el inventario de {storeName}
                  </h1>
                </div>
              )}
              {layout && layout.trays && layout.trays.map((tray, index) => (
                <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
                  <div className='bg-d-dark-dark-purple'>
                    <h2 className='text-d-soft-purple text-medium font-bold py-2 mb-2 md:mb-8'>
                      BANDEJA {index + 1}
                    </h2>
                  </div>
                  <div className='flex flex-row gap-2 items-center overflow-x-auto'>
                    {tray
                      ? tray.columns.map((column, columnIndex) => {
                        const product = products?.filter(
                          (product) => product.productId === column.productId
                        )
                        const quantityProd = inventory.products.find(
                          (prod) => prod.productId === column.productId
                        )
                        const maxQuantity = column.maxQuantity
                        const multipleOccurrences =
                          tray.columns.filter((c) => c.productId === column.productId).length > 1
                        return (
                          <AccordeonCard
                            quantityChangeHandler={quantityChangeHandler}
                            step={2}
                            key={columnIndex}
                            index={column.productId + columnIndex}
                            productId={column.productId}
                            initialQuantity={
                              multipleOccurrences ? 0 : quantityProd ? quantityProd.quantity : 0
                            }
                            occurrence={multipleOccurrences ? quantityProd?.quantity : false}
                            maxQuantity={maxQuantity}
                            header={
                              <div>
                                {product[0] && (
                                  <div className='flex flex-col items-center align-start'>
                                    <div>
                                      <img
                                        className='w-auto max-w-[50px] h-[50px]'
                                        src={product[0].metadata?.imageUrl}
                                        width={120}
                                        height={120}
                                        alt='Product'
                                      />
                                    </div>
                                    <div className='flex justify-center'>
                                      <h1 className='flex justify-center items-center text-center text-d-title-purple font-bold m-1 w-full line-clamp-2'>
                                        {product[0]?.productName || 'product missing'}
                                      </h1>
                                    </div>
                                    <h1 className='flex justify-center items-center text-black-500 font-bold m-1 text-xs'>
                                      (Máximo: {maxQuantity} unidades)
                                    </h1>
                                  </div>
                                )}
                              </div>
                            }
                          />
                        )
                      })
                      : null}
                  </div>
                </div>
              ))}
            </div>
            <div className='p-10'>
              <button
                type='button'
                onClick={() => {
                  handleConfirmationModal()
                }}
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Confirmar Stock
                <svg
                  className='w-3.5 h-3.5 ml-2'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 14 10'
                >
                  <path
                    stroke='currentColor'
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth='2'
                    d='M1 5h12m0 0L9 1m4 4L9 9'
                  />
                </svg>
              </button>
            </div>
          </div>
          )}

      {modalVisible && (
        <ConfirmationModal
          handleConfirmationModal={handleConfirmationModal}
          handleOperationConfirmation={setHandleStock}
          title='¿Deseas confirmar el inventario?'
          message={<a>Una vez confirmado el inventario de <strong>{storeName}</strong> no podrás realizar cambios</a>}
          confirmButtonText='Confirmar'
          cancelButtonText='Cancelar'
        />
      )}
    </div>
  )
}
export default StepTwo
