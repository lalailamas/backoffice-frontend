'use client'
// DraggableProduct.js
import React, { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'

function DraggableProduct ({ product, combinedIndex, selectedLayoutDetails, quantityChangeHandler }) {
  const index = parseInt(combinedIndex, 10)
  // console.log(selectedLayoutDetails, 'SelectedLayoutDetails del DraggableProducts')
  // console.log(product, 'product del DraggableProducts')
  const [quantity, setQuantity] = useState(selectedLayoutDetails.maxQuantities[product.productId])

  const handleIncrease = () => {
    setQuantity(quantity + 1)
    quantityChangeHandler(product.productId, (quantity + 1))
  }

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
      quantityChangeHandler(product.productId, (quantity - 1))
    }
  }
  return (
    <Draggable
      key={combinedIndex}
      draggableId={combinedIndex}
      index={index}
    >
      {(provided) => (
        <li
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {product
            ? (

              <section className='flex flex-col items-end justify-end w-[120px] h-[180px] border border-gray-200 rounded-lg shadow text-xs bg-white'>
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
                  <button onClick={handleDecrease} className='btn-sm join-item hover:bg-d-soft-soft-purple rounded-full'>
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

                  <p className='flex items-center justify-center font-bold text-d-dark-dark-purple'>{quantity}</p>

                  <button onClick={handleIncrease} className='btn-sm join-item hover:bg-d-soft-soft-purple rounded-full'>
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
            : (
              <p>No se encontró el producto</p>
              )}
        </li>
      )}
    </Draggable>
  )
}

export default DraggableProduct
