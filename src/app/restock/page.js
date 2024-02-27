'use client'
import React, { useEffect, useState } from 'react'
import { OpenStore, getStores } from '../../api/store'
import { useRouter } from 'next/navigation'
import StepLayout from './stepLayout'
import ConfirmationModal from '../../components/admin/modals/confirmationModal'
import CameraModal from './cameraModal'
import { swallError } from '@/utils/sweetAlerts'
import DspLoader from '@/components/admin/common/loader'
import { errorHandler } from '@/utils/errors/errors'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'

function Restock () {
  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)
  const [modalCameraVisible, setModalCameraVisible] = useState(false)
  const [snapshot, setSnapshot] = useState(null)
  const [loaderVisible, setLoaderVisible] = useState(false)

  const router = useRouter()

  const handleStoreChange = (id) => {
    const store = stores.find((store) => store.storeId === id)
    setSelectedStore(store)
  }

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores('active')
        setStores(response)
        // console.log('response', response.data)
      } catch (error) {
        errorHandler(error, { storeId: selectedStore.storeId })
        // swallError('Error fetching stores:', false)
        // console.error('Error fetching stores:', error)
      }
    }

    fetchStores()
  }, [])

  const handleOpenStore = async () => {
    if (selectedStore.layoutId === null) {
      swallError('Hubo un error con la tienda, contacta al administrador', false)
      return
    }
    try {
      setLoaderVisible(true)
      const openStore = await OpenStore(selectedStore.storeId, snapshot)
      // console.log('Step 1: openStore response', openStore)
      if (openStore) {
        swallError('Abriendo tienda', true)
        router.push(
          'restock/stepTwo' + `?external_id=${selectedStore.storeId}&layout_id=${selectedStore.layoutId}&store_name=${selectedStore.name}&externalTransactionId=${openStore.external_transaction_id}&transactionId=${openStore.transaction_id}`
        )
      }
    } catch (error) {
      errorHandler(error, { storeId: selectedStore.storeId })
      setLoaderVisible(false)
    }
  }
  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }
  const handleCameraModal = () => {
    setModalCameraVisible(!modalCameraVisible)
  }
  const takeSnapshot = async (img) => {
    const base64Content = img.split(';base64,').pop()

    setSnapshot(base64Content)
    handleCameraModal()
    handleConfirmationModal()
  }
  if (loaderVisible) {
    return <DspLoader />
  }

  return (
    <div className='h-screen'>
      <div className='text-center'>
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

              <ButtonPrimary text='Abrir tienda' onClick={handleCameraModal} />
            </div>
            {modalVisible && (
              <div className='fixed z-50 flex items-center justify-center'>
                <ConfirmationModal
                  handleConfirmationModal={handleConfirmationModal}
                  handleOperationConfirmation={handleOpenStore}
                  title='¿Estás seguro que quieres abrir esta máquina?'
                  message={(
                    <span>
                      Verifica que <strong>{selectedStore.name}</strong> sea la correcta antes de proceder
                    </span>
                )}
                  confirmButtonText='Abrir maquina'
                  cancelButtonText='Cancelar'
                />
              </div>

            )}
            {modalCameraVisible && (
              <div className='fixed z-50 flex items-center justify-center'>
                <CameraModal
                  handleConfirmationModal={handleConfirmationModal}
                  handleOperationConfirmation={handleCameraModal}
                  title='Necesitamos que tomes una foto de la tienda antes de abrirla'
                  message={(
                    <span>
                      Toma una foto de la tienda antes de abrirla
                    </span>
                )}
                  confirmButtonText='Siguiente'
                  cancelButtonText='Cancelar'
                  takeSnapshot={takeSnapshot}
                />
              </div>
            )}

          </div>
          {/* <div><pre>{JSON.stringify(selectedStore, null, 2)}</pre></div> */}
        </div>

      </div>
    </div>
  )
}

export default Restock
