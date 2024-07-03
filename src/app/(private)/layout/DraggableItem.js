import React from 'react'
import { Draggable } from '@hello-pangea/dnd'

/**
 * DraggableItem component that represents an item that can be dragged.
 *
 * Utilizes the Draggable component from @hello-pangea/dnd to create a draggable item.
 *
 * @returns {JSX.Element} The DraggableItem component.
 */
function DraggableItem () {
  return (
    <Draggable draggableId='item' index={0}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        />
      )}
    </Draggable>
  )
}

export default DraggableItem
