'use client'
import { useSearchParams } from 'next/navigation'
import useGetLayout from '@/hooks/useGetLayout'
import useGetProdByStore from '@/hooks/useGetProdByStore'
import DspLoader from '@/components/admin/common/loader'

function LayoutMachine () {
  const searchParams = useSearchParams()
  const layoutId = searchParams.get('layoutId') || 'DEV_WE862puc_v5-5680609'
  console.log('Layout ID:', layoutId)
  const storeName = searchParams.get('storeName') || 'DEV PUC Lo Contador'
  console.log('Nombre tienda:', storeName)
  const storeId = searchParams.get('storeId') || 'DEV_CNV_001'
  console.log(storeId, 'storeId')

  const { layout, layoutLoad } = useGetLayout(layoutId)
  const { products, loading } = useGetProdByStore(storeId)

  console.log('Productos:', products)

  return (

    <>
      {(loading || layoutLoad)
        ? (
          <DspLoader />
          )
        : (
          <div>
            <div className='p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
              <h5 className='text-2xl text-center mb-3 font-bold  text-gray-900 dark:text-white'>{storeName}</h5>

              {layout && layout.trays && layout.trays.map((tray, index) => (
                <div key={index} className='text-center border-gray-300'>
                  <div className='bg-d-dark-dark-purple'>
                    <h2 className='text-d-soft-purple text-sm font-bold'>BANDEJA {index + 1}</h2>
                  </div>
                  {tray && tray.columns && (
                    <ul className='flex flex-row gap-2 justify-center overflow-x-auto'>
                      {tray.columns.map((column, index) => {
                        const product = products.find((prod) => prod.productId === column.productId)
                        console.log(product, 'producto aquiiii')
                        console.log(column, 'columna')
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
