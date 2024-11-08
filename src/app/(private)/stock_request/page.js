'use client'
import React, { useEffect, useState } from 'react'
import { getStores } from '@/api/store'
import { getStockRequest } from '@/api/stock'
import StockRequestTable from '@/components/admin/tables/stock_request'
import DspLoader from '@/components/admin/common/loader'

/**
 * StockRequest component fetches and displays the stock request information for selected stores.
 */
function StockRequest () {
  const [stores, setStores] = useState([])
  const [data, setData] = useState([])

  const handleStoreChange = async (id) => {
    setData([])
    const response = await getStockRequest(id)
    setData(response)
  }

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores()
        setStores(response)
        if (response.length > 0) {
          handleStoreChange(response[0].storeId)
        }
      } catch (error) {
        console.error('Error fetching stores:', error)
      }
    }
    fetchStores()
  }, [])

  return (
    <div>
      <div>
        <div className='p-5'>
          <div className='flex justify-center text-center p-5'>
            <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Stock por máquina</h2>
          </div>
          <div className=' pt-4 flex flex-row items-center justify-center'>
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
        {data.length === 0
          ? <DspLoader />
          : <StockRequestTable data={data} />}
      </div>
    </div>
  )
}

export default StockRequest
