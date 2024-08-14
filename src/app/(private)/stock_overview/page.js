/* eslint-disable multiline-ternary */
'use client'
import React, { useEffect, useState } from 'react'
import { getInventoryByStore } from '@/api/store'
import DspLoader from '@/components/admin/common/loader'
import useGetStores2 from '@/hooks/useStores2'
import { getReiteProdByStore } from '@/api/product/reite'
import { swallError } from '@/utils/sweetAlerts'
import useGetLayout from '@/hooks/useGetLayout'

/**
 * StockOverview component allows users to view the inventory and stock details of products in selected stores.
 */
function StockOverview () {
  const { stores } = useGetStores2(true)
  const [selectedStore, setSelectedStore] = useState(null)
  const [products, setProducts] = useState([])
  const [inventory, setInventory] = useState([])
  const [newQuantity, setNewQuantity] = useState(null)
  const [loader, setLoader] = useState(false)
  const layoutId = stores && stores.find(store => store.storeId === selectedStore)?.layoutId
  const { layout } = useGetLayout(layoutId)
  const [expandedRows, setExpandedRows] = useState([])

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
          swallError('Ocurrió un error inesperado', false)
        }
      }
    }
    updateProductsInventory()
  }, [selectedStore, stores, layout])

  return (
    <div className='p-5'>
      <div className='flex justify-center text-center p-5'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Informe de Inventario por Tienda</h2>
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
          : products && (
            <table className='table  text-d-dark-dark-purple table-zebra mt-8 p-8 max-[431px]:hidden'>
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
                {products.map((product) => {
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
        <div className='md:hidden m-2'>
          {Array.isArray(products) && products.map((product) => (
            <div key={product.productId} className='pb-2'>
              <div className='flex justify-between w-full md:hidden bg-d-soft-purple p-2 rounded-md'>
                <div className=''>
                  <h3>
                    {product.productName}
                  </h3>
                </div>
                <button
                  className='btn'
                  onClick={() => {
                    const newExpandedRows = [...expandedRows]
                    if (newExpandedRows.includes(product)) {
                      newExpandedRows.splice(newExpandedRows.indexOf(product), 1)
                    } else {
                      newExpandedRows.push(product)
                    }
                    setExpandedRows(newExpandedRows)
                  }}
                >
                  <svg width='19' height='8' viewBox='0 0 19 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g id='&#240;&#159;&#166;&#134; icon &#34;arrow down 1&#34;'>
                      <path id='Vector' d='M9.24372 7.31144C8.52431 7.31144 7.8049 7.08182 7.26021 6.6311L0.559468 1.08641C0.261427 0.839788 0.261427 0.431587 0.559468 0.184966C0.857508 -0.0616553 1.35082 -0.0616553 1.64886 0.184966L8.3496 5.72966C8.84291 6.13786 9.64453 6.13786 10.1378 5.72966L16.8386 0.184966C17.1367 -0.0616553 17.63 -0.0616553 17.928 0.184966C18.226 0.431587 18.226 0.839788 17.928 1.08641L11.2272 6.6311C10.6825 7.08182 9.96313 7.31144 9.24372 7.31144Z' fill='#292D32' />
                    </g>
                  </svg>
                </button>
              </div>
              {/* Detalles colapsables */}
              {expandedRows.includes(product) && (
                <div className='mt-2 p-2'>
                  <div className='grid grid-cols-2 gap-4'>
                    <h2 className='font-semibold'>Stock actual</h2>
                    <span>
                      {inventory && inventory.find((prod) => prod.productId === product.productId)
                        ? inventory.find((prod) => prod.productId === product.productId).quantity
                        : 0}
                    </span>
                    <h2 className='font-semibold'>Stock máximo</h2>
                    <span>{layout?.trays
                      ?.flatMap((tray) => tray.columns)
                      ?.find((column) => column.productId === product.productId)?.maxQuantity || 0}
                    </span>
                    <h2 className='font-semibold'>Precio</h2>
                    {Object.entries(product.prices)
                      .filter(([key]) => key === selectedStore)
                      .map(([key, value]) => (
                        <span key={key}>
                          $ {value}
                        </span>
                      ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* <div><pre>{JSON.stringify(products, null, 2)}</pre></div> */}
        {/* <div><pre>{JSON.stringify(inventory, null, 2)}</pre></div> */}
      </div>
    </div>
  )
}

export default StockOverview
