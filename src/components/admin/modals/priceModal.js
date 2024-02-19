// PriceModal.jsx
import React, { useState, useEffect } from 'react'
import { patchReitePrices } from '@/api/product/reite'
import ButtonCancel from '../common/buttons/ButtonCancel'

function PriceModal ({
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  handleConfirmationModal,
  productId,
  storeId,
  initialPrice,
  updateProductPrice,
  brand,
  name
}) {
  const [price, setPrice] = useState(initialPrice !== undefined ? initialPrice : 0)

  useEffect(() => {
    console.log('initialPrice en useEffect:', initialPrice)
    if (initialPrice !== undefined) {
      setPrice(price)
    }
  }, [initialPrice])

  const priceChangeHandler = async () => {
    console.log('Precio actual antes de la actualización:', price)
    const priceData = {
      brand,
      name,
      price,
      storeId
    }

    try {
      console.log(priceData, 'priceData')
      const response = await patchReitePrices(priceData, productId)
      console.log(response, 'respuesta patch')

      if (response) {
        setPrice(price)
        handleConfirmationModal()
        updateProductPrice(productId, price)
      } else {
        console.error('Error en la actualización de precio:', response.message)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <div id='YOUR_ID' className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75' />
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
          <div
            className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
            role='dialog' aria-modal='true' aria-labelledby='modal-headline'
          >
            <div className='sm:flex sm:items-start'>

              <div
                className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-d-soft-soft-purple sm:mx-0 sm:h-10 sm:w-10'
              >
                <svg
                  className='h-6 w-6 text-d-dark-dark-purple' xmlns='http://www.w3.org/2000/svg' fill='none'
                  viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'
                >
                  <path
                    strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                  {title}
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    {message}
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-2 flex justify-center items-center'>
              <label htmlFor='priceInput' className='sr-only'>
                Precio
              </label>
              <div className='relative'>
                <span className='absolute inset-y-0 left-0 flex items-center pl-2 text-gray-700'>$</span>
                <input
                  type='number'
                  id='priceInput'
                  className='bg-gray-100 px-8 py-1 w-28 border border-1 pl-8'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
              <button
                type='button' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-d-dark-dark-purple font-medium hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple text-white sm:ml-3 sm:w-auto sm:text-sm'
                onClick={priceChangeHandler}
              >
                {confirmButtonText}
              </button>
              <ButtonCancel onClick={handleConfirmationModal} />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default PriceModal
