'use client'
import React, { useState, useEffect } from 'react'
import useGetStores2 from '@/hooks/useStores2'
import { getReiteProdByStore } from '@/api/product/reite'
import DspLoader from '@/components/admin/common/loader'
import QuantityModal from '../../components/admin/modals/quantityModal'
import { getInventoryByStore, downloadInventoryExcel } from '@/api/store'
import FileSaver from 'file-saver'
import { swallError, Toast, swallInfo } from '@/utils/sweetAlerts'
import Swal from 'sweetalert2'
import PriceModal from '@/components/admin/modals/priceModal'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'

function StockAdjustment () {
  const { stores } = useGetStores2()
  const [selectedStore, setSelectedStore] = useState(null)
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])
  const [modalVisible, setModalVisible] = useState(false)
  const [newQuantity, setNewQuantity] = useState(null)
  const [isEditingPrice, setIsEditingPrice] = useState(false)

  const [selectedProduct, setSelectedProduct] = useState(null)
  // console.log(selectedProduct, 'selectedProduct')
  const [loader, setLoader] = useState(false)
  // console.log('inventory', inventory)
  // console.log(isEditingPrice, 'is editing price')
  // console.log(newQuantity, 'new quantity')

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
          console.log('products', products)
          const store = await getInventoryByStore(selectedStore)
          console.log('store', store)
          setNewQuantity(null)
          setIsEditingPrice(null)
          setProducts(products)
          setInventory(store.data.products)
          setLoader(false)
        } catch (error) {
          console.log(error)
          swallError('Ocurrió un error inesperado', false)
        }
      }
    }
    updateProductsInventory()
  }, [selectedStore, stores, setSelectedProduct])

  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }
  const handleEditStock = (product, quantityProd, metadata) => {
    setSelectedProduct({ product, quantityProd, metadata })
    setModalVisible(true)
    setIsEditingPrice(false)
  }

  const handleEditPrice = (product, prices, metadata) => {
    setSelectedProduct({ product, prices, metadata })
    setModalVisible(true)
    setIsEditingPrice(true)
  }

  const handleOperationConfirmation = async () => {
    setModalVisible(false)
  }

  const updateProductQuantity = (productId, newQuantity) => {
    setNewQuantity((prevQuantity) => ({
      ...prevQuantity,
      [productId]: newQuantity
    }))
    setInventory(prevInventory => {
      const updatedInventory = prevInventory.map(item => {
        if (item.productId === productId) {
          return { ...item, quantity: newQuantity }
        }
        return item
      })
      swallInfo('Stock modificado exitosamente')
      return updatedInventory
    })
  }

  const updateProductPrice = (productId, newPrice) => {
    setInventory((prevInventory) => {
      const updatedInventory = prevInventory.map((item) => {
        if (item.productId === productId) {
          return {
            ...item,
            prices: {
              ...item.prices,
              [selectedStore]: newPrice
            }
          }
        }
        return item
      })

      // Actualizar localmente el precio
      setProducts((prevProducts) => {
        return prevProducts.map((product) => {
          if (product.productId === productId) {
            return {
              ...product,
              prices: {
                ...product.prices,
                [selectedStore]: newPrice
              }
            }
          }
          return product
        })
      })

      swallInfo('Precio modificado exitosamente')
      return updatedInventory
    })
  }

  const handleExcelDownload = async () => {
    try {
      Toast('Descargando archivo', 'Espera unos segundos')
      const response = await downloadInventoryExcel(selectedStore)
      const { buffer, filename } = response.data
      const blob = new Blob([Buffer.from(buffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, filename)
      Swal.close()
    } catch (error) {
      swallError('Error al descargar el archivo Excel:', false)
      console.error('Error al descargar el archivo Excel:', error)
    }
  }

  return (
    <div className='p-5'>
      <div className='flex justify-center text-center p-5'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Ajuste de Stock y Precios por Tienda</h2>
      </div>

      <div className='flex justify-center items-center p-5'>

        <div className='flex flex-row items-center'>
          <select
            className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
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
        <div className={`${selectedStore ? 'flex justify-end p-5' : 'hidden'}`}>
          <ButtonPrimary text='Descargar' onClick={handleExcelDownload} type='download' />
        </div>

      </div>

      <div className={`${selectedStore ? 'flex flex-row items-center justify-center' : 'hidden'}`} />
      <div className='p-8'>
        {loader
          ? <DspLoader />
          : products && (
            <table className='table text-d-dark-dark-purple table-zebra mt-8 p-8'>
              <thead>
                <tr className='bg-d-dark-dark-purple text-d-white'>
                  <th />
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Stock actual</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => {
                  const quantityProd = inventory.find((prod) => prod.productId === product.productId)
                  // console.log(quantityProd, 'quantity prod')

                  const { metadata, prices } = product
                  // console.log(metadata, 'metadata')
                  // console.log(metadata.brand, 'brand')

                  // console.log(prices, 'prices')

                  return (
                    <tr key={product.productId}>
                      <td />
                      <td>
                        <img src={metadata.imageUrl} alt={product.productName} className='w-10 h-10' />
                      </td>
                      <td>{product.productName}</td>
                      <td className=''>
                        <div className='flex justify-evenly'>
                          {
                          newQuantity && newQuantity[product.productId]
                            ? `${newQuantity[product.productId]}`
                            : quantityProd && quantityProd.quantity
                              ? `${quantityProd.quantity}`
                              : 0
                        }

                          <button
                            className='' onClick={() => {
                              handleEditStock(product, quantityProd, metadata)
                            }}
                          >
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                            </svg>

                          </button>
                        </div>
                      </td>
                      <td className=''>
                        <div className='flex justify-evenly'>
                          {Object.entries(prices)
                            .filter(([key]) => key === selectedStore)
                            .map(([key, value]) => (
                              <span key={key}>
                                $ {value}
                              </span>
                            ))}
                          <button
                            className=''
                            onClick={() => {
                              handleEditPrice(product, prices[selectedStore], metadata)
                            }}
                          >
                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                            </svg>

                          </button>
                        </div>
                      </td>

                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        {modalVisible && selectedProduct && (
          <div className='fixed z-50 flex items-center justify-center'>
            {(isEditingPrice !== null) && (
              isEditingPrice
                ? (
                  <PriceModal
                    title={`Edita el precio de ${selectedProduct.product.productName}`}
                    message={`Precio actual: $${selectedProduct.prices}`}
                    handleConfirmationModal={handleOperationConfirmation}
                    handleCancel={handleConfirmationModal}
                    productId={selectedProduct.product.productId}
                    storeId={selectedStore}
                    confirmButtonText='OK'
                    cancelButtonText='Cancelar'
                    initialPrice={selectedProduct.prices}
                    updateProductPrice={updateProductPrice}
                    brand={selectedProduct.metadata.brand}
                    name={selectedProduct.product.productName}
                  />
                  )
                : (
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
                  )
            )}
          </div>
        )}

        {/* <div><pre>{JSON.stringify(selectedProduct.prices, null, 2)}</pre></div> */}
        {/* <div><pre>{JSON.stringify(inventory, null, 2)}</pre></div> */}
      </div>
    </div>
  )
}
export default StockAdjustment
