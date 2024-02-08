'use client'
import { getAllLayouts, createLayout, editLayout, deleteLayout, getLayout } from '@/api/layout'
import React, { useState, useEffect } from 'react'
import DraggableTray from './DraggableTray'
import { DragDropContext } from '@hello-pangea/dnd'
import { getAllReiteData } from '@/api/product/reite'
import { swallError, swallInfo } from '@/utils/sweetAlerts'
import AddProductModal from './addProductModal'
import TabsComponentLayout from './tabs'
import ConfirmationModal from '@/components/admin/modals/confirmationModal'

function Layout () {
  const [layouts, setLayouts] = useState([])
  const [selectedLayout, setSelectedLayout] = useState('')
  const [selectedLayoutDetails, setSelectedLayoutDetails] = useState(null)
  const [products, setProducts] = useState([])
  const [newProductTrayIndex, setNewProductTrayIndex] = useState(null)
  const [newLayoutName, setNewLayoutName] = useState('')
  const [showProductModal, setShowProductModal] = useState(false)
  const [showLayoutModal, setShowLayoutModal] = useState(false)
  const [selectedTrayToDelete, setSelectedTrayToDelete] = useState(null)
  const [editingLayoutName, setEditingLayoutName] = useState('')
  // const titleRef = useRef(null)
  const [tabsState, setTabsState] = useState([
    { id: 'tabs-home', name: 'Crear Layout', active: true },
    { id: 'tabs-message', name: 'Editar Layout', active: false }
  ])
  // console.log('Updated tabs state:', tabsState)

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
    setSelectedLayoutDetails(layoutDetails || null)
    if (tabsState[1].active && layoutDetails) {
      setEditingLayoutName(layoutDetails.name)
    }
  }, [selectedLayout, layouts, tabsState])

  const quantityChangeHandler = (productId, quantity, combinedIndex) => {
    const columnIndex = (combinedIndex % 10)
    const trayIndex = (Math.floor((combinedIndex / 10) % 10)) - 1
    const newLayout = { ...selectedLayoutDetails }

    newLayout.trays.forEach((tray, index) => {
      if (index === trayIndex) {
        tray.columns.forEach((column, colIndex) => {
          if (colIndex === columnIndex && column.productId === productId) {
            column.maxQuantity = quantity
          }
        })
      }
    })
    setSelectedLayoutDetails(newLayout)
  }

  const handleDeleteProduct = (productId, combinedIndex) => {
    const columnIndex = (combinedIndex % 10)
    const trayIndex = (Math.floor((combinedIndex / 10) % 10)) - 1
    // console.log(trayIndex, 'trayIndex')
    // console.log(columnIndex, 'columnIndex')

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
    // console.log('Updated Layout Details:', newLayout)
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
        console.log(response.id, 'id')

        // Actualizar la lista de diseños después de la creación exitosa
        const updatedLayouts = await getAllLayouts()
        setLayouts(updatedLayouts)

        // Actualizar el estado de las pestañas y el diseño seleccionado
        setTabsState([
          { id: 'tabs-home', name: 'Crear Layout', active: false },
          { id: 'tabs-message', name: 'Editar Layout', active: true }
        ])

        // Establecer el nuevo diseño como el diseño seleccionado
        setSelectedLayout(response.name)
        setNewLayoutName(response.name) // También puedes establecer el nombre en el input directamente si es necesario

        // Obtener los detalles actualizados del diseño creado
        const updatedLayoutDetails = await getLayout(response.id)

        // Actualizar el estado selectedLayoutDetails con los nuevos detalles
        setSelectedLayoutDetails(updatedLayoutDetails)
        // Desplazar la página hacia la parte superior
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        })
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

  // Editar layout
  const handleEditLayout = async () => {
    await selectedLayoutDetails.trays.forEach((tray) => {
      tray.columnsQuantity = tray.columns.length
    })

    if (editingLayoutName.length > 0) {
      const data = {
        name: editingLayoutName,
        layout: selectedLayoutDetails.trays,
        prices: {}
      }

      try {
        const response = await editLayout(data, selectedLayoutDetails.id)

        if (response) {
          setTabsState([
            { id: 'tabs-home', name: 'Crear Layout', active: false },
            { id: 'tabs-message', name: 'Editar Layout', active: true }
          ])
          setSelectedLayout(response.name)
          // Obtener los detalles actualizados del diseño creado
          const updatedLayoutDetails = await getLayout(response.id)

          // Actualizar el estado selectedLayoutDetails con los nuevos detalles
          setSelectedLayoutDetails(updatedLayoutDetails)

          // Esperar 500 milisegundos (0.5 segundos) antes de desplazar la página hacia arriba
          setTimeout(() => {
            document.getElementById('DivId').scrollIntoView({ behavior: 'smooth' })
          }, 500)
        }
        console.log(response, 'respuesta editar layout')
        // swallInfo('Layout editado exitosamente')
      } catch (error) {
        swallError('Error al editar Layout')
        console.error(error, 'Error al editar Layout')
      }
    }
  }

  // Eliminar layout
  const handleDeleteClick = () => {
    setShowLayoutModal(true)
  }
  // delete layout
  const handleDeleteConfirmation = async () => {
    try {
      await deleteLayout(selectedLayoutDetails.id)
      swallInfo('Layout eliminado exitosamente')
      setShowLayoutModal(false)

      // Actualizar la lista de diseños después de la eliminación exitosa
      const updatedLayouts = await getAllLayouts()
      setLayouts(updatedLayouts)

      // Limpiar el input del nombre del tab editar layout
      setEditingLayoutName('')

      // Actualizar el estado para que el tab de crear esté activo
      setTabsState([
        { id: 'tabs-home', name: 'Crear Layout', active: true },
        { id: 'tabs-message', name: 'Editar Layout', active: false }
      ])

      // Establecer el layout seleccionado como vacío
      setSelectedLayout('')

      // Limpiar los detalles del layout seleccionado
      setSelectedLayoutDetails(null)
    } catch (error) {
      swallError('Error al eliminar layout', false)
      console.error('Error al eliminar layout:', error)
    }
  }

  const handleConfirmationModal = () => {
    setShowLayoutModal(false)
  }

  const handleLayoutChange = (e) => {
    setSelectedLayout(e)
  }
  const handleShowProductModal = (trayIndex) => {
    setNewProductTrayIndex(trayIndex)
    return setShowProductModal(!showProductModal)
  }

  // mover los productos de lugar
  const handleDragEnd = (result) => {
    console.log('Drag End Result:', result)
    const updatedLayoutDetails = { ...selectedLayoutDetails }

    if (!result.destination) {
      const sourceTray = updatedLayoutDetails.trays[parseInt(result.source.droppableId)]

      if (!sourceTray) return

      const destinationTrayIndex = updatedLayoutDetails.trays
        .map((tray, index) => (tray.columns.length === 0 ? index : undefined))
        .filter(index => index !== undefined)

      const destinationTray = updatedLayoutDetails.trays[destinationTrayIndex]

      if (!destinationTray) return

      const sourceTrayColumns = [...sourceTray.columns]
      const destinationTrayColumns = [...destinationTray.columns]

      const startIndex = result.source.index % 10
      const endIndex = 0

      const [reorderedColumn] = sourceTrayColumns.splice(startIndex, 1)
      destinationTrayColumns.splice(endIndex, 0, reorderedColumn)

      if (updatedLayoutDetails.trays[parseInt(result.source.droppableId)]) {
        updatedLayoutDetails.trays[parseInt(result.source.droppableId)].columns = sourceTrayColumns
      }

      if (updatedLayoutDetails.trays[parseInt(destinationTrayIndex)]) {
        updatedLayoutDetails.trays[parseInt(destinationTrayIndex)].columns = destinationTrayColumns
      }

      setSelectedLayoutDetails(updatedLayoutDetails)
      console.log('Updated Layout Details:', updatedLayoutDetails)
      return
    }

    if (result.source.droppableId === result.destination.droppableId) {
      const sourceTray = updatedLayoutDetails.trays[parseInt(result.source.droppableId)]

      if (!sourceTray) return

      const trayColumns = [...sourceTray.columns]
      const startIndex = result.source.index % 10
      const endIndex = result.destination.index % 10

      const [reorderedColumn] = trayColumns.splice(startIndex, 1)
      trayColumns.splice(endIndex, 0, reorderedColumn)

      if (updatedLayoutDetails.trays[parseInt(result.source.droppableId)]) {
        updatedLayoutDetails.trays[parseInt(result.source.droppableId)].columns = trayColumns
      }

      setSelectedLayoutDetails(updatedLayoutDetails)
    } else {
      const sourceTray = updatedLayoutDetails.trays[parseInt(result.source.droppableId)]
      const destinationTray = updatedLayoutDetails.trays[parseInt(result.destination.droppableId)]

      if (!sourceTray || !destinationTray) return

      const sourceTrayColumns = [...sourceTray.columns]
      const destinationTrayColumns = [...destinationTray.columns]

      const startIndex = result.source.index % 10
      const endIndex = result.destination.index % 10

      const [reorderedColumn] = sourceTrayColumns.splice(startIndex, 1)
      destinationTrayColumns.splice(endIndex, 0, reorderedColumn)

      if (destinationTrayColumns.length > 10) {
        swallError('El máximo permitido es 10 productos por bandeja')
      } else {
        if (updatedLayoutDetails.trays[parseInt(result.source.droppableId)]) {
          updatedLayoutDetails.trays[parseInt(result.source.droppableId)].columns = sourceTrayColumns
        }

        if (updatedLayoutDetails.trays[parseInt(result.destination.droppableId)]) {
          updatedLayoutDetails.trays[parseInt(result.destination.droppableId)].columns = destinationTrayColumns
        }

        setSelectedLayoutDetails(updatedLayoutDetails)
      }
    }
  }

  // const handleNewLayoutNameChange = (value) => {
  //   setNewLayoutName(value)
  // }

  // Elimina bandeja
  const handleDeleteTray = (trayIndex) => {
    const trayToDelete = selectedLayoutDetails?.trays?.[trayIndex]
    setSelectedTrayToDelete({ tray: trayToDelete, index: trayIndex })
  }

  // Confirmación Eliminar bandeja
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

  // Agregar bandeja
  const handleAddTray = () => {
    const newTray = {
      columns: []

    }
    setSelectedLayoutDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        trays: [...prevDetails.trays, newTray]
      }

      // Asegurar que la nueva bandeja tenga la información necesaria
      setSelectedTrayToDelete({ tray: newTray, index: updatedDetails.trays.length - 1 })

      return updatedDetails
    })
  }

  const handleTabChange = (index) => {
    // console.log('Changing tab to index:', index)
    setTabsState((prevTabs) =>
      prevTabs.map((tab, i) => ({
        ...tab,
        active: i === index
      }))
    )
  }

  useEffect(() => {

  }, [tabsState])

  const tabs = [
    {
      id: 'tabs-home',
      name: 'Crear Layout',
      active: tabsState[0].active,
      content: (
        <>

        </>
      )
    },
    {
      id: 'tabs-message',
      name: 'Editar Layout',
      active: tabsState[1].active,
      content: (
        <>

        </>
      )
    }
  ]

  return (
    <div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div id='DivId' className='flex justify-center text-center p-5'>
          <h2 className='text-d-dark-dark-purple text-2xl font-bold'>
            {tabsState[0].active ? 'Crear Layout' : 'Editar Layout'}
          </h2>

        </div>
        <div className='flex justify-center'>
          <TabsComponentLayout tabs={tabs} handleTabChange={handleTabChange} />
        </div>
        <h3 className='text-center'>
          {tabsState[0].active
            ? 'En esta sección podrás crear un nuevo layout basándote en plantillas existentes'
            : 'En esta sección podrás editar o eliminar un layout'}
        </h3>

        <div className='flex justify-center items-center p-5'>
          <div className='flex flex-row items-center gap-4'>
            <select
              className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
              onChange={(e) => handleLayoutChange(e.target.value)}
              value={selectedLayout}
            >
              <option value='0'>Selecciona un layout existente</option>
              {layouts &&
        layouts.map((layout) => (
          <option key={layout.id}>{layout.name}</option>
        ))}
            </select>
            <input
              type='text'
              className='rounded-full w-full md:max-w-xs border border-gray-300 px-4 py-1'
              placeholder='Nombre de Nuevo Layout'
              onChange={(e) => {
                tabsState[1].active ? setEditingLayoutName(e.target.value) : setNewLayoutName(e.target.value)
              }}
              value={tabsState[1].active ? editingLayoutName : newLayoutName}
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
        <div className='flex justify-center pb-10 gap-8'>
          {tabsState[1].active && (
            <button
              type='button'
              onClick={handleDeleteClick}
              className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 hover:text-white focus:ring-4 focus:outline-none focus:ring-red-300'
            >
              Eliminar Layout
            </button>
          )}
          <button
            type='button'
            onClick={tabsState[0].active ? handleSaveNewLayout : handleEditLayout}
            className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
          >
            {tabsState[0].active ? 'Crear Nuevo Layout' : 'Editar Layout'}
          </button>

        </div>
      </DragDropContext>
      {showLayoutModal && (
        <ConfirmationModal
          title='Confirmación'
          message='¿Estás seguro de eliminar este layout?'
          cancelButtonText='Cancelar'
          handleOperationConfirmation={handleDeleteConfirmation}
          handleConfirmationModal={handleConfirmationModal}
          confirmButtonText='Eliminar layout'
        />
      )}
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
