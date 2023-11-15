'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import React, { useEffect, useState } from 'react'
import useGetStores2 from '@/hooks/useStores2'
// import useGetProdByStore from '@/hooks/useGetProdByStore'
// import useGetInventory from '@/hooks/useGetInventory'
import { getReiteProdByStore } from '@/api/product/reite'
// import { getInventoryByStore } from '@/api/store'
import DspLoader from '@/components/admin/common/loader'
// import { useSearchParams } from 'next/navigation'

// import DspLoader from '@/components/admin/common/loader'

// useGetStores2
// useGetInventory id del producto y la cantidad
// useGetProdByStore productos por tienda

function StockAdjustment () {
  const { stores } = useGetStores2()
  const [selectedStore, setSelectedStore] = useState(null)
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])

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
        <div className='p-5'>
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
      </div>
      <div className={`${selectedStore ? 'flex items-center flex-col m-4 p-4' : 'disabled'}`} />
      <button
        type='button'
        onClick={() => {
          handleProductsInventory(selectedStore)
        }}
        className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
      >
        Mostrar inventario
        <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
          <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
        </svg>
      </button>
      <div>
        {!products.data
          ? (<DspLoader />)
          : (
            <div>
              <ul>
                {products.data.map((product) => {
                  const quantityProd = inventory.find((prod) => prod.productId === product.productId)

                  return (
                    <div className='flex' key={product.productId}>
                      <li>{product.productName}</li>
                      <p>{quantityProd ? `Quantity: ${quantityProd.quantity}` : 'Quantity not available'}</p>
                    </div>
                  )
                })}
              </ul>
              <div><pre>{JSON.stringify(products, null, 2)}</pre></div>
              <div><pre>{JSON.stringify(inventory, null, 2)}</pre></div>
            </div>
            )}
      </div>
    </div>
  )
}

export default StockAdjustment
