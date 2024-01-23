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
  // console.log(selectedLayoutDetails, 'detalles de layout seleccionado')

  const [products, setProducts] = useState([])
  //   console.log(products, 'productos')
  const [newLayoutName, setNewLayoutName] = useState('')

  const quantityChangeHandler = (productId, quantity) => {
    selectedLayoutDetails.trays.forEach((tray) => {
      tray.columns.forEach((column) => {
        if (column.productId === productId) {
          column.maxQuantity = quantity
        }
      })
    })
    setSelectedLayoutDetails({ ...selectedLayoutDetails })
  }

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
    if (!result.destination) return
    const updatedLayoutDetails = { ...selectedLayoutDetails }
    const sourceTray = updatedLayoutDetails.trays[parseInt(result.source.droppableId)]
    if (!sourceTray) return
    const trayColumns = [...sourceTray.columns]
    const startIndex = result.source.index % 10
    const endIndex = result.destination.index % 10
    const [reorderedColumn] = trayColumns.splice(startIndex, 1)
    trayColumns.splice(endIndex, 0, reorderedColumn)
    sourceTray.columns = trayColumns
    setSelectedLayoutDetails(updatedLayoutDetails)
  }

  const handleNewLayoutNameChange = (value) => {
    setNewLayoutName(value)
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className='p-5'>
        <div className='flex justify-center text-center p-5'>
          <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Administra Layout</h2>
        </div>
        <h3 className='text-center'>En esta sección podrás crear un nuevo layout basándote en plantillas existentes</h3>

        <div className='flex justify-center items-center p-5'>
          <div className='flex flex-row items-center gap-4'>
            <select
              className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
              onChange={(e) => handleLayoutChange(e.target.value)}
              value={selectedLayout}
            >
              <option value='0'>Selecciona un layout existente</option>
              {layouts && layouts.map((layout) => (
                <option key={layout.id}>
                  {layout.name}
                </option>
              ))}
            </select>
            <input
              type='text'
              className='rounded-full w-full md:max-w-xs border border-black px-4 py-2'
              placeholder='Nombre de nuevo layout'
              onChange={(e) => handleNewLayoutNameChange(e.target.value)}
              value={newLayoutName}
            />
            {/* <button
              className='bg-blue-500 text-white rounded-full px-4 py-2'
              onClick={handleSaveNewLayout}
            >
              Guardar
            </button> */}
          </div>
        </div>

        <div className={`${selectedLayoutDetails !== '0' ? 'flex flex-col items-center justify-center' : 'hidden'}`} />
        <div className='p-10  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
          <h5 className='text-2xl text-center mb-3 font-bold text-gray-900 dark:text-white'>{selectedLayout}</h5>
          {selectedLayoutDetails && selectedLayoutDetails.trays && selectedLayoutDetails.trays.map((tray, trayIndex) => (
            <DraggableTray
              key={trayIndex}
              tray={tray}
              trayIndex={trayIndex}
              products={products}
              selectedLayoutDetails={selectedLayoutDetails}
              quantityChangeHandler={quantityChangeHandler}

            />
          ))}
        </div>

      </div>
    </DragDropContext>
  )
}
export default Layout
