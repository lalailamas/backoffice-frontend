'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import React, { useEffect, useState } from 'react'
import useGetStores2 from '@/hooks/useStores2'
import { getReiteProdByStore } from '@/api/product/reite'
import DspLoader from '@/components/admin/common/loader'
import QuantityModal from '../restock/quantityModal'
// import { useRouter } from 'next/navigation'
// import DspLoader from '@/components/admin/common/loader'

function StockAdjustment () {
  const { stores } = useGetStores2()
  const [selectedStore, setSelectedStore] = useState(null)
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  // const [quantity, setQuantity] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  // const router = useRouter()

  const handleStoreChange = (e) => {
    setSelectedStore(e)
  }
  const handleProductsInventory = async (storeId) => {
    // console.log(storeId, 'store ID')
    try {
      const products = await getReiteProdByStore(storeId)
      const store = stores.find((store) => store.storeId === storeId)
      setProducts(products)
      setInventory(store.products)
    } catch (error) {
      console.log(error)
    }
  }

  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }
  const handleEditProduct = (product, quantityProd, metadata) => {
    setSelectedProduct({ product, quantityProd, metadata })
    setModalVisible(true)
  }
  const handleOperationConfirmation = async () => {
    setModalVisible(false)
  }

  useEffect(() => {
    // Verifica si hay una tienda seleccionada
    if (selectedStore) {
      // console.log('entré')
      // console.log(selectedStore, 'selectedStore')
    }
  }, [selectedStore])

  return (
    <div>
      <InsideLayout />
      <div>
        <div className='p-5 pt-10 flex flex-row items-center justify-center'>
          <select
            className='select select-sm select-bordered rounded-full w-full md:max-w-xs '
            onChange={(e) => handleStoreChange(e.target.value)}
          >
            <option value='0'>Selecciona una tienda</option>
            {stores &&
              stores.map((store) => (
                <option key={store.storeId} value={store.storeId}>
                  {store.name}
                </option>
              ))}
          </select>

        </div>
      </div>
      <div className={`${selectedStore ? 'flex flex-row items-center justify-center' : 'hidden'}`}>
        <button
          type='button'
          onClick={() => {
            handleProductsInventory(selectedStore)
          }}
          className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Mostrar stock de la tienda
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M19.5 8.25l-7.5 7.5-7.5-7.5' />
          </svg>

        </button>
      </div>
      <div className='p-8'>
        {!products.data
          ? (<DspLoader />)
          : (
            <table className='table text-d-dark-dark-purple table-zebra mt-8 p-8'>
              <thead>
                <tr className='bg-d-dark-dark-purple text-d-white'>
                  <th className='py-2 px-4 border '>Imagen</th>
                  <th className='py-2 px-4 border'>Producto</th>
                  <th className='py-2 px-4 border'>Cantidad</th>
                  <th className='py-2 px-4 border'>Editar</th>
                </tr>
              </thead>
              <tbody>
                {products.data.map((product) => {
                  const quantityProd = inventory.find((prod) => prod.productId === product.productId)
                  const { metadata } = product
                  return (
                    <tr key={product.productId} className='border'>
                      <td className='py-2 px-2 border flex justify-center'>
                        <img src={metadata.imageUrl} alt={product.productName} className='w-10 h-10' />
                      </td>
                      <td className='py-2 px-4 border'>{product.productName}</td>
                      <td className='py-2 px-4 border'>
                        {quantityProd ? `${quantityProd.quantity}` : 'Quantity not available'}
                      </td>

                      <td className='py-2 px-4 border'>
                        <button
                          className='' onClick={() => {
                            handleEditProduct(product, quantityProd, metadata)
                          }}
                        >
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='currentColor' className='w-6 h-6'>
                            <path stroke-linecap='round' stroke-linejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                          </svg>

                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            )}

        {modalVisible && selectedProduct && (
          <QuantityModal
            handleConfirmationModal={handleConfirmationModal}
            handleOperationConfirmation={handleOperationConfirmation}
            title={`Edita el stock de ${selectedProduct.product.productName}`}
            message={`Cantidad actual: ${selectedProduct.quantityProd.quantity}`}
            confirmButtonText='OK'
            cancelButtonText='Cancelar'
            showQuantityControls
            initialQuantity={selectedProduct.quantityProd.quantity}
          />

        )}
        {/* <div><pre>{JSON.stringify(selectedProduct, null, 2)}</pre></div> */}
        {/* <div><pre>{JSON.stringify(inventory, null, 2)}</pre></div> */}
      </div>
    </div>
  )
}
export default StockAdjustment
