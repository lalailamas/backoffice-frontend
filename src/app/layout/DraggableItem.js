// DraggableItem.js
import React from 'react'
import { Draggable } from '@hello-pangea/dnd'

function DraggableItem () {
  return (
    <Draggable draggableId='item' index={0}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {/* Contenido del elemento arrastrable */}
        </div>
      )}
    </Draggable>
  )
}

export default DraggableItem
