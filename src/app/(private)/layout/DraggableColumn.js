import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import DraggableItem from './DraggableItem'

/**
 * DraggableColumn component that allows horizontal dragging of items.
 *
 * Utilizes the Droppable component from @hello-pangea/dnd to create a droppable area.
 * The DraggableItem component represents the items that can be dragged within this droppable area.
 *
 * @returns {JSX.Element} The DraggableColumn component.
 */
function DraggableColumn () {
  return (
    <Droppable droppableId='column' direction='horizontal'>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.droppableProps}>
          <DraggableItem />
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  )
}

export default DraggableColumn
