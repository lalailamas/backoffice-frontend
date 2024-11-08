import React, { useState, useEffect } from 'react'
import { putStockInventory } from '@/api/stock'
import ButtonCancel from '../common/buttons/ButtonCancel'
import ButtonPrimary from '../common/buttons/ButtonPrimary'

function QuantityModal ({
  handleOperationConfirmation,
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  handleConfirmationModal,
  showQuantityControls = false,
  initialQuantity,
  productId, storeId, updateProductQuantity
}) {
  const [quantity, setQuantity] = useState(0)

  const quantityChangeHandler = async () => {
    const stockData = {
      added: [],
      removed: []
    }
    const quantityDifference = quantity - initialQuantity
    if (quantityDifference > 0) {
      stockData.added.push({
        productId,
        quantity: quantityDifference
      })
    }
    if (quantityDifference < 0) {
      stockData.removed.push({
        productId,
        quantity: Math.abs(quantityDifference)
      })
    }
    try {
      const response = await putStockInventory(storeId, stockData)
      if (response) {
        setQuantity(quantity)
        handleConfirmationModal()
        updateProductQuantity(productId, quantity)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    if (initialQuantity !== undefined) {
      setQuantity(initialQuantity)
    }
  }, [initialQuantity])

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const increaseQuantity = () => {
    setQuantity(quantity + 1)
  }

  return (
    <div>
      <div id='YOUR_ID' className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

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
            {showQuantityControls && (
              <div className='mt-2 flex justify-center items-center'>
                <button
                  onClick={decreaseQuantity}
                  className='bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring rounded-l-md px-3 py-1'
                >
                  -
                </button>
                <span className='bg-gray-100 px-3 py-1'>{quantity}</span>
                <button
                  onClick={increaseQuantity}
                  className='bg-gray-200 text-gray-600 hover:bg-gray-300 focus:outline-none focus:ring rounded-r-md px-3 py-1'
                >
                  +
                </button>
              </div>
            )}
            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-4'>
              <ButtonPrimary text={confirmButtonText} onClick={quantityChangeHandler} type='submit' />
              <ButtonCancel onClick={handleConfirmationModal} />
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}

export default QuantityModal

// /api/reite/stores/DEV_CNV_002/inventory
// {
//     "added": [
//         {
//             "productId": "DEV_CNV_004",
//             "quantity": 1
//         }
//     ],
//     "removed": [
//         {
//             "productId": "DEV_CNV_007",
//             "quantity": 1
//         }
//     ]
// }
