// DraggableColumn.js
import React from 'react'
import { Droppable } from '@hello-pangea/dnd'
import DraggableItem from './DraggableItem'

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
