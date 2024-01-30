'use client'
// DraggableProduct.js
import React, { useEffect, useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'

function DraggableProduct ({ product, combinedIndex, selectedLayoutDetails, quantityChangeHandler, handleDeleteProduct }) {
  const index = parseInt(combinedIndex, 10)
  const [quantity, setQuantity] = useState(product.maxQuantity)
  // console.log(quantity, product.productId, 'cantidad')

  useEffect(() => {
    const currentTray = selectedLayoutDetails.trays.find((tray) =>
      tray.columns.some((column) => column.productId === product.productId)
    )
    const currentColumn = currentTray?.columns.find(
      (column) => column.productId === product.productId
    )
    setQuantity(currentColumn?.maxQuantity || null)
  }, [selectedLayoutDetails.trays, product.productId])

  const handleIncrease = () => {
    setQuantity(prevQuantity => {
      const newQuantity = prevQuantity + 1
      quantityChangeHandler(product.productId, newQuantity)
      return newQuantity
    })
  }

  const handleDecrease = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => {
        const newQuantity = prevQuantity - 1
        quantityChangeHandler(product.productId, newQuantity)
        return newQuantity
      })
    }
  }

  return (
    <>
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

                <section className='flex flex-col items-end justify-end w-[100px] h-[140px] border border-gray-200 rounded-lg shadow text-xs bg-white hover:border-b-2 border-transparent transition-all duration-300'>

                  <div className='px-2 flex flex-col h-full'>
                    <div className='flex justify-end align-end'>
                      <button onClick={() => handleDeleteProduct(product.productId)}>
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-4 h-4 '>
                          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                        </svg>
                      </button>
                    </div>
                    <div className='flex flex-col items-center' style={{ minHeight: '60px' }}>
                      <img
                        className='max-w-[25px] h-[25px] mx-auto'
                        src={product.metadata.imageUrl}
                        width={100}
                        height={100}
                        alt='Product'
                      />
                      <p className='text-gray-600 dark:text-gray-300 text-xs text-center'>
                        {product.productName.length > 20
                          ? `${product.productName.substring(0, 20)}...`
                          : product.productName}
                      </p>
                    </div>
                  </div>

                  <div className='flex flex-row pt-8 items-center align-center justify-center'>
                    <button onClick={handleDecrease} className='btn-sm join-item hover:bg-d-soft-soft-purple rounded-full'>
                      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'>
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

                    <button
                      onClick={handleIncrease}
                      className='btn-sm join-item hover:bg-d-soft-soft-purple rounded-full'
                    >
                      <svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none'>
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

    </>
  )
}

export default DraggableProduct
