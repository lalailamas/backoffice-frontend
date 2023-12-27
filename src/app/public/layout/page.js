'use client'
import { useSearchParams } from 'next/navigation'
// import useGetLayout from '@/hooks/useGetLayout'
import { getStores } from '@/api/store'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import DspLoader from '@/components/admin/common/loader'
import { useEffect, useState } from 'react'
import { getLayout } from '@/api/layout'

function LayoutMachine () {
  // https://admin.despnsa247.com/public/layout?id=CNV_004
  const searchParams = useSearchParams()
  const storeId = searchParams.get('id')
  const [store, setStore] = useState()
  const [layout, setLayout] = useState()

  const { products, loading } = useGetProdByStore(storeId)

  const handleLayout = async (layoutId) => {
    try {
      const result = await getLayout(layoutId)
      if (result) {
        setLayout(result.data)
      }
    } catch (error) {

    }
  }

  const handleBringStore = async () => {
    try {
      const storesResponse = await getStores()
      if (storesResponse) {
        const storeResponse = storesResponse.data.filter((store) => store.storeId === storeId)
        setStore(storeResponse[0])
        handleLayout(storeResponse[0].layoutId)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    handleBringStore()
  }, [])

  return (

    <>
      {(loading)
        ? (
          <DspLoader />
          )
        : (
          <div>
            <div className='p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <h5 className='text-2xl text-center mb-3 font-bold  text-gray-900 dark:text-white'>{store.name}</h5>

              {layout && layout.trays && layout.trays.map((tray, index) => (
                <div key={index} className='text-center border-gray-300'>
                  <div className='bg-d-dark-dark-purple'>
                    <h2 className='text-d-soft-purple text-sm font-bold'>BANDEJA {index + 1}</h2>
                  </div>
                  {tray && tray.columns && (
                    <ul className='flex flex-row gap-2 justify-center overflow-x-auto'>
                      {tray.columns.map((column, index) => {
                        const product = products.find((prod) => prod.productId === column.productId)
                        // console.log(product, 'producto aquiiii')
                        // console.log(column, 'columna')
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
          </div>
          )}
    </>
  )
}

export default LayoutMachine
