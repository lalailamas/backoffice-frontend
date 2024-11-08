'use client'
import StepLayout from '../stepLayout'
import { useSearchParams, useRouter } from 'next/navigation'
import useGetLayout from '@/hooks/useGetLayout'
import AccordeonCard from '../acordeonCard'
import DspLoader from '@/components/admin/common/loader'
import useGetInventory from '@/hooks/useGetInventory'
import { useState } from 'react'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import { putRestockResult } from '@/api/restock'
import ConfirmationModal from '@/components/admin/modals/confirmationModal'
import { swallError } from '@/utils/sweetAlerts'
import { errorHandler } from '@/utils/errors/errors'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'

export default function page () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const externalTransactionId = searchParams.get('externalTransactionId')
  const transactionId = searchParams.get('transactionId')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  const { layout, layoutLoad } = useGetLayout(layoutId)
  const [loaderVisible, setLoaderVisible] = useState(false)
  const nextRoute = 'stepFour' + `?external_id=${externalId}&layout_id=${layoutId}&store_name=${storeName}&externalTransactionId=${externalTransactionId}&transactionId=${transactionId}`

  // const { products, loading } = useGetReiteProd()
  const { products, loading } = useGetProdByStore(externalId)
  // const [comments, setComments] = useState('Sin comentarios')

  const [tempPurchased, setTempPurchased] = useState({})
  const [tempRestocked, setTempRestocked] = useState({})
  const [modalVisible, setModalVisible] = useState(false)

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
    })
    )
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
      if (response.successful) {
        swallError('Restock Confirmado', true)
        router.push(
          nextRoute
        )
      }
    } catch (error) {
      errorHandler(error, stockData)
      if (error.response.status === 403) {
        router.push(
          nextRoute
        )
      }
      setLoaderVisible(false)
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
      {/* <div><pre>{JSON.stringify(tempRestocked, null, 2)}</pre></div> */}
      {/* <div><pre>{JSON.stringify(tempPurchased, null, 2)}</pre></div> */}

      {(loading || inventoryLoad || layoutLoad)
        ? <DspLoader />
        : (
          <div>
            <div className='text-center'>

              <StepLayout />
            </div>
            <div className='px-4 md:px-6 lg:px-8'>
              {/* {externalId && (
                <div className='text-center mb-4 md:mb-8'>
                  <h1 className='text-d-dark-dark-purple text-2x2 font-bold'>Añade o retira productos</h1>
                </div>
              )} */}
              {
                layout && layout.trays && layout.trays.map((tray, index) => {
                  return (
                    <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
                      <div className='bg-d-dark-dark-purple'>
                        <h2 className='text-d-soft-purple text-medium font-bold py-2 mb-2 md:mb-8'>Bandeja {index + 1}</h2>
                      </div>
                      {/* <div className='flex flex-col md:flex-row gap-4 items-center md:items-start h-full w-full'> */}
                      <div className='flex flex-row gap-2 items-center overflow-x-auto'>

                        {
                                tray
                                  ? tray.columns.map((column, index) => {
                                    const product = products?.filter((product) => product.productId === column.productId)
                                    const quantityProd = inventory.products.find((prod) => prod.productId === column.productId)
                                    const maxQuantity = column.maxQuantity
                                    return (
                                      <AccordeonCard
                                        step={3}
                                        key={index}
                                        index={column.productId + index}
                                        updateProductQuantity={updateProductQuantity}
                                        productId={column.productId}
                                        maxPurchasedQuantity={quantityProd ? quantityProd.quantity : 0}
                                        maxQuantity={maxQuantity}
                                        header={
                                          <div className='w-full'>
                                            <figure className='flex justify-center'>
                                              <img
                                                className='w-auto max-w-[50px] h-[50px]'
                                                src={product[0].metadata.imageUrl}
                                                width={120}
                                                height={120}
                                                alt='Product'
                                              />
                                            </figure>
                                            <h1 className='flex justify-center items-center text-d-title-purple font-bold m-1'>{product[0].productName}</h1>
                                            <h1 className='flex justify-center items-center text-black-500 font-bold m-1 text-xs'>(Máximo: {maxQuantity} unidades)</h1>

                                            {/* <p className='ml-auto font-bold text-d-dark-dark-purple'> {quantityProd ? `${quantityProd.quantity}/${maxQuantity}` : '??'}</p> */}
                                          </div>
                                      }
                                      />

                                    )
                                  })
                                  : null
                              }
                      </div>
                    </div>
                  // </div>

                  )
                })

              }

            </div>
          </div>
          )}
      <div className='flex justify-center pb-10'>
        <ButtonPrimary text='Confirmar Restock' onClick={() => { handleConfirmationModal() }} />

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
