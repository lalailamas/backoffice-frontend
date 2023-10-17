'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import StepLayout from '../stepLayout'
import { useSearchParams, useRouter } from 'next/navigation'
import useGetLayout from '@/hooks/useGetLayout'
// import useGetReiteProd from '@/hooks/useGetReiteProd'
import AccordeonCard from '../acordeonCard'
import DspLoader from '@/components/admin/common/loader'
import useGetInventory from '@/hooks/useGetInventory'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import { OpenStore } from '@/api/store'
import ConfirmationModal from '../confirmationModal'
import { useState } from 'react'
// import useGetStores2 from '@/hooks/useStores2'
// import useGetStoreData from '@/hooks/useGetStoreData'

export default function stepFour () {
  const searchParams = useSearchParams()
  const router = useRouter()
  const externalId = searchParams.get('external_id')
  const layoutId = searchParams.get('layout_id')
  const storeName = searchParams.get('store_name')
  const { inventory, inventoryLoad } = useGetInventory(externalId)
  // const { store, loading: storeLoad } = useGetStoreData(externalId)
  const { layout, layoutLoad } = useGetLayout(layoutId)
  // const { products, loading } = useGetReiteProd()
  const { products, loading } = useGetProdByStore(externalId)
  const [modalVisible, setModalVisible] = useState(false)
  const handleBackToStepTwo = async () => {
    const openStore = await OpenStore(externalId)
    router.push(
      '/restock/stepTwo' + `?external_id=${externalId}&layout_id=${layoutId}&store_name=${storeName}&transactionId=${openStore.transactionId}`
    )
  }
  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }
  const handleOperationConfirmation = async () => {
    router.push(
      '/restock'
    )
  }

  return (
    <div>
      {(inventoryLoad || loading || layoutLoad)
        ? <DspLoader />
        : (
          <div>
            <InsideLayout />
            <div className='text-center'>
              <StepLayout />
            </div>
            <div className='px-4 md:px-6 lg:px-8'>
              {externalId && (
                <div className='text-center mb-4 md:mb-8'>
                  <h1 className='text-d-dark-dark-purple text-2x2 font-bold'>Vuelve a confirmar el inventario de {storeName} y asegúrate de que los precios correspondan al producto.</h1>
                </div>
              )}
              {
                layout && layout.trays && layout.trays.map((tray, index) => {
                  return (
                    <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>

                      <h2 className='text-d-soft-purple text-2x2 font-bold pb-5 mb-5 md:mb-8'>Bandeja N°{index + 1}</h2>
                      <div className='flex flex-col md:flex-row gap-4 items-center md:items-start h-full w-full'>

                        {
                                tray
                                  ? tray.columns.map((column, index) => {
                                    const product = products?.filter((product) => product.productId === column.productId)
                                    const quantityProd = inventory.products?.find((prod) => prod.productId === column.productId)
                                    const maxQuantity = column.maxQuantity
                                    // console.log(store.products, '--------------store.products-------------')
                                    // console.log('aca tengo el product', product)
                                    // console.log('aca tengo el quantityProd', quantityProd ? quantityProd.quantity : 'No encontrado')
                                    return (
                                      <AccordeonCard
                                        step={4}
                                        key={index}
                                        initialQuantity={quantityProd ? quantityProd.quantity : 0}
                                        price={product[0].prices[externalId] ? product[0].prices[externalId] : null}
                                        maxQuantity={maxQuantity}
                                        header={
                                          <div className=' w-full gap-3 items-center justify-center'>
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
                                            {/* <p className='ml-auto font-bold text-d-dark-dark-purple'> {quantityProd ? `${quantityProd.quantity}/${maxQuantity}` : '??'}</p> */}
                                          </div>
                                    }
                                      />
                                    // <div key={index}>
                                    //   <pre>{JSON.stringify(inventory, null, 2)}</pre>
                                    // </div>

                                    )
                                  })
                                  : null
                            }
                      </div>
                    </div>

                  )
                })
            }
            </div>
          </div>
          )}
      {/* <button
        type='button'
        onClick={() => {
          handleBackToStepTwo()
        }}
        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Volver Atrás

      </button> */}
      <button
        type='button'
        onClick={() => {
          handleConfirmationModal()
        }}
        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Confirmar Operación
      </button>
      {modalVisible && (
        <ConfirmationModal
          handleConfirmationModal={handleConfirmationModal}
          handleOperationConfirmation={handleOperationConfirmation}
          title='La reposición ha sido confirmada'
          message='¡Muchas gracias! ya puedes cerrar la página.'
          confirmButtonText='Cerrar'
          cancelButtonText='Cancelar'
        />
      )}

    </div>
  )
}
