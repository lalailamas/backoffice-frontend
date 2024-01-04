/* eslint-disable multiline-ternary */
'use client'
import React, { useEffect, useState } from 'react'
import { getStockRequest } from '@/api/stock'
import { getStores } from '@/api/store'
import DspLoader from '@/components/admin/common/loader'

function StockOverview () {
  const [stores, setStores] = useState([])
  const [data, setData] = useState([])

  const handleStoreChange = async (id) => {
    setData([])
    const response = await getStockRequest(id)
    setData(response.data)
  }

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores()
        setStores(response.data)
        if (response.data.length > 0) {
          handleStoreChange(response.data[0].storeId)
        }
      } catch (error) {
        console.error('Error fetching stores:', error)
      }
    }
    fetchStores()
  }, [])

  return (
    <div>
      <div className='p-5'>
        <div className='flex justify-center text-center p-5'>
          <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Resumen Stock por máquina</h2>
        </div>
        <div className='pt-4 flex flex-row items-center justify-center'>
          <select
            onChange={(e) => handleStoreChange(e.target.value)}
            className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
          >
            {stores.map((store) => (
              <option key={store.storeId} value={store.storeId}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='p-8'>
        {data.length === 0 ? (
          <DspLoader />
        ) : (
          <table className='table text-d-dark-dark-purple table-zebra mt-8 p-8'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th />
                <th>Producto</th>
                <th>Stock actual</th>
                <th>Stock máximo</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td />
                  <td>{item.productName}</td>

                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default StockOverview
