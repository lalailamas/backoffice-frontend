'use client'
import { getAllLayouts } from '@/api/layout'
import React, { useState, useEffect } from 'react'
// import DspLoader from '@/components/admin/common/loader'

import { getAllReiteData } from '@/api/product/reite'

function Layout () {
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState('')
  console.log(selectedLayout, 'layout selected')
  const [selectedLayoutDetails, setSelectedLayoutDetails] = useState(null)

  const [products, setProducts] = useState([])
  console.log(products, 'productos')

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getAllReiteData()
        setProducts(productsResponse)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const layoutDetails = layouts.find(layout => layout.name === selectedLayout)
    console.log(layoutDetails, 'detalles de layout')
    setSelectedLayoutDetails(layoutDetails || null)
  }, [selectedLayout, layouts])

  const handleLayoutChange = (e) => {
    setSelectedLayout(e)
  }

  return (
    <div className='p-5'>
      <div className='flex justify-center text-center p-5'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Administra Layout</h2>
      </div>

      <div className='flex justify-center items-center p-5'>
        <div className='flex flex-row items-center'>
          <select
            className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
            onChange={(e) => handleLayoutChange(e.target.value)}
            value={selectedLayout}
          >
            <option value='0'>Selecciona un layout</option>
            {layouts && layouts.map((layout) => (
              <option key={layout.id}>
                {layout.name}
              </option>
            ))}
          </select>

        </div>
      </div>
      <div className={`${selectedLayoutDetails !== '0' ? 'flex flex-col items-center justify-center' : 'hidden'}`} />
      <div className='p-10 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
        <h5 className='text-2xl text-center mb-3 font-bold  text-gray-900 dark:text-white'>{selectedLayout}</h5>
        {selectedLayoutDetails && selectedLayoutDetails.trays && selectedLayoutDetails.trays.map((tray, index) => (
          <div key={index} className='text-center border-gray-300'>
            <div className='bg-d-dark-dark-purple'>
              <h2 className='text-d-soft-purple text-sm font-bold'>BANDEJA {index + 1}</h2>
            </div>
            {tray && tray.columns && (
              <ul className='flex flex-row gap-2 justify-center overflow-x-auto'>
                {tray.columns.map((column, index) => {
                  const product = products.find((prod) => prod.productId === column.productId)
                  console.log(product, 'aqui producto')
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
