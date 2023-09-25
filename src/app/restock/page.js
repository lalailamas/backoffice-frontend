import React, { useEffect, useState } from 'react'
import { getStores } from '../../api/store'
import InsideLayout from '@/components/admin/layouts/inside'
import StepTwo from './stepTwo'

function Restock () {
  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)

  const handleStoreChange = (id) => {
    const store = stores.find((store) => store.id === parseInt(id, 10))
    console.log('selected store del handleStoreChange', store)
    setSelectedStore(store)
  }

  const goToStep = (step) => {
    setCurrentStep(step)
  }

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await getStores()
        setStores(response.data)
      } catch (error) {
        console.error('Error fetching stores:', error)
      }
    }

    fetchStores()
  }, [])

  return (
    <div>
      <InsideLayout />
      <div className='text-center pt-8'>
        <div className=''>
          <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Restock</h2>
        </div>
        <ul className='steps p-8'>
          <li className={`step ${currentStep === 1 ? 'step-primary' : ''}`}>Elige la tienda</li>
          <li className={`step ${currentStep === 2 ? 'step-primary' : ''}`}>Confirma inventario</li>
          <li className='step'>Agrega o quita productos</li>
          <li className='step'>Finalizar</li>
        </ul>

        <div className={currentStep === 1 ? 'flex-col m-4 p-4' : 'hidden'}>
          <select
            onChange={(e) => handleStoreChange(e.target.value)}
            className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
          >
            <option value='0'>Select a store</option>
            {stores.map((store) => (
              <option key={store.id} value={store.id}>
                {store.name}
              </option>
            ))}
          </select>

          <button
            type='button'
            onClick={() => goToStep(2)}
            className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
          >
            Abrir tienda
          </button>
        </div>

        <div className={currentStep === 2 ? 'flex-col text-center' : 'hidden'}>
          <div className='flex space-x-20 justify-around'>

            <button
              type='button'
              onClick={() => goToStep(1)}
              className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
            >
              Atrás
            </button>
            <button
              type='button'
              onClick={() => goToStep(3)}
              className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
            >
              Siguiente
            </button>
          </div>
          <StepTwo selectedStore={selectedStore} currentStep={currentStep} />
        </div>
      </div>
    </div>
  )
}

export default Restock
