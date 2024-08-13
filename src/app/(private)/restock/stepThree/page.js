'use client'
import StepLayout from '../stepLayout'
import { useSearchParams, useRouter } from 'next/navigation'
import useGetLayout from '@/hooks/useGetLayout'
import AccordeonCard from '../acordeonCard'
import DspLoader from '@/components/admin/common/loader'
import useGetInventory from '@/hooks/useGetInventory'
import { useEffect, useState } from 'react'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import { putRestockResult } from '@/api/restock'
import ConfirmationModal from '@/components/admin/modals/confirmationModal'
import { swallError } from '@/utils/sweetAlerts'
import { errorHandler } from '@/utils/errors/errors'
import { updateLayoutHistory } from '@/api/layout'

/**
 * Page component handles the restocking process for a specific store layout.
 * It fetches inventory, layout, and product data, allows for quantity adjustments,
 * and confirms the restock data.
 */
export default function Page () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const externalTransactionId = searchParams.get('externalTransactionId')
  const transactionId = searchParams.get('transactionId')
  const showStepIntermediate = searchParams.get('show_step_intermediate') === 'true'
  const oldLayout = searchParams.get('old_layout')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  const targetLayout = searchParams.get('target_layout')
  const { layout, layoutLoad } = useGetLayout(layoutId)
  const [loaderVisible, setLoaderVisible] = useState(false)
  const nextRoute = 'stepFour' + `?external_id=${externalId}&layout_id=${layoutId}&store_name=${storeName}&externalTransactionId=${externalTransactionId}&transactionId=${transactionId}&show_step_intermediate=${showStepIntermediate}&old_layout=${oldLayout}&target_layout=${targetLayout}`
  const { products, loading } = useGetProdByStore(externalId)
  const [tempPurchased, setTempPurchased] = useState({})
  const [tempRestocked, setTempRestocked] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [collapsedRows, setCollapsedRows] = useState({})
  const [allCheckboxesChecked, setAllCheckboxesChecked] = useState(false)

  /**
   * Updates the quantity of products for either purchased or restocked items.
   * @param {number} index - The index of the product.
   * @param {string} productId - The ID of the product.
   * @param {number} quantity - The quantity to update.
   * @param {string} type - The type of update ('purchased' or 'restocked').
   */
  const updateProductQuantity = (index, productId, quantity, type) => {
    if (type === 'purchased') {
      setTempPurchased({
        ...tempPurchased,
        [index]: {
          [productId]: quantity
        }
      })
    } else {
      setTempRestocked({
        ...tempRestocked,
        [index]: {
          [productId]: quantity
        }
      })
    }
  }

  const handleConfirmRestock = async () => {
    const flatPurchased = Object.values(tempPurchased).reduce((acc, curr) => {
      Object.entries(curr).forEach(([productId, quantity]) => {
        acc[productId] = (acc[productId] || 0) + quantity
      })
      return acc
    }, {})

    const flatRestocked = Object.values(tempRestocked).reduce((acc, curr) => {
      Object.entries(curr).forEach(([productId, quantity]) => {
        acc[productId] = (acc[productId] || 0) + quantity
      })
      return acc
    }, {})

    const allProducts = products.map((product) => ({
      productId: product.productId,
      quantity: 0
    }))

    const stockData = {
      purchased: allProducts.map((product) => ({
        productId: product.productId,
        quantity: flatPurchased[product.productId] || 0
      })),
      restocked: allProducts.map((product) => ({
        productId: product.productId,
        quantity: flatRestocked[product.productId] || 0
      })),
      store_id: externalId,
      comments: 'Sin comentarios',
      transaction_id: parseInt(transactionId)
    }

    try {
      setLoaderVisible(true)
      const response = await putRestockResult(externalTransactionId, stockData)
      console.log('response putRestockResult', response)
      if (response.successful) {
        const data = { change_position: false }
        const response = await updateLayoutHistory(data, externalId, layoutId)

        if (response) {
          swallError('Restock Confirmado', true)
          router.push(nextRoute)
        } else {
          throw new Error('Error al actualizar el layout history')
        }
      } else {
        throw new Error('Error en la confirmación del restock')
      }
    } catch (error) {
      errorHandler(error, stockData)
      if (error.response?.status === 403) {
        router.push(nextRoute)
      }
      setLoaderVisible(false)
    }
  }

  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }

  useEffect(() => {
    const initialCollapsedRows = products.reduce((acc, product) => {
      acc[product.productId] = false
      return acc
    }, {})

    setCollapsedRows(initialCollapsedRows)
  }, [products])

  const handleCheckboxChange = (productId) => {
    setCollapsedRows((prevCollapsedRows) => {
      const updatedCollapsedRows = {
        ...prevCollapsedRows,
        [productId]: !prevCollapsedRows[productId]
      }
      const allChecked = Object.values(updatedCollapsedRows).every((value) => value)
      setAllCheckboxesChecked(allChecked)
      return updatedCollapsedRows
    })
  }

  if (loaderVisible) {
    return <DspLoader />
  }

  return (
    <div>
      {(loading || inventoryLoad || layoutLoad)
        ? <DspLoader />
        : (
          <div>
            <div className='text-center'>
              <StepLayout />
            </div>
            <div className='px-4 md:px-6 lg:px-8'>
              {
                layout && layout.trays && layout.trays.map((tray, trayIndex) => (
                  <div key={trayIndex} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
                    <div className='bg-d-dark-dark-purple'>
                      <h2 className='text-d-soft-purple text-medium font-bold py-2 mb-2 md:mb-8'>Bandeja {trayIndex + 1}</h2>
                    </div>
                    <div className='flex flex-row gap-2 items-center overflow-x-auto'>
                      {
                        tray.columns.map((column, colIndex) => {
                          const product = products?.find((prod) => prod.productId === column.productId)
                          const quantityProd = inventory.products.find((prod) => prod.productId === column.productId)
                          const maxQuantity = column.maxQuantity
                          const isChecked = collapsedRows[column.productId]

                          return (
                            <div
                              key={colIndex}
                              className={`border-b border-gray-300 ${isChecked ? 'bg-gray-300 opacity-30' : ''}`}
                            >
                              <AccordeonCard
                                step={3}
                                index={column.productId + colIndex}
                                updateProductQuantity={updateProductQuantity}
                                productId={column.productId}
                                maxPurchasedQuantity={quantityProd ? quantityProd.quantity : 0}
                                maxQuantity={maxQuantity}
                                header={
                                  <div className='w-full'>
                                    <input
                                      type='checkbox'
                                      className='h-4 w-4 rounded border border-d-purple mb-4'
                                      onChange={() => handleCheckboxChange(column.productId)}
                                    />
                                    <figure className='flex justify-center'>
                                      <img
                                        className='w-auto max-w-[50px] h-[50px]'
                                        src={product.metadata.imageUrl}
                                        width={120}
                                        height={120}
                                        alt='Product'
                                      />
                                    </figure>
                                    <h1 className='flex justify-center items-center text-d-title-purple font-bold m-1'>{product.productName}</h1>
                                    <h1 className='flex justify-center items-center text-black-500 font-bold m-1 text-xs'>(Máximo: {maxQuantity} unidades)</h1>
                                  </div>
                                }
                              />
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          )}
      <div className='flex justify-center pb-10'>
        <button
          onClick={() => handleConfirmationModal()}
          className='btn text-xs rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
          disabled={!allCheckboxesChecked}
        >
          Confirmar stock
          <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
          </svg>
        </button>
      </div>
      {modalVisible && (
        <div className='fixed z-50 flex items-center justify-center'>
          <ConfirmationModal
            handleConfirmationModal={handleConfirmationModal}
            handleOperationConfirmation={handleConfirmRestock}
            title='¿Confirmas que los datos de reposición son correctos?'
            message='Recuerda que una vez confirmados, no podrás realizar cambios'
            confirmButtonText='Confirmar'
            cancelButtonText='Cancelar'
          />
        </div>
      )}
    </div>
  )
}
