'use client'
import React, { useEffect, useState } from 'react'
import { OpenStore, getStores } from '../../api/store'
import InsideLayout from '@/components/admin/layouts/inside'
// import StepTwo from './stepTwo'
import { useRouter } from 'next/navigation'
import StepLayout from './stepLayout'
import ConfirmationModal from './confirmationModal'
import CameraModal from './cameraModal'

function Restock () {
  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalCameraVisible, setModalCameraVisible] = useState(false)

  const router = useRouter()

  const handleStoreChange = (id) => {
    const store = stores.find((store) => store.storeId === id)
    setSelectedStore(store)
  }

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores('active')
        setStores(response.data)
        // console.log('response', response.data)
      } catch (error) {
        console.error('Error fetching stores:', error)
      }
    }

    fetchStores()
  }, [])

  const handleOpenStore = async () => {
    const openStore = await OpenStore(selectedStore.storeId)
    console.log('Step 1: openStore response', openStore)
    router.push(
      'restock/stepTwo' + `?external_id=${selectedStore.storeId}&layout_id=${selectedStore.layoutId}&store_name=${selectedStore.name}&transactionId=${openStore.transactionId}`
    )
  }
  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }
  const handleCameraModal = () => {
    setModalCameraVisible(!modalCameraVisible)
  }

  return (
    <div>
      <InsideLayout />
      <div className='text-center pt-8'>
        <StepLayout />

        <div className='flex-col m-4 p-4'>
          <select
            onChange={(e) => handleStoreChange(e.target.value)}
            className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
          >
            <option value='0'>Select a store</option>
            {stores.map((store) => (
              <option key={store.storeId} value={store.storeId}>
                {store.name}
              </option>
            ))}
          </select>

          <div className={`${selectedStore ? 'flex items-center flex-col m-4 p-4' : 'hidden'}`}>
            <div className=' max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>

              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{selectedStore ? selectedStore.name : null}</h5>

              {/* <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
              <button
                type='button'
                onClick={() => {
                  handleCameraModal()
                }}
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Abrir cámara
                <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
                </svg>
              </button>
            </div>
            {modalVisible && (
              <ConfirmationModal
                handleConfirmationModal={handleConfirmationModal}
                handleOperationConfirmation={handleOpenStore}
                title='¿Estás seguro que quieres abrir esta máquina?'
                message={(
                  <span>
                    Verifica que <strong>{selectedStore.name}</strong> sea la correcta antes de proceder
                  </span>
                )}
                confirmButtonText='Abrir máquina'
                cancelButtonText='Cancelar'
              />
            )}
            {modalCameraVisible && (
              <CameraModal
                handleConfirmationModal={handleConfirmationModal}
                handleOperationConfirmation={handleCameraModal}
                title='¿Estás seguro que quieres abrir esta máquina?'
                message={(
                  <span>
                    Toma una foto de la tienda antes de abrirla
                  </span>
                )}
                confirmButtonText='Tomar Foto'
                cancelButtonText='Cancelar'
              />
            )}

          </div>
        </div>

      </div>
    </div>
  )
}

export default Restock
