'use client'
import React, { useEffect, useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
import DraggableProduct from './DraggableProduct'
import ConfirmationModal from '../restock/confirmationModal'
import { swallError } from '@/utils/sweetAlerts'

function DraggableTray ({ tray, trayIndex, products, selectedLayoutDetails, quantityChangeHandler, handleDeleteProduct, handleShowProductModal, handleDeleteTray, handleDeleteTrayConfirmed }) {
  const [droppableDirection, setDroppableDirection] = useState(
    window.innerWidth <= 431 ? 'vertical' : 'horizontal'
  )
  const [isConfirmationModalVisible, setConfirmationModalVisible] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setDroppableDirection(window.innerWidth <= 431 ? 'vertical' : 'horizontal')
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const handleRemoveTray = () => {
    handleDeleteTray(trayIndex)
    setConfirmationModalVisible(true)
  }

  return (
    <div key={trayIndex} className='text-center border-gray-300'>
      <div className='bg-d-dark-dark-purple'>
        <h2 className='text-d-soft-purple text-sm font-bold p-4'>{`BANDEJA ${trayIndex + 1}`}</h2>

      </div>
      {tray && tray.columns && (
        <ul className='flex flex-row justify-start p-4'>
          <Droppable droppableId={trayIndex.toString()} direction={droppableDirection}>
            {(provided) => (
              <div className='grid grid-cols-10 max-[431px]:flex flex-col' ref={provided.innerRef} {...provided.droppableProps}>
                {tray?.columns.map((column, columnIndex) => {
                  const product = products.find((prod) => prod.productId === column.productId)
                  // console.log(product, 'product del dragglableTray')
                  const trayNumber = trayIndex + 1
                  const combinedIndex = `${trayNumber.toString()}${columnIndex.toString()}`
                  const maxQuantity = column.maxQuantity
                  // console.log(product, maxQuantity, 'DRAGGLABLETRAY')

                  return (

                    <DraggableProduct
                      key={columnIndex}
                      product={product}
                      combinedIndex={combinedIndex}
                      selectedLayoutDetails={selectedLayoutDetails}
                      quantityChangeHandler={quantityChangeHandler}
                      handleDeleteProduct={handleDeleteProduct}
                      maxQuantity={maxQuantity}
                    />

                  )
                })}

                {provided.placeholder}
              </div>
            )}
          </Droppable>

          <button
            onClick={(e) => {
              e.stopPropagation()
              if (tray.columns.length > 9) {
                swallError('El máximo permitido es 10 productos por bandeja')
              } else {
                handleShowProductModal(trayIndex)
              }
            }}
            className='ml-auto max-[431px]:flex flex-col'
          >
            <div className='flex flex-col items-center justify-center text-center w-[100px] h-[140px] border border-gray-200 rounded-lg shadow text-xs bg-white hover:bg-d-soft-soft-purple gap-4'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-8 h-8'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
              </svg>
              <span className='text-center'>Agregar Producto</span>
            </div>
          </button>

        </ul>

      )}

      <button
        onClick={handleRemoveTray}
        className='w-full'
      >
        <div className='flex flex-row text-xs text-red-500 items-center justify-center text-center p-2 mb-4 border border-gray-200 rounded-lg shadow  bg-white hover:bg-d-soft-soft-purple gap-4'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M5 12h14' />
          </svg>
          <span> Eliminar Bandeja</span>
        </div>
      </button>
      {isConfirmationModalVisible && (
        <ConfirmationModal
          title='Eliminar Bandeja'
          message={`¿Estás seguro de que deseas eliminar la BANDEJA ${trayIndex + 1}?`}
          confirmButtonText='Eliminar'
          cancelButtonText='Cancelar'
          handleOperationConfirmation={() => {
            handleDeleteTray()
            handleDeleteTrayConfirmed()
            setConfirmationModalVisible(false)
          }}
          handleConfirmationModal={() => setConfirmationModalVisible(false)}
        />
      )}
    </div>

  )
}

export default DraggableTray
