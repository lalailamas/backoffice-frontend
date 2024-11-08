import React from 'react'
import StoreLayout from './storeLayout'
const TransitionLayoutModal = ({ open, onClose, layout, products, title }) => {
  if (!open) return null

  return (
    <div className='fixed z-50 inset-0 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75' />
        </div>

        <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>

        <div
          className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 overflow-hidden shadow-xl transform transition-all'
          role='dialog' aria-modal='true' aria-labelledby='modal-headline'
        >
          <div className='sm:flex sm:items-start'>
            <div
              className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full  sm:mx-0 sm:h-10 sm:w-10'
            >
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='currentColor' className='w-10 h-10'>
                <path fillRule='evenodd' d='M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z' clipRule='evenodd' />
              </svg>
            </div>
            <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
              <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                {title}
              </h3>
              <div className='mt-2'>
                {layout && products && (
                  <StoreLayout store={{ name: 'Transition Layout' }} layout={layout} products={products} />
                )}
              </div>
            </div>
          </div>
          <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
            <button
              onClick={onClose}
              className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TransitionLayoutModal
