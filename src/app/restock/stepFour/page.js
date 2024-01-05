'use client'

import StepLayout from '../stepLayout'
import { useSearchParams, useRouter } from 'next/navigation'
import useGetLayout from '@/hooks/useGetLayout'
// import useGetReiteProd from '@/hooks/useGetReiteProd'
import AccordeonCard from '../acordeonCard'
import DspLoader from '@/components/admin/common/loader'
import useGetInventory from '@/hooks/useGetInventory'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import ConfirmationModal from '../confirmationModal'
import { useState } from 'react'
import CameraModal from './cameraModal'
import { putStockImageUpdate } from '@/api/stock'
import { errorHandler } from '@/utils/errors/errors'
// import useGetStores2 from '@/hooks/useStores2'
// import useGetStoreData from '@/hooks/useGetStoreData'

export default function stepFour () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const transactionId = searchParams.get('transactionId')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  // const { store, loading: storeLoad } = useGetStoreData(externalId)
  const { layout, layoutLoad } = useGetLayout(layoutId)
  // const { products, loading } = useGetReiteProd()
  const { products, loading } = useGetProdByStore(externalId)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalCameraVisible, setModalCameraVisible] = useState(false)
  const [snapshot, setSnapshot] = useState(null)
  const [comment, setComment] = useState('Sin comentarios')

  const handleComment = async (comment) => {
    setComment(comment)
  }

  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }

  const handleOperationConfirmation = async () => {
    await updateRestock()

    router.push(
      '/restock'
    )
  }
  const handleCameraModal = () => {
    setModalCameraVisible(!modalCameraVisible)
  }
  const takeSnapshot = async (img) => {
    const base64Content = img.split(';base64,').pop()

    setSnapshot(base64Content)
    handleCameraModal()
    handleConfirmationModal()
  }

  const updateRestock = async () => {
    try {
      if (snapshot) {
        const response = await putStockImageUpdate(transactionId, snapshot, comment)

        console.log(response)
      }
    } catch (error) {
      // console.log(error)
      errorHandler(error, { transactionId, snapshot, comment })
    }
  }

  return (
    <div>
      {(inventoryLoad || loading || layoutLoad)
        ? <DspLoader />
        : (
          <div>
            <div className='text-center'>
              <StepLayout />
            </div>
            <div className='px-4 md:px-6 lg:px-8'>
              {externalId && (
                <div className='text-center mb-4 md:mb-8'>
                  <h1 className='text-d-dark-dark-purple text-2x2 font-bold'>Vuelve a confirmar el inventario de {storeName} y asegúrate de que los precios correspondan al producto.</h1>
                  <p className='text-red-500 text-2x2 font-bold'>Aviso: los productos que aparecen en más de una columna han sido concentrados en una sola para facilitar el control de las cantidades</p>
                </div>
              )}
              {
                layout && layout.trays && layout.trays.map((tray, index) => {
                  const productAggregationMap = new Map()
                  return (
                    <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>

                      <div className='bg-d-dark-dark-purple w-full'>
                        <h2 className='text-d-soft-purple text-medium font-bold py-2 mb-2 md:mb-8'>Bandeja {index + 1}</h2>
                      </div>
                      <div className='flex flex-row gap-2 items-center overflow-x-auto'>

                        {
                                tray
                                  ? tray.columns.map((column, index) => {
                                    const product = products?.filter((product) => product.productId === column.productId)
                                    const quantityProd = inventory.products?.find((prod) => prod.productId === column.productId)
                                    const maxQuantity = column.maxQuantity
                                    if (product) {
                                      if (!productAggregationMap.has(product[0].productId)) {
                                        productAggregationMap.set(product[0].productId, {
                                          quantity: quantityProd ? quantityProd.quantity : 0,
                                          maxQuantity
                                        })
                                      } else {
                                        const aggregatedValues = productAggregationMap.get(product[0].productId)
                                        aggregatedValues.quantity = quantityProd ? quantityProd.quantity : 0
                                        aggregatedValues.maxQuantity += maxQuantity
                                      }
                                    }
                                    return null
                                  })
                                  : null
                            }
                        {Array.from(productAggregationMap).map(([productId, aggregatedValues], index) => {
                          const product = products?.find((p) => p.productId === productId)

                          return (
                            <AccordeonCard
                              step={4}
                              key={index}
                              initialQuantity={aggregatedValues.quantity}
                              price={
                                    product?.prices[externalId]
                                      ? (product.prices[externalId].toFixed(0)).replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                                      : null
                                    }
                              maxQuantity={aggregatedValues.maxQuantity}
                              header={
                                <div className=' w-full'>
                                  <figure className='flex justify-center'>
                                    <img
                                      className='w-auto max-w-[50px] h-[50px]'
                                      src={product?.metadata.imageUrl}
                                      width={120}
                                      height={120}
                                      alt='Product'
                                    />
                                  </figure>

                                  <h1 className='flex justify-center items-center text-center text-d-title-purple font-bold m-1 w-full line-clamp-2'>{product?.productName}</h1>

                                  {/* <h1 className='flex justify-center items-center text-d-title-purple font-bold m-1'>{product[0].productName}</h1> */}
                                  {/* <p className='ml-auto font-bold text-d-dark-dark-purple'> {quantityProd ? `${quantityProd.quantity}/${maxQuantity}` : '??'}</p> */}
                                </div>
                                    }
                            />
                          )
                        })}
                      </div>
                    </div>

                  )
                })
              }

            </div>
          </div>
          )}
      <div className='flex gap-5 justify-center pb-10'>

        <button
          type='button'
          onClick={() => {
            handleCameraModal()
          }}
          className='items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Confirmar Operación
        </button>
      </div>

      {modalVisible && (
        <div className='fixed z-50 flex items-center justify-center'>

          <ConfirmationModal
            handleConfirmationModal={handleConfirmationModal}
            handleOperationConfirmation={handleOperationConfirmation}
            title='La reposición ha sido confirmada'
            message='¡Muchas gracias! ya puedes cerrar la página'
            confirmButtonText='Cerrar'
            cancelButtonText='Cancelar'
          />
        </div>

      )}
      {modalCameraVisible && (
        <div className='fixed z-50 flex items-center justify-center'>

          <CameraModal
            step={4}
            handleConfirmationModal={handleConfirmationModal}
            handleOperationConfirmation={handleCameraModal}
            title='Necesitamos que tomes una foto de la tienda para confirmar la reposición'
            message={(
              <span>
                Toma una foto de la tienda luego de cerrarla
              </span>
                )}
            confirmButtonText='Siguiente'
            cancelButtonText='Cancelar'
            takeSnapshot={takeSnapshot}
            handleComment={handleComment}
          />
        </div>

      )}

    </div>
  )
}
