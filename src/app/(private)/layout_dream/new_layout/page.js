'use client'
import { getTransitionData } from '@/api/layout'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import { useRouter, useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

function NewLayout () {
  const searchParams = useSearchParams()
  const storeId = searchParams.get('id')
  const router = useRouter()
  const layoutId = 'TRANS_ASDDGBsdfdsfdsdsH'
  const [layout, setLayout] = useState(null)
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTransitionData(storeId, layoutId)
        // console.log(data, 'data')
        setLayout(data.targetLayout)
        setProducts(data.products)
      } catch (error) {
        console.error('Error fetching transition data:', error)
      }
    }
    if (storeId) {
      fetchData()
    }
  }, [storeId, layoutId])

  const handleSaveNewLayout = () => {
    // console.log(`Redirecting to storeId: ${storeId}`)
    router.push(`/layout_dream/layout_comparison?id=${storeId}&layout=${encodeURIComponent(JSON.stringify(layout))}&products=${encodeURIComponent(JSON.stringify(products))}`)
  }

  return (
    <div className='p-2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
      <div className='flex justify-end p-4'>
        <ButtonPrimary text='Nuevo Layout' onClick={() => handleSaveNewLayout()} />
      </div>
      <h5 className='text-2xl text-center mb-3 font-bold text-gray-900 dark:text-white'>
        Tienda 1
      </h5>
      <div><pre>{JSON.stringify(storeId, null, 2)}</pre></div>
      <div><pre>{JSON.stringify(layout, null, 2)}</pre></div>
      <div><pre>{JSON.stringify(products, null, 2)}</pre></div>

      {layout && layout.trays && layout.trays.map((tray, index) => (
        <div key={index} className='text-center border-gray-300'>
          <div className='bg-d-dark-dark-purple'>
            <h2 className='text-d-soft-purple text-sm font-bold'>BANDEJA {index + 1}</h2>
          </div>
          {tray && tray.columns && (
            <ul className='flex flex-row gap-2 justify-center overflow-x-auto'>
              {tray.columns.map((column, index) => {
                const product = products.find((prod) => prod.productId === column.productId)
                return (
                  <li key={index}>
                    {product
                      ? (
                        <div className='flex flex-col items-center w-[100px] h-[80px] border border-gray-200 rounded-lg shadow text-xs'>
                          <img
                            className='w-auto max-w-[30px] h-[30px]'
                            src={product.metadata.imageUrl}
                            width={120}
                            height={120}
                            alt='Product'
                          />
                          {product.productName}
                        </div>
                        )
                      : null}
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export default NewLayout
