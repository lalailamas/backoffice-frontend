'use client'
import { getAllLayouts } from '@/api/layout'
import React, { useState, useEffect } from 'react'
import DraggableTray from './DraggableTray'
import { DragDropContext } from '@hello-pangea/dnd'

import { getAllReiteData } from '@/api/product/reite'

function Layout () {
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState('')
  // console.log(selectedLayout, 'layout selected')
  const [selectedLayoutDetails, setSelectedLayoutDetails] = useState(null)

  const [products, setProducts] = useState([])
  //   console.log(products, 'productos')

  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const response = await getAllLayouts()
        // console.log(response, 'respuesta todos los layouts')
        setLayouts(response)
      } catch (error) {
        console.error('Error al obtener los layouts:', error)
      }
    }

    fetchLayouts()
  }, [])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsResponse = await getAllReiteData()
        setProducts(productsResponse)
      } catch (error) {
        console.error('Error al obtener los productos:', error)
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    const layoutDetails = layouts.find(layout => layout.name === selectedLayout)
    // console.log(layoutDetails, 'detalles de layout')
    setSelectedLayoutDetails(layoutDetails || null)
  }, [selectedLayout, layouts, selectedLayoutDetails])

  const handleLayoutChange = (e) => {
    setSelectedLayout(e)
  }
  const handleDragEnd = (result) => {
    console.log(result, 'resultado') // 20 -> 22
    // {draggableId: '20',
    //  type: 'DEFAULT',
    //  source: {droppableId: '1', index: 22},
    //  reason: 'DROP',
    //  mode: 'FLUID'
    //  combine: nulldestination:
    //  draggableId: "20"mode: "FLUID"reason: "DROP"source:
    //   {index: 20, droppableId: '1'}type: "DEFAULT"[[Prototype]]: Object 'resultado'
    if (!result.destination) return

    const updatedLayoutDetails = { ...selectedLayoutDetails }

    // Verifica que la bandeja exista antes de intentar acceder a sus columnas
    const sourceTray = updatedLayoutDetails.trays[parseInt(result.source.droppableId)]
    console.log(sourceTray, 'source tray')
    if (!sourceTray) return // Puedes manejar esto según tus necesidades

    const trayColumns = [...sourceTray.columns]
    console.log(trayColumns, 'tray columns')
    const startIndex = result.source.index % 10 // 0
    const endIndex = result.destination.index % 10 // 2
    console.log(startIndex, 'start index')
    console.log(endIndex, 'end index')

    const [reorderedColumn] = trayColumns.splice(startIndex, 1)
    trayColumns.splice(endIndex, 0, reorderedColumn)

    // Actualiza las columnas de la bandeja
    sourceTray.columns = trayColumns

    setSelectedLayoutDetails(updatedLayoutDetails)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='p-5'>
        <div className='flex justify-center text-center p-5'>
          <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Administra Layout</h2>
        </div>

        <div className='flex justify-center items-center p-5'>
          <div className='flex flex-row items-center'>
            <select
              className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
              onChange={(e) => handleLayoutChange(e.target.value)}
              value={selectedLayout}
            >
              <option value='0'>Selecciona un layout</option>
              {layouts && layouts.map((layout) => (
                <option key={layout.id}>
                  {layout.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className={`${selectedLayoutDetails !== '0' ? 'flex flex-col items-center justify-center' : 'hidden'}`} />
        <div className='p-10  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>
          <h5 className='text-2xl text-center mb-3 font-bold text-gray-900 dark:text-white'>{selectedLayout}</h5>
          {selectedLayoutDetails && selectedLayoutDetails.trays && selectedLayoutDetails.trays.map((tray, trayIndex) => (
            <DraggableTray
              key={trayIndex}
              tray={tray}
              trayIndex={trayIndex}
              products={products}
              selectedLayoutDetails={selectedLayoutDetails}

            />
          ))}
        </div>

      </div>
    </DragDropContext>
  )
}
export default Layout
