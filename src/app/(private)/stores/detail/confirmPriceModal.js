import ButtonCancel from '@/components/admin/common/buttons/ButtonCancel'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import React, { useState, useEffect } from 'react'

function ConfirmPriceModal ({
  showLayout,
  products,
  storeId,
  handleShowPriceModal,
  handleUpdateStoreLayout

}) {
  const [prices, setPrices] = useState({})
  const createPriceLayout = async () => {
    const data = {}
    showLayout.trays.forEach((tray) => {
      tray.columns.forEach((column) => {
        const ID = column.productId
        const productPrice = products.find(product => product.productId === ID).prices[storeId] || 0

        data[ID] = productPrice
      })
    })
    setPrices(data)
  }

  useEffect(() => {
    createPriceLayout()
  }, [showLayout])
  return (
    <div>
      <div id='YOUR_ID' className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75' />
          </div>
          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
          <div
            className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
            role='dialog' aria-modal='true' aria-labelledby='modal-headline'
          >
            <div className='sm:flex sm:items-start'>

              <div
                className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-d-soft-soft-purple sm:mx-0 sm:h-10 sm:w-10'
              >
                <svg
                  className='h-6 w-6 text-d-dark-dark-purple' xmlns='http://www.w3.org/2000/svg' fill='none'
                  viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'
                >
                  <path
                    strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                  Precios
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    Asegúrate que todos los productos tengan precio antes de continuar.
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-2 flex flex-col justify-center items-center '>
              {
              prices && Object.keys(prices).map((productId, index) => {
                return (
                  <div key={index} className='grid grid-cols-12 gap-2 m-2'>
                    <h3 className='col-span-8 text-sm leading-6 mt-3' id='modal-headline'>
                      {products.find(product => product.productId === productId).productName}
                    </h3>
                    <div className={`${prices[productId] === 0 ? 'col-span-4 flex items-center input input-bordered border-red-500 gap-2' : 'col-span-4 flex items-center input input-bordered gap-2'}`}>
                      <span>$</span>
                      <input
                        type='number'
                        placeholder='Precio'
                        value={prices[productId]}
                        onChange={(e) => setPrices({ ...prices, [productId]: parseInt(e.target.value) })}
                        className='w-full'
                      />
                    </div>

                  </div>
                )
              })

            }
            </div>

            <div className='mt-5 flex gap-4 justify-end'>
              <ButtonCancel onClick={handleShowPriceModal} />
              <ButtonPrimary onClick={() => handleUpdateStoreLayout(prices)} text='Confirmar' />
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default ConfirmPriceModal
