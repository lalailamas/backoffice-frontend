'use client'
import React, { useEffect, useState } from 'react'
import DspLoader from '@/components/admin/common/loader'
import AccordeonCard from '../acordeonCard'
import { useSearchParams, useRouter } from 'next/navigation'
import StepLayout from '../stepLayout'
import useGetInventory from '@/hooks/useGetInventory'
import useGetLayout from '@/hooks/useGetLayout'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import { postRestockInventory } from '@/api/restock'
import ConfirmationModal from '@/components/admin/modals/confirmationModal'
import useFlattenLayout from '@/hooks/useFlattenLayout'
import { swallError } from '@/utils/sweetAlerts'
import { errorHandler } from '@/utils/errors/errors'

function StepTwo () {
  const searchParams = useSearchParams()
  const externalId = searchParams.get('external_id')
  // console.log(externalId, 'external ID en steptwo')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const externalTransactionId = searchParams.get('externalTransactionId')
  const transactionId = searchParams.get('transactionId')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  const { layout, layoutLoad } = useGetLayout(layoutId)
  const { products, loading } = useGetProdByStore(externalId)
  const [occInventory, setOccInventory] = useState({})
  // console.log(occInventory, 'occInventory')
  const [modalVisible, setModalVisible] = useState(false)
  const [loaderVisible, setLoaderVisible] = useState(false)
  const { flattenedLayout } = useFlattenLayout(layoutId)
  const [collapsedRows, setCollapsedRows] = useState({})
  console.log(collapsedRows, 'collapsedRows')
  const [allCheckboxesChecked, setAllCheckboxesChecked] = useState(false)
  console.log(allCheckboxesChecked, 'allCheckboxesChecked')
  const [disabledCheckboxes, setDisabledCheckboxes] = useState({})
  console.log(disabledCheckboxes, 'disabledCheckboxes')

  const router = useRouter()

  // aca recibimos el index del producto y el id del producto
  const quantityChangeHandler = (index, productId, differential) => {
    setOccInventory({
      ...occInventory,
      [index]: {
        [productId]: differential
      }
    })
  }
  // aca sumamos la cantidad de productos repetidos
  const flattenData = (data) => {
    const flatData = Object.values(data).reduce((acc, curr) => {
      Object.entries(curr).forEach(([productId, quantity]) => {
        acc[productId] = (acc[productId] || 0) + quantity
      })
      return acc
    }, {})

    return flatData
  }
  // uno los productos repetidos y sumo la cantidad
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

  // envía la confirmación de stock
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
      setLoaderVisible(true)
      console.log('Step 2: stockData to Confirm Inventory V2', stockData)

      const response = await postRestockInventory(externalId, transactionId, stockData)
      console.log(response, 'response V2')
      if (response.result.successful) {
        swallError('Stock confirmado', true)
        router.push(
          'stepThree' +
          `?external_id=${externalId}&layout_id=${layoutId}&store_name=${storeName}&externalTransactionId=${externalTransactionId}&transactionId=${transactionId}`
        )
      }
    } catch (error) {
      errorHandler(error, stockData)
    }
  }

  useEffect(() => {
    const initialCollapsedRows = products.reduce((acc, product) => {
      acc[product.productId] = false
      return acc
    }, {})

    setCollapsedRows(initialCollapsedRows)
  }, [products]) // Asegúrate de que este efecto se ejecute cada vez que la lista de productos cambie

  const handleCheckboxChange = (index) => {
    // Actualiza el estado collapsedRows y verifica después de la actualización
    setCollapsedRows((prevCollapsedRows) => {
      const updatedCollapsedRows = {
        ...prevCollapsedRows,
        [index]: !prevCollapsedRows[index]
      }
      const allChecked = Object.values(updatedCollapsedRows).every((value) => value)
      setAllCheckboxesChecked(allChecked)
      console.log(allChecked, 'allChecked')
      return updatedCollapsedRows
    })
    // Marca el checkbox como deshabilitado
    setDisabledCheckboxes((prevDisabledCheckboxes) => ({
      ...prevDisabledCheckboxes,
      [index]: true
    }))
  }

  if (loaderVisible) {
    return <DspLoader />
  }

  const handleConfirmationModal = () => {
    if (!allCheckboxesChecked) {
      swallError('Por favor, haz clic en todas las casillas para continuar', false)
      return
    }
    setModalVisible(!modalVisible)
  }

  return (
    <div>
      {(loading || inventoryLoad || layoutLoad)
        ? (<DspLoader />)
        : (
          <div className='text-center'>
            <StepLayout />
            {/* <div className='px-4 md:px-6 lg:px-8'> */}
            {/* <pre>{JSON.stringify(occInventory, null, 2)}</pre> */}
            {externalId && (
              <div className='text-center mb-4 md:mb-8'>
                <h1 className='text-d-dark-dark-purple text-2x2 font-bold'>{storeName}</h1>
                <h1 className='text-d-dark-dark-purple text-2x2'>Cuenta la cantidad por producto y clickea la casilla</h1>
              </div>
            )}
            {layout && layout.trays && (

              <div className='flex flex-row gap-2 items-center justify-center overflow-x-auto'>
                <div className=' '>
                  <table className=''>
                    <thead>
                      <tr>
                        <th className='border border-gray-300'>Producto</th>
                        <th className='border border-gray-300 p-4 '>Stock</th>
                        <th className='border border-gray-300 p-2'>Stock máx.</th>
                        <th className='border border-gray-300 p-4'>OK</th>

                      </tr>
                    </thead>
                    <tbody>
                      {layout && layout.trays && layout.trays.map((tray) => {
                        const displayedProducts = new Set()

                        return tray.columns.map((column, index) => {
                          // Verificar si el producto ya fue mostrado, si es así, omitir
                          if (displayedProducts.has(column.productId)) {
                            return null
                          }
                          // Si el producto no ha sido mostrado, agregarlo al conjunto
                          displayedProducts.add(column.productId)
                          const product = products?.find((product) => product.productId === column.productId)
                          const quantityProd = inventory.products.find((prod) => prod.productId === column.productId)
                          const maxQuantity = layout.maxQuantities[column.productId]

                          return (
                            <tr key={column.productId + index} className={`border-b border-gray-300 ${collapsedRows[column.productId] ? 'bg-gray-300 opacity-30' : ''}`}>
                              <td className='border border-gray-300 '>
                                {product
                                  ? (
                                    <div className='flex items-center max-w-[200px] h-[80px]'>
                                      <img
                                        className='w-auto max-w-[40px] h-[40px]'
                                        src={product.metadata?.imageUrl}
                                        width={120}
                                        height={120}
                                        alt='Product'
                                      />
                                      <div className='ml-2 mr-1'>
                                        <h1 className='text-d-title-purple font-bold text-sm'>
                                          {product.productName || 'Producto faltante'}
                                        </h1>
                                      </div>
                                    </div>
                                    )
                                  : (
                                    <p>Producto no encontrado</p>
                                    )}
                              </td>
                              <td className='border border-gray-300 py-3'>
                                <AccordeonCard
                                  quantityChangeHandler={quantityChangeHandler}
                                  step={2}
                                  index={column.productId + index}
                                  productId={column.productId}
                                  initialQuantity={quantityProd ? quantityProd.quantity : 0}
                                  header={<div />}
                                />

                              </td>
                              <td className='border border-gray-300 py-3'>
                                <p className='text-black-500 font-bold text-sm'>{maxQuantity} und</p>

                              </td>
                              <td className='border border-gray-300'>
                                <input
                                  type='checkbox'
                                  className='h-4 w-4 rounded border border-d-purple '
                                  onChange={() => handleCheckboxChange(column.productId)}

                                />
                              </td>
                            </tr>
                          )
                        })
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

            )}

            <div className='p-10'>
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
          </div>

          )}
      {modalVisible && (
        <div className='fixed z-50 flex items-center justify-center'>

          <ConfirmationModal
            handleConfirmationModal={handleConfirmationModal}
            handleOperationConfirmation={setHandleStock}
            title='¿Deseas confirmar el inventario?'
            message={(
              <a>Una vez confirmado el inventario de <strong>{storeName}</strong> no podrás realizar cambios</a>
          )}
            confirmButtonText='Confirmar'
            cancelButtonText='Cancelar'
          />
        </div>

      )}
    </div>
  )
}

export default StepTwo
