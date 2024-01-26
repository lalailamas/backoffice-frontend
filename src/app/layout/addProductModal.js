'use client'
import React, { useState } from 'react'
import { SearchSelect, SearchSelectItem } from '@tremor/react'
import { swallError } from '@/utils/sweetAlerts'

function AddProductModal ({ products, handleShowProductModal, handleSaveNewProduct }) {
  const [newProduct, setNewProduct] = useState('')
  const [quantity, setQuantity] = useState(0)

  const handleNewQuantityChange = (e) => {
    setQuantity(e)
  }

  return (
    <div>
      <div id='YOUR_ID' className='fixed z-50 inset-0'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75' />
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
          <div
            className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6 h-96'
            role='dialog' aria-modal='true' aria-labelledby='modal-headline'
          >
            <div className='sm:flex sm:items-center'>
              <div
                className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-d-soft-soft-purple sm:mx-0 sm:h-10 sm:w-10'
              >
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z' />
                </svg>
              </div>
              <h3 className='text-lg mt-1 mx-2 font-medium text-gray-900' id='modal-headline'>
                Agregar Producto
              </h3>
            </div>
            <div className='flex flex-col gap-5'>
              <button onClick={handleShowProductModal} className='absolute top-0 right-0 p-2 cursor-pointer'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6 '>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                </svg>
              </button>
              <SearchSelect
                placeholder='Buscar producto...'
                className='p-2 m-2 rounded-full w-full'
                defaultValue=''
                value={newProduct}
                onValueChange={(value) => setNewProduct(value || '')}
              >
                {products?.length > 0 && products.map((product) => {
                  // console.log(product, 'product')
                  return (
                    <SearchSelectItem key={product.productId} value={product.productId}>
                      {product.productName}
                    </SearchSelectItem>

                  )
                })}
              </SearchSelect>
              <div className='relative'>

                <div className='mt-2 flex justify-center items-center '>

                  <button
                    onClick={() => setQuantity((prev) => Math.max(0, prev - 1))}
                    className='bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring rounded-l-md px-3 py-1'
                  >
                    -
                  </button>
                  <input
                    type='number'
                    className='outline-none text-center w-30 py-2 rounded-tremor-default focus:ring-2 transition duration-100 shadow-tremor-input focus:border-tremor-brand-subtle focus:ring-tremor-brand-muted dark:shadow-dark-tremor-input dark:focus:border-dark-tremor-brand-subtle dark:focus:ring-dark-tremor-brand-muted placeholder:text-tremor-content dark:placeholder:text-tremor-content bg-tremor-background dark:bg-dark-tremor-background hover:bg-tremor-background-muted dark:hover:bg-dark-tremor-background-muted text-tremor-content dark:text-dark-tremor-content border-tremor-border dark:border-dark-tremor-border appearance-none'
                    placeholder='Cantidad máxima'
                    onChange={(e) => handleNewQuantityChange(e.target.value)}
                    value={quantity || ''}
                  />
                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className='bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring rounded-r-md px-3 py-1'
                  >
                    +
                  </button>
                </div>
              </div>

            </div>
            <div className='flex flex-col gap-2 mt-24 sm:flex-row sm:justify-end'>
              <div className='flex gap-4'>
                <button
                  type='button'
                  onClick={handleShowProductModal}
                  className='btn border-none rounded-2xl bg-d-soft-soft-purple text-d-dark-dark-purple hover:bg-d-dark-dark-purple hover:text-d-white'
                >
                  Cancelar
                </button>
                <button
                  type='button'
                  onClick={() => {
                    if (!newProduct || quantity <= 0) {
                      swallError('Por favor, selecciona un producto y especifica una cantidad válida.')
                      return
                    }
                    handleSaveNewProduct(newProduct, quantity)
                  }}
                  className='btn border-none rounded-2xl bg-d-dark-dark-purple text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple disabled:text-d-white'
                >
                  Agregar Producto
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}
export default AddProductModal
