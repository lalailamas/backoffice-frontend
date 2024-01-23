'use client'
import { getAllLayouts, createLayout } from '@/api/layout'
import React, { useState, useEffect } from 'react'
import DraggableTray from './DraggableTray'
import { DragDropContext } from '@hello-pangea/dnd'

import { getAllReiteData } from '@/api/product/reite'
import { swallError, swallInfo } from '@/utils/sweetAlerts'
import AddProductModal from './addProductModal'

function Layout () {
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState('')
  // console.log(selectedLayout, 'layout selected')
  const [selectedLayoutDetails, setSelectedLayoutDetails] = useState(null)
  // console.log(selectedLayoutDetails, 'detalles de layout seleccionado')

  const [products, setProducts] = useState([])
  //   console.log(products, 'productos')
  const [newLayoutName, setNewLayoutName] = useState('')
  const [addProductModal, setAddProductModal] = useState(false)

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
  const hanldeDeleteProduct = (productId) => {
    console.log('Eliminar producto:', productId)
    const newLayout = { ...selectedLayoutDetails } // Crear una copia del objeto

    newLayout.trays.forEach((tray) => {
      tray.columns = tray.columns.filter((column) => column.productId !== productId)
    })

    setSelectedLayoutDetails(newLayout)
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

  const handleSaveNewLayout = async () => {
    if (newLayoutName.length > 0) {
      const data = {
        name: newLayoutName,
        layout: selectedLayoutDetails.trays
      }

      try {
        const response = await createLayout(data)
        swallInfo('Layout creado exitosamente')
        // TODO: REDIRIGIR DONDE SE MUESTRE EL LAYOUT CREADO
        console.log(response, 'respuesta crear layout')
      } catch (error) {
        swallError('Error al crear Layout')
        console.error(error, 'Error al crear Layout')
      }
    } else {
      swallError('El nombre del nuevo layout no puede estar vacío')
      console.error('El nombre del nuevo layout no puede estar vacío')
    }
  }
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
    <div>
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
                hanldeDeleteProduct={hanldeDeleteProduct}
                setAddProductModal={setAddProductModal}
              />
            ))}
          </div>

        </div>
        <div className='flex justify-center pb-10'>
          <button
            type='button'
            onClick={handleSaveNewLayout}
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            Crear Nuevo Layout
            <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
            </svg>
          </button>
        </div>
      </DragDropContext>
      {addProductModal && (
        <AddProductModal products={products} />
      )}
    </div>
  )
}
export default Layout
