'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import React, { useState, useEffect } from 'react'
import useGetStores2 from '@/hooks/useStores2'
import { getReiteProdByStore } from '@/api/product/reite'
import DspLoader from '@/components/admin/common/loader'
import QuantityModal from '../restock/quantityModal'
import { getInventoryByStore, downloadInventoryExcel } from '@/api/store'
import FileSaver from 'file-saver'

function StockAdjustment () {
  const { stores } = useGetStores2()
  const [selectedStore, setSelectedStore] = useState(null)
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newQuantity, setNewQuantity] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [loader, setLoader] = useState(false)

  const handleStoreChange = (e) => {
    setProducts([])
    setSelectedStore(e)
  }

  useEffect(() => {
    const updateProductsInventory = async () => {
      if (selectedStore) {
        setLoader(true)
        try {
          const products = await getReiteProdByStore(selectedStore)
          const store = await getInventoryByStore(selectedStore)
          setNewQuantity(null)
          setProducts(products)
          setInventory(store.data.products)
          setLoader(false)
        } catch (error) {
          console.log(error)
        }
      }
    }
    updateProductsInventory()
  }, [selectedStore, stores])

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

  const updateProductQuantity = (productId, newQuantity) => {
    setNewQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity
    }))
  }

  const handleExcelDownload = async () => {
    try {
      const response = await downloadInventoryExcel()
      console.log(response, 'respuesta')

      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, 'clientes.xlsx')
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error)
    }
  }

  return (
    <div className='h-screen'>
      <InsideLayout />
      <div className='flex justify-center text-center p-5'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Modifica el Inventario</h2>
      </div>

      <div>
        <button onClick={handleExcelDownload} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-2'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
          </svg>
          Descargar
        </button>

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
      <div className={`${selectedStore ? 'flex flex-row items-center justify-center' : 'hidden'}`} />
      <div className='p-8'>
        {loader
          ? <DspLoader />
          : products.data && (
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
                        {
                          newQuantity && newQuantity[product.productId]
                            ? `${newQuantity[product.productId]}`
                            : quantityProd && quantityProd.quantity
                              ? `${quantityProd.quantity}`
                              : 0
                        }

                      </td>

                      <td className='py-2 px-4 border'>
                        <button
                          className='' onClick={() => {
                            handleEditProduct(product, quantityProd, metadata)
                          }}
                        >
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
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
            productId={selectedProduct.product.productId}
            storeId={selectedStore}
            updateQuantity={handleOperationConfirmation}
            updateProductQuantity={updateProductQuantity}

          />

        )}
        {/* <div><pre>{JSON.stringify(newQuantity, null, 2)}</pre></div> */}
        {/* <div><pre>{JSON.stringify(inventory, null, 2)}</pre></div> */}
      </div>
    </div>
  )
}
export default StockAdjustment
