'use client'
import { getAllLayouts, getLayout } from '@/api/layout'
import React, { useState, useEffect } from 'react'
// import DspLoader from '@/components/admin/common/loader'

// import useGetProdByStore from '@/hooks/useGetProdByStore'

function Layout () {
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState('0')

  const [layout, setLayout] = useState(null)
  //   const [store, setStore] = useState(null)
  //   const { products, loading, error } = useGetProdByStore(storeId)

  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const response = await getAllLayouts()
        console.log(response, 'respuesta todos los layouts')
        setLayouts(response)
      } catch (error) {
        console.error('Error al obtener los layouts:', error)
      }
    }

    fetchLayouts()
  }, [])

  const handleLayoutSelection = (e) => {
    const selectedLayoutId = e.target.value
    setSelectedLayout(e)
    console.log(selectedLayoutId, 'id layout seleccionado NO ES EL ID')
    if (selectedLayoutId) {
      try {
        const selectedLayoutObject = layouts.find(layout => layout.id === selectedLayoutId)
        if (selectedLayoutObject) {
          const specificLayoutId = selectedLayoutObject.id
          console.log('ID del diseño específico:', specificLayoutId)
        }
      } catch (error) {
        console.error('Error al obtener el diseño específico:', error)
      }
    }
  }

  //   const handleLayout = async (selectedLayoutId) => {
  //     try {
  //       const result = await getLayout(selectedLayoutId)
  //       if (result) {
  //         setLayout(result)
  //       }
  //     } catch (error) {
  //       console.log('estoy entrando aqui')
  //       console.log(error, 'ERROR')
  //     }
  //   }

  //   useEffect(() => {
  //     if (selectedLayout !== '0') {
  //       handleLayout(selectedLayout)
  //     }
  //   }, [selectedLayout])

  return (
    <div className='p-5'>
      <div className='flex justify-center text-center p-5'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Administra Layout</h2>
      </div>

      <div className='flex justify-center items-center p-5'>
        <div className='flex justify-center items-center p-5'>
          <div className='flex flex-row items-center'>
            <select
              className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
              onChange={handleLayoutSelection}
              value={selectedLayout}
            >
              <option value='0'>Selecciona un layout</option>
              {layouts && layouts.map((layout) => (
                <option key={layout.layoutId} value={layout.layoutId}>
                  {layout.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <div className='p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        {/* <h5 className='text-2xl text-center mb-3 font-bold  text-gray-900 dark:text-white'>{store?.name}</h5> */}

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
  )
}

export default Layout
