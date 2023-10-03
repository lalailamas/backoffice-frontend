'use client'
import React, { useEffect, useState } from 'react'
import { getStores } from '../../api/store'
import InsideLayout from '@/components/admin/layouts/inside'
// import StepTwo from './stepTwo'
import { useRouter } from 'next/navigation'

function Restock () {
  const [stores, setStores] = useState([])
  const [selectedStore, setSelectedStore] = useState(null)
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()

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

          <div className={`${selectedStore ? 'flex items-center flex-col m-4 p-4' : 'hidden'}`}>
            <div className=' max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700'>

              <h5 className='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>{selectedStore ? selectedStore.name : null}</h5>

              {/* <p className='mb-3 font-normal text-gray-700 dark:text-gray-400'>Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p> */}
              <button
                type='button'
                onClick={() => {
                  router.push(
                    'restock/stepTwo' + `?external_id=${selectedStore.external_id}&layout_id=${selectedStore.layout_id}&store_name=${selectedStore.name}`
                  )
                }}
                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                Abrir máquina
                <svg className='w-3.5 h-3.5 ml-2' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 10'>
                  <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 5h12m0 0L9 1m4 4L9 9' />
                </svg>
              </button>
            </div>

          </div>
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
        </div>
      </div>
    </div>
  )
}

export default Restock
