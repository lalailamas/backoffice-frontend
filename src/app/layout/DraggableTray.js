// DraggableTray.js
import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import DraggableProduct from './DraggableProduct'

function DraggableTray ({ tray, trayIndex, products, selectedLayoutDetails, quantityChangeHandler, hanldeDeleteProduct, setAddProductModal }) {
  return (
    <div key={trayIndex} className='text-center border-gray-300'>
      <div className='bg-d-dark-dark-purple'>
        <h2 className='text-d-soft-purple text-sm font-bold p-4'>{`BANDEJA ${trayIndex + 1}`}</h2>
      </div>
      {tray && tray.columns && (
        <ul className='flex flex-row justify-center p-4 '>
          <Droppable droppableId={trayIndex.toString()} direction='horizontal'>
            {(provided) => (
              <div className='flex flex-row gap-2 overflow-auto' ref={provided.innerRef} {...provided.droppableProps}>
                {tray.columns.map((column, columnIndex) => {
                  const product = products.find((prod) => prod.productId === column.productId)
                  const trayNumber = trayIndex + 1
                  const combinedIndex = `${trayNumber.toString()}${columnIndex.toString()}`

                  return (
                    <DraggableProduct
                      key={columnIndex}
                      product={product}
                      combinedIndex={combinedIndex}
                      selectedLayoutDetails={selectedLayoutDetails}
                      quantityChangeHandler={quantityChangeHandler}
                      hanldeDeleteProduct={hanldeDeleteProduct}
                    />
                  )
                })}
                <button onClick={setAddProductModal}>
                  <div className='flex flex-col items-center items-stetch h-full justify-center text-center w-[120px]  border border-gray-200 rounded-lg shadow text-xs bg-white hover:bg-d-soft-soft-purple gap-4'>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-8 h-8'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                    </svg>
                    <span className='text-center'>Agregar Producto</span>
                  </div>
                </button>

                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </ul>
      )}
    </div>
  )
}
export default DraggableTray
