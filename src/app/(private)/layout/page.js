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
import MainTitle from '@/components/admin/common/titles/MainTitle'
import ButtonCancel from '@/components/admin/common/buttons/ButtonCancel'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'

/**
 * Layout component that allows for creating, editing, and deleting layouts.
 *
 * @returns {JSX.Element} The Layout component.
 */
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
  const [tabsState, setTabsState] = useState([
    { id: 'tabs-home', name: 'Crear Layout', active: true },
    { id: 'tabs-message', name: 'Editar Layout', active: false }
  ])

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

  // Update selected layout details whenever selectedLayout or layouts change
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
    setShowProductModal(false)
  }

  /**
   * Handles saving a new layout.
   */
  const handleSaveNewLayout = async () => {
    if (newLayoutName.length > 0) {
      const data = {
        name: newLayoutName,
        layout: selectedLayoutDetails.trays
      }

      try {
        const response = await createLayout(data)
        swallInfo('Layout creado exitosamente')

        // Refresh the list of designs after successful creation
        const updatedLayouts = await getAllLayouts()
        setLayouts(updatedLayouts)

        // Update the status of the tabs and the selected layout
        setTabsState([
          { id: 'tabs-home', name: 'Crear Layout', active: false },
          { id: 'tabs-message', name: 'Editar Layout', active: true }
        ])

        // Set the new design as the selected design
        setSelectedLayout(response.name)
        setNewLayoutName(response.name) // You can also set the name in the input directly if needed

        // Get updated details of the created design
        const updatedLayoutDetails = await getLayout(response.id)

        // Update selectedLayoutDetails status with new details
        setSelectedLayoutDetails(updatedLayoutDetails)
        // Scroll the page to the top
        window.scrollTo({
          top: 0,
          behavior: 'auto'
        })
      } catch (error) {
        swallError('Error al crear Layout')
        console.error(error, 'Error al crear Layout')
      }
    } else {
      swallError('El nombre del nuevo layout no puede estar vacío')
      console.error('El nombre del nuevo layout no puede estar vacío')
    }
  }

  /**
   * Handles editing an existing layout.
   */
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
          const updatedLayoutDetails = await getLayout(response.id)
          setSelectedLayoutDetails(updatedLayoutDetails)

          // Wait 500 milliseconds (0.5 seconds) before scrolling the page up.
          setTimeout(() => {
            document.getElementById('DivId').scrollIntoView({ behavior: 'smooth' })
          }, 500)
        }
      } catch (error) {
        swallError('Error al editar Layout')
        console.error(error, 'Error al editar Layout')
      }
    }
  }

  const handleDeleteClick = () => {
    setShowLayoutModal(true)
  }
  /**
   * Handles confirming the deletion of a layout.
   */
  const handleDeleteConfirmation = async () => {
    try {
      await deleteLayout(selectedLayoutDetails.id)
      swallInfo('Layout eliminado exitosamente')
      setShowLayoutModal(false)

      // Refresh the list of designs after successful deletion
      const updatedLayouts = await getAllLayouts()
      setLayouts(updatedLayouts)

      // Clear the tab name input edit layout
      setEditingLayoutName('')

      // Update status to make the create tab active
      setTabsState([
        { id: 'tabs-home', name: 'Crear Layout', active: true },
        { id: 'tabs-message', name: 'Editar Layout', active: false }
      ])

      // Set the selected layout as empty
      setSelectedLayout('')

      // Clear the details of the selected layout
      setSelectedLayoutDetails(null)
    } catch (error) {
      swallError('Error al eliminar layout', false)
      console.error('Error al eliminar layout:', error)
    }
  }

  const handleConfirmationModal = () => {
    setShowLayoutModal(false)
  }

  const handleLayoutChange = (layoutName) => {
    setSelectedLayout(layoutName)
    const selectedLayout = layouts.find(layout => layout.name === layoutName)
    if (selectedLayout) {
      console.log(selectedLayout.id)
    }
  }

  const handleShowProductModal = (trayIndex) => {
    setNewProductTrayIndex(trayIndex)
    return setShowProductModal(!showProductModal)
  }

  /**
   * Handles the drag end event to reorder products within trays.
   * @param {Object} result - The result object from the drag end event.
   */
  const handleDragEnd = (result) => {
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

  /**
   * Handles deleting a tray.
   * @param {number} trayIndex - The index of the tray to delete.
   */
  const handleDeleteTray = (trayIndex) => {
    const trayToDelete = selectedLayoutDetails?.trays?.[trayIndex]
    setSelectedTrayToDelete({ tray: trayToDelete, index: trayIndex })
  }

  /**
   * Confirms the deletion of a tray.
   */
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

  /**
   * Handles adding a new tray.
   */
  const handleAddTray = () => {
    const newTray = {
      columns: []

    }
    setSelectedLayoutDetails((prevDetails) => {
      const updatedDetails = {
        ...prevDetails,
        trays: [...prevDetails.trays, newTray]
      }
      // Ensure that the new tray has the required information
      setSelectedTrayToDelete({ tray: newTray, index: updatedDetails.trays.length - 1 })
      return updatedDetails
    })
  }

  /**
   * Handles changing tabs.
   * @param {number} index - The index of the tab to activate.
   */
  const handleTabChange = (index) => {
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
          <MainTitle>{tabsState[0].active ? 'Crear Layout' : 'Editar Layout'}</MainTitle>
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
            <ButtonCancel text='Eliminar Layout' onClick={handleDeleteClick} />
          )}
          <ButtonPrimary text={tabsState[0].active ? 'Crear Nuevo Layout' : 'Editar Layout'} onClick={tabsState[0].active ? handleSaveNewLayout : handleEditLayout} />
        </div>
      </DragDropContext>
      {showLayoutModal && (
        <ConfirmationModal
          title='Confirmación'
          message='¿Estás seguro de eliminar este layout?'
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
