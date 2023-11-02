'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import StockTable from '@/components/admin/tables/stockTable'
import { useEffect, useState } from 'react'
import { getActualStock } from '../../api/stock'

const Stock = () => {
  const [stock, setStock] = useState([])

  useEffect(() => {
    getActualStock()
      .then((response) => {
        console.log(response, 'stock actual')
        setStock(response.data)
      })
      .catch((error) => {
        console.log('entre al error')
        console.error('Error fetching actual stock data:', error)
      })
  }, [])

  return (
    <>
      <InsideLayout />
      <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center p-4 '>Stock actual de productos</h2>
      <div className='p-8 mb-11'>
        <StockTable stock={stock} />
      </div>
    </>
  )
}

export default Stock
