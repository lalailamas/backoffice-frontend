'use client'
import { getAllLayouts } from '@/api/layout'
import { updateLayout } from '@/api/store'
import DspLoader from '@/components/admin/common/loader'
import React, { useEffect, useState } from 'react'

function LayoutDetail ({ storeId, products, layout, layoutId }) {
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState(layoutId)
  const [showLayout, setShowLayout] = useState(layout)
  const [loader, setLoader] = useState(false)

  const handleUpdateStoreLayout = async () => {
    const response = await updateLayout(storeId, layoutId)
    console.log(response)
  }

  useEffect(() => {
    const fetchLayouts = async () => {
      const response = await getAllLayouts()
      setLayouts(response)
    }
    fetchLayouts()
  }, [])
  useEffect(() => {
    const fetchLayout = async () => {
      setLoader(true)
      const response = await getAllLayouts()
      setShowLayout(response.find(layout => layout.id === selectedLayout))
      setLoader(false)
    }
    fetchLayout()
  }, [selectedLayout])
  return (
    <div>
      <div className='flex items-center'>

        <select
          onChange={(e) => setSelectedLayout(e.target.value)}
          className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
          value={selectedLayout}
        >
          <option value='0'>Selecciona un layout</option>
          {layouts && layouts.map((layout) => (
            <option key={layout.id} value={layout.id}>
              {layout.name}
            </option>
          ))}
        </select>
        <div className='p-3'>
          <button
            onClick={() => handleUpdateStoreLayout()}
            className={`${selectedLayout !== layoutId ? 'inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'hidden'}`}
          >
            Asignar Layout
          </button>
        </div>
      </div>
      {loader
        ? <DspLoader />
        : (
          <div className='p-5 m-3'>
            {
          showLayout && showLayout.trays && showLayout.trays.map((tray, index) => {
            return (
              <div key={index} className='text-center border-b-2 border-gray-300 pb-5 mb-5 md:mb-8'>
                <div className='bg-d-dark-dark-purple'>
                  <h2 className='text-d-soft-purple text-medium font-bold py-2 mb-2 md:mb-8'>Bandeja {index + 1}</h2>
                </div>
                <div className='flex justify-center gap-6 '>
                  {
                    tray.columns.map((column, index) => {
                      const product = products?.filter((product) => product.productId === column.productId)
                      const maxQuantity = column.maxQuantity
                      return (
                        <div key={index} className='flex flex-col items-center'>
                          <figure className='flex justify-center'>
                            <img
                              className='w-auto max-w-[50px] h-[50px]'
                              src={product[0].metadata.imageUrl}
                              width={120}
                              height={120}
                              alt='Product'
                            />
                          </figure>
                          <h1 className='flex justify-center items-center text-d-title-purple font-bold m-1'>{product[0].productName}</h1>
                          <h1 className='flex justify-center items-center text-black-500 font-bold m-1 text-xs'>(Máximo: {maxQuantity} unidades)</h1>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            )
          })
        }
          </div>
          )}
    </div>
  )
}

export default LayoutDetail
