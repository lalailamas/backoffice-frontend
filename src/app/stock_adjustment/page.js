'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import React, { useEffect, useState } from 'react'
import { getStores } from '../../api/store'
import useGetProdByStore from '@/hooks/useGetProdByStore'

function StockAdjustment () {
  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)
  const { products } = useGetProdByStore(selectedStore)

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores()
        setStores(response.data)
      } catch (error) {
        console.error('Error fetching stores:', error)
      }
    }
    fetchStores()
  }, [])

  const handleStoreChange = (storeId) => {
    setSelectedStore(storeId)
  }

  return (
    <div>
      <InsideLayout />
      <div>
        <div className='p-5'>
          <select
            className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
            onChange={(e) => handleStoreChange(e.target.value)}
          >
            <option value=''>Select a store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.external_id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <ul>
          {products.map((product) => (
            <li key={product.id}>{product.name}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default StockAdjustment
