// DraggableTray.js
import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import DraggableProduct from './DraggableProduct'

function DraggableTray ({ tray, trayIndex, products, selectedLayoutDetails, quantityChangeHandler }) {
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
                    />
                  )
                })}
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
