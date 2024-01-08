/* eslint-disable multiline-ternary */
'use client'
import React, { useEffect, useState } from 'react'
import { getInventoryByStore } from '@/api/store'
import DspLoader from '@/components/admin/common/loader'
import useGetStores2 from '@/hooks/useStores2'
import { getReiteProdByStore } from '@/api/product/reite'
import { swallError } from '@/utils/sweetAlerts'
import useGetLayout from '@/hooks/useGetLayout'

function StockOverview () {
  const { stores } = useGetStores2()
  const [selectedStore, setSelectedStore] = useState(null)
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])
  const [newQuantity, setNewQuantity] = useState(null)
  const [loader, setLoader] = useState(false)
  const layoutId = stores && stores.find(store => store.storeId === selectedStore)?.layoutId
  console.log(layoutId, 'layout id ')

  const { layout } = useGetLayout(layoutId)
  console.log(layout, 'layout')

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
          swallError('Ocurrió un error inesperado', false)
        }
      }
    }
    updateProductsInventory()
  }, [selectedStore, stores, layout])

  return (
    <div className='p-5'>
      <div className='flex justify-center text-center p-5'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Resumen de Stock</h2>
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

      </div>

      <div className={`${selectedStore ? 'flex flex-row items-center justify-center' : 'hidden'}`} />
      <div className='p-8'>
        {loader
          ? <DspLoader />
          : products.data && (
            <table className='table text-d-dark-dark-purple table-zebra mt-8 p-8'>
              <thead>
                <tr className='bg-d-dark-dark-purple text-d-white'>
                  <th />
                  <th>Imagen</th>
                  <th>Producto</th>
                  <th>Stock actual</th>
                  <th>Stock máximo</th>
                  <th>Precio</th>

                </tr>
              </thead>
              <tbody>
                {products.data.map((product) => {
                  const quantityProd = inventory.find((prod) => prod.productId === product.productId)
                  const { metadata, prices } = product
                  const trayColumn = layout?.trays?.flatMap((tray) => tray.columns)?.find((column) => column.productId === product.productId)
                  const maxQuantity = trayColumn?.maxQuantity
                  return (
                    <tr key={product.productId}>
                      <td />
                      <td>
                        <img src={metadata.imageUrl} alt={product.productName} className='w-10 h-10' />
                      </td>
                      <td>{product.productName}</td>
                      <td>
                        {
                            newQuantity && newQuantity[product.productId]
                              ? `${newQuantity[product.productId]}`
                              : quantityProd && quantityProd.quantity
                                ? `${quantityProd.quantity}`
                                : 0
                          }
                      </td>
                      <td>
                        {maxQuantity}
                      </td>
                      <td>
                        {Object.entries(prices)
                          .filter(([key]) => key === selectedStore)
                          .map(([key, value]) => (
                            <td key={key}>
                              $ {value}
                            </td>
                          ))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

        {/* <div><pre>{JSON.stringify(products, null, 2)}</pre></div> */}
        {/* <div><pre>{JSON.stringify(inventory, null, 2)}</pre></div> */}
      </div>
    </div>
  )
}

export default StockOverview
