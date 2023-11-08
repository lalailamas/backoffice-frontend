'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import StepLayout from '../stepLayout'
import { useSearchParams, useRouter } from 'next/navigation'
import useGetLayout from '@/hooks/useGetLayout'
// import useGetReiteProd from '@/hooks/useGetReiteProd'
import AccordeonCard from '../acordeonCard'
import DspLoader from '@/components/admin/common/loader'
import useGetInventory from '@/hooks/useGetInventory'
import { useState } from 'react'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import { patchRestockResult } from '@/api/restock'
import ConfirmationModal from '../confirmationModal'

export default function page () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const transactionId = searchParams.get('transactionId')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  const { layout, layoutLoad } = useGetLayout(layoutId)
  // const { products, loading } = useGetReiteProd()
  const { products, loading } = useGetProdByStore(externalId)

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
      alwaysUpdateInventory: true,
      purchased: allProducts.map((product) => ({
        productId: product.productId,
        quantity: flatPurchased[product.productId] || 0
      })),
      restocked: allProducts.map((product) => ({
        productId: product.productId,
        quantity: flatRestocked[product.productId] || 0
      }))

    }

    try {
      console.log('Step 3: stockData to Confirm PATCH RESULT', stockData)
      const response = await patchRestockResult(transactionId, stockData)
      console.log('Step 3: response PATCH RESULT', response)
      if (response.data.successful) {
        router.push(
          'stepFour' + `?external_id=${externalId}&layout_id=${layoutId}&store_name=${storeName}&transactionId=${transactionId}`
        )
      }
    } catch (error) {
      console.log(error)
    }
  }
  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }

  return (
    <div>
      {/* <div><pre>{JSON.stringify(tempRestocked, null, 2)}</pre></div> */}
      {/* <div><pre>{JSON.stringify(tempPurchased, null, 2)}</pre></div> */}

      {(loading || inventoryLoad || layoutLoad)
        ? <DspLoader />
        : (
          <div>
            <InsideLayout />
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
                        <h2 className='text-d-soft-purple text-d-title font-bold py-5 mb-5 md:mb-8'>Bandeja {index + 1}</h2>
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
        <button
          type='button'
          onClick={() => {
            handleConfirmationModal()
          }}
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Confirmar Restock
          <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
          </svg>
        </button>
      </div>
      {modalVisible && (
        <ConfirmationModal
          handleConfirmationModal={handleConfirmationModal}
          handleOperationConfirmation={handleConfirmRestock}
          title='¿Confirmas que los datos de reposición son correctos?'
          message='Recuerda que una vez confirmados, no podrás realizar cambios'
          confirmButtonText='Confirmar'
          cancelButtonText='Cancelar'
        />
      )}
    </div>
  )
}
