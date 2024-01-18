'use client'
import { getAllLayouts } from '@/api/layout'
import React, { useState, useEffect } from 'react'
// import DspLoader from '@/components/admin/common/loader'

import { getAllReiteData } from '@/api/product/reite'

function Layout () {
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState('')
  //   console.log(selectedLayout, 'layout selected')
  const [selectedLayoutDetails, setSelectedLayoutDetails] = useState(null)

  const [products, setProducts] = useState([])
  //   console.log(products, 'productos')

  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const response = await getAllLayouts()
        // console.log(response, 'respuesta todos los layouts')
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
              <h2 className='text-d-soft-purple text-sm font-bold p-4'>BANDEJA {index + 1}</h2>
            </div>
            {tray && tray.columns && (
              <ul className='flex flex-row gap-2 justify-center overflow-x-auto p-4'>
                {tray.columns.map((column, index) => {
                  const product = products.find((prod) => prod.productId === column.productId)
                  //   console.log(product, 'aqui producto')
                  return (
                    <li key={index}>
                      {product
                        ? (

                          <section className='flex flex-col items-end justify-end w-[120px] h-[180px] border border-gray-200 rounded-lg shadow text-xs'>

                            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-10 h-10'>
                              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                            </svg>
                            <div className='px-2 pt-2 flex flex-col items-center justify-center h-full self-center'>
                              <img
                                className='max-w-[30px] h-[30px] mx-auto self-center'
                                src={product.metadata.imageUrl}
                                width={120}
                                height={120}
                                alt='Product'
                              />
                              <p className='text-gray-600 dark:text-gray-300 text-xs text-center'>{product.productName}</p>
                            </div>

                            <div className='flex flex-row pt-10'>
                              <button className='btn-sm join-item hover:bg-d-soft-soft-purple rounded-full'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                                  <g clipPath='url(#clip0_1384_742)'>
                                    <circle cx='12' cy='12' r='12' fill='#8480C0' />
                                    <path d='M7 12H17' stroke='#DCDAD8' strokeLinecap='round' strokeLinejoin='round' />
                                  </g>
                                  <defs>
                                    <clipPath id='clip0_1384_742'>
                                      <rect width='24' height='24' fill='white' />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>

                              <p className='flex items-center justify-center font-bold text-d-dark-dark-purple'>{selectedLayoutDetails.maxQuantities[column.productId]}</p>

                              <button className='btn-sm join-item hover:bg-d-soft-soft-purple rounded-full'>
                                <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                                  <g clipPath='url(#clip0_1384_744)'>
                                    <circle cx='12' cy='12' r='12' fill='#7A36E6' />
                                    <path d='M12 7V17M7 12H17' stroke='white' strokeLinecap='round' strokeLinejoin='round' />
                                  </g>
                                  <defs>
                                    <clipPath id='clip0_1384_744'>
                                      <rect width='24' height='24' fill='white' />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </div>

                          </section>

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
