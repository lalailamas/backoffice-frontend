'use client'
import { getAllLayouts, createLayout } from '@/api/layout'
import React, { useState, useEffect } from 'react'
import DraggableTray from './DraggableTray'
import { DragDropContext } from '@hello-pangea/dnd'
import { getAllReiteData } from '@/api/product/reite'
import { swallError, swallInfo } from '@/utils/sweetAlerts'
import AddProductModal from './addProductModal'
import { useRouter } from 'next/navigation'

function Layout () {
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState('')
  const [selectedLayoutDetails, setSelectedLayoutDetails] = useState(null)
  const [products, setProducts] = useState([])
  const [newProductTrayIndex, setNewProductTrayIndex] = useState(null)
  const [newLayoutName, setNewLayoutName] = useState('')
  const [showProductModal, setShowProductModal] = useState(false)
  const [selectedTrayToDelete, setSelectedTrayToDelete] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const fetchLayouts = async () => {
      try {
        const response = await getAllLayouts()
        setLayouts(response)
      } catch (error) {
        console.error('Error al obtener los layouts:', error)
      }
    }

    fetchLayouts()
  }, [])
  useEffect(() => {}, [selectedLayoutDetails])

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
  }, [selectedLayout, layouts])

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

  const handleDeleteProduct = (productId, combinedIndex) => {
    console.log(productId, combinedIndex, 'entreee')
    const columnIndex = (combinedIndex % 10)
    const trayIndex = (Math.floor((combinedIndex / 10) % 10)) - 1
    console.log(trayIndex, 'trayIndex')
    console.log(columnIndex, 'columnIndex')

    const newLayout = { ...selectedLayoutDetails }
    newLayout.trays.forEach((tray, index) => {
      if (index === trayIndex) {
        tray.columns = tray.columns.filter((column, colIndex) => {
          if (column.productId === productId && colIndex === columnIndex) {
            return false
          }
          return true
        })
      }
    })
    setSelectedLayoutDetails(newLayout)
    console.log('Updated Layout Details:', newLayout)
  }

  const handleSaveNewProduct = (newProduct, quantity) => {
    const quantityNumber = parseInt(quantity)
    const productLayout = {
      productId: newProduct,
      maxQuantity: quantityNumber
    }
    const newLayout = { ...selectedLayoutDetails }
    newLayout.trays.forEach((tray, index) => {
      if (index === newProductTrayIndex) {
        tray.columns.push(productLayout)
      }
    })

    setSelectedLayoutDetails(newLayout)
    console.log(newLayout, 'newLayout')
    setShowProductModal(false)
  }

  // Crear nuevo layout
  const handleSaveNewLayout = async () => {
    if (newLayoutName.length > 0) {
      const data = {
        name: newLayoutName,
        layout: selectedLayoutDetails.trays
      }

      try {
        const response = await createLayout(data)
        swallInfo('Layout creado exitosamente')
        // if (response)
        // router.push(`/layout/edit/${response.id}`)
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
  const handleShowProductModal = (trayIndex) => {
    setNewProductTrayIndex(trayIndex)
    return setShowProductModal(!showProductModal)
  }

  const handleDragEnd = (result) => {
    if (!result.destination) return
    const updatedLayoutDetails = { ...selectedLayoutDetails }
    // console.log(updatedLayoutDetails, 'layout actualizado')

    const sourceTray = updatedLayoutDetails.trays[parseInt(result.source.droppableId)]
    // console.log(sourceTray, 'bandeja source')

    // const destinationTrayIndex = parseInt(result.destination.droppableId, 10)
    // console.log(destinationTrayIndex, 'destination bandeja index')
    // console.log(result.destination.droppableId, 'droppableID')

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

  const handleDeleteTray = (trayIndex) => {
    const trayToDelete = selectedLayoutDetails.trays[trayIndex]
    setSelectedTrayToDelete({ tray: trayToDelete, index: trayIndex })
  }

  const handleDeleteTrayConfirmed = () => {
    if (selectedTrayToDelete) {
      const updatedTrays = [...selectedLayoutDetails.trays]
      updatedTrays.splice(selectedTrayToDelete.index, 1)
      setSelectedLayoutDetails({
        ...selectedLayoutDetails,
        trays: updatedTrays
      })
      setSelectedTrayToDelete(null)
    }
  }

  const handleAddTray = () => {
    const newTray = {
      columns: []
    }
    setSelectedLayoutDetails((prevDetails) => ({
      ...prevDetails,
      trays: [...prevDetails.trays, newTray]
    }))
    setSelectedTrayToDelete({ tray: newTray, index: selectedLayoutDetails.trays.length })
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className='p-5'>
          <div className='flex justify-center text-center p-5'>
            <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Crear Layout</h2>
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
                className='rounded-full w-full md:max-w-xs border border-gray-300 px-4 py-1'
                placeholder='Nombre de Nuevo Layout'
                onChange={(e) => handleNewLayoutNameChange(e.target.value)}
                value={newLayoutName}
              />
            </div>
          </div>

          <div className={`${selectedLayoutDetails !== '0' ? 'flex flex-col items-center justify-center' : 'hidden'}`} />
          <div className='p-10  border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 '>
            <h5 className='text-2xl text-center mb-3 font-bold text-gray-900 dark:text-white'>{selectedLayout}</h5>
            {selectedLayoutDetails && selectedLayoutDetails.trays && selectedLayoutDetails.trays.map((tray, trayIndex) => (
              <React.Fragment key={trayIndex}>

                <DraggableTray
                  tray={tray}
                  trayIndex={trayIndex}
                  products={products}
                  selectedLayoutDetails={selectedLayoutDetails}
                  quantityChangeHandler={quantityChangeHandler}
                  handleDeleteProduct={handleDeleteProduct}
                  handleShowProductModal={handleShowProductModal}
                  handleDeleteTray={() => handleDeleteTray(trayIndex)}
                  handleDeleteTrayConfirmed={handleDeleteTrayConfirmed}
                />

              </React.Fragment>
            ))}
          </div>

        </div>
        <button
          onClick={handleAddTray}
          className='w-full px-4'
        >
          <div className='flex flex-row text-xs items-center justify-center text-center p-2 mb-4 border border-gray-200 rounded-lg shadow  bg-white hover:bg-d-soft-soft-purple gap-4'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
            </svg>

            <span> Agregar Bandeja</span>
          </div>
        </button>
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
      {showProductModal && (
        <AddProductModal
          products={products}
          handleShowProductModal={handleShowProductModal}
          handleSaveNewProduct={handleSaveNewProduct}
        />
      )}
    </div>
  )
}
export default Layout
