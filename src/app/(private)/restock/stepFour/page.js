'use client'
import StepLayout from '../stepLayout'
import { useSearchParams, useRouter } from 'next/navigation'
import useGetLayout from '@/hooks/useGetLayout'
import AccordeonCard from '../acordeonCard'
import DspLoader from '@/components/admin/common/loader'
import useGetInventory from '@/hooks/useGetInventory'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import ConfirmationModal from '@/components/admin/modals/confirmationModal'
import { useState } from 'react'
import CameraModal from './cameraModal'
import { putStockImageUpdate } from '@/api/stock'
import { errorHandler } from '@/utils/errors/errors'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import { swallError, Toast } from '@/utils/sweetAlerts'
import Swal from 'sweetalert2'

/**
 * StepFour component handles the final step of the restocking process.
 * It allows users to confirm the restock by verifying quantities and taking a final snapshot.
 */
export default function stepFour () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const transactionId = searchParams.get('transactionId')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  const { layout, layoutLoad } = useGetLayout(layoutId)
  const { products, loading } = useGetProdByStore(externalId)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalCameraVisible, setModalCameraVisible] = useState(false)
  const [comment, setComment] = useState('Sin comentarios')

  const handleComment = async (comment) => {
    setComment(comment)
  }
  const handleChangeModal = () => {
    setModalVisible(!modalVisible)
  }
  const handleOperationConfirmation = () => {
    router.push('/restock')
  }

  const handleConfirmationModal = async (base64Content) => {
    try {
      const response = await updateRestock(base64Content)
      if (response) {
        Swal.close()
        setModalVisible(!modalVisible)
      }
    } catch (error) {
      Swal.close()
      swallError('Ha ocurrido un error al tomar la foto, vuelve a intentarlo', false)
      setModalVisible(!modalVisible)
    }
  }
  const handleCameraModal = () => {
    setModalCameraVisible(!modalCameraVisible)
  }
  const takeSnapshot = async (img) => {
    try {
      const base64Content = await img.split(';base64,').pop()
      handleCameraModal()
      await handleConfirmationModal(base64Content)
    } catch (error) {
      swallError('Ha ocurrido un error al tomar la foto, vuelve a intentarlo', false)
      setModalCameraVisible(!modalCameraVisible)
    }
  }

  const updateRestock = async (base64Content) => {
    try {
      if (base64Content) {
        Toast('Actualizando', 'Por favor espera un momento')
        const response = await putStockImageUpdate(transactionId, base64Content, comment)
        Swal.close()
        return response
      }
    } catch (error) {
      Swal.close()
      errorHandler(error)
    }
  }

  return (
    <div>
      {(inventoryLoad || loading || layoutLoad)
        ? <DspLoader />
        : (
          <div>
            <div className='text-center'>
              <StepLayout showStepIntermediate={showStepIntermediate} />
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
        <ButtonPrimary text='Confirmar Operacion' onClick={() => { handleCameraModal() }} />
      </div>

      {modalVisible && (
        <div className='fixed z-50 flex items-center justify-center'>
          <ConfirmationModal
            handleConfirmationModal={handleChangeModal}
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
            title='Toma una foto de la tienda para confirmar la reposición'
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
