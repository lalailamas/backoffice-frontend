const { useState } = require('react')

const AccordeonCard = ({
  initialQuantity,
  maxQuantity,
  header,
  price, step, productId, quantityChangeHandler, index, updateProductQuantity, maxPurchasedQuantity, occurrence
}) => {
  const [quantity, setQuantity] = useState(initialQuantity || 0) // Estado local para la cantidad
  const [quantityPurchased, setQuantityPurchased] = useState(0) // Estado local para la cantidad

  const handleIncrease = () => {
    // Lógica para aumentar la cantidad

    setQuantity(quantity + 1)
    if (step === 2) {
      if (occurrence !== false) {
        // console.log('occurrence', occurrence)
        quantityChangeHandler(index, productId, ((quantity + 1)), occurrence)
      } else {
        quantityChangeHandler(index, productId, ((quantity + 1) - initialQuantity))
      }
    } else { updateProductQuantity(index, productId, (quantity + 1), 'restocked') }
  }
  const handleIncreasePurchased = () => {
    // Lógica para aumentar la cantidad
    if (quantityPurchased < maxPurchasedQuantity) {
      setQuantityPurchased(quantityPurchased + 1)
      updateProductQuantity(index, productId, (quantityPurchased + 1), 'purchased')
    }
  }

  const handleDecrease = () => {
    // Lógica para disminuir la cantidad
    if (quantity > 0) {
      setQuantity(quantity - 1)
      if (step === 2) {
        if (occurrence !== false) {
          console.log('occurrence', occurrence)
          quantityChangeHandler(index, productId, ((quantity - 1)), occurrence)
        } else {
          quantityChangeHandler(index, productId, ((quantity - 1) - initialQuantity))
        }
      } else { updateProductQuantity(index, productId, (quantity - 1), 'restocked') }
    }
  }

  const handleDecreasePurchased = () => {
    // Lógica para disminuir la cantidad
    if (quantityPurchased > 0) {
      setQuantityPurchased(quantityPurchased - 1)
      updateProductQuantity(index, productId, (quantityPurchased - 1), 'purchased')
    }
  }

  return (
    <>
      {/* STEP FOUR */}
      {step === 4
        ? (
          <section className='w-[250px] h-[300px] flex flex-col items-center align-center  rounded shadow-lg'>

            <span className='flex  items-center  h-full'>
              {header}
            </span>
            <div className='h-full flex flex-col items-center gap-8'>
              <div className='custom-number-input h-8 w-32'>

                <div className='flex flex-col justify-center text-center items-center align-center h-[120px]'>
                  <p className='font-albert-sans text-center font-semibold text-gray-800'>${price}</p>
                  <p className='font-bold text-center text-d-dark-dark-purple'> {initialQuantity}/{maxQuantity}</p>
                </div>
              </div>
            </div>
          </section>

          )
        : step === 2
          ? (
            <section className='flex flex-col items-center align-center gap-4'>

              <span className='flex  items-center  h-full'>
                {header}
              </span>
              <div className='flex flex-row mb-6'>

                <button className='btn-sm join-item hover:bg-d-soft-soft-purple rounded-full' onClick={handleDecrease}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <g clipPath='url(#clip0_1384_742)'>
                      <circle cx='12' cy='12' r='12' fill='#8480C0' />
                      <path d='M7 12H17' stroke='#DCDAD8' strokeLinecap='round' strokeLinejoin='round' />
                    </g>
                    <defs>
                      <clipPath id='clip0_1384_742'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </button>

                <p className='flex items-center justify-center font-bold text-d-dark-dark-purple '>{quantity}</p>
                <button className='btn-sm join-item hover:bg-d-soft-soft-purple rounded-full' onClick={handleIncrease}>
                  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                    <g clipPath='url(#clip0_1384_744)'>
                      <circle cx='12' cy='12' r='12' fill='#7A36E6' />
                      <path d='M12 7V17M7 12H17' stroke='white' strokeLinecap='round' strokeLinejoin='round' />
                    </g>
                    <defs>
                      <clipPath id='clip0_1384_744'>
                        <rect width='24' height='24' fill='white' />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
              </div>
            </section>
            )

          : (
              {/* STEP THREE */},
                <section className='w-[250px] h-[380px] flex flex-col items-center align-center rounded shadow-lg'>
                  <span className='flex  items-center  h-full'>
                    {header}
                  </span>
                  <div className='h-full flex flex-col items-center gap-8'>
                    <div className='custom-number-input h-8 w-32'>
                      <label htmlFor='custom-input-number' className='w-full text-green-500 text-xs font-bold'>añadidos
                      </label>
                      <div className='flex flex-row w-full rounded-lg relative bg-transparent mt-1'>
                        <button data-action='decrement' className='btn-sm join-item rounded-full hover:bg-d-soft-soft-purple' onClick={handleDecrease}>
                          {/* BOTON (-) EN AÑADIDOS */}
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                            <g clipPath='url(#clip0_1384_742)'>
                              <circle cx='12' cy='12' r='12' fill='#8480C0' />
                              <path d='M7 12H17' stroke='#DCDAD8' strokeLinecap='round' strokeLinejoin='round' />
                            </g>
                            <defs>
                              <clipPath id='clip0_1384_742'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <input
                          readOnly
                          className='outline-none focus:outline-none text-center w-full font-semibold text-md md:text-basecursor-default flex items-center text-black' name='custom-input-number' value={quantity}
                          max={maxQuantity}
                        />
                        <button data-action='increment' className='btn-sm join-item rounded-full hover:bg-d-soft-soft-purple' onClick={handleIncrease}>
                          {/* BOTON (+) EN AÑADIDOS */}
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                            <g clipPath='url(#clip0_1384_744)'>
                              <circle cx='12' cy='12' r='12' fill='#7A36E6' />
                              <path d='M12 7V17M7 12H17' stroke='white' strokeLinecap='round' strokeLinejoin='round' />
                            </g>
                            <defs>
                              <clipPath id='clip0_1384_744'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                    <div className='custom-number-input h-8 w-32'>
                      <label htmlFor='custom-input-number' className='w-full text-red-500 text-xs font-bold'>retirados
                      </label>
                      <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                        <button data-action='decrement' className='btn-sm join-item rounded-full hover:bg-d-soft-soft-purple' onClick={handleDecreasePurchased}>
                          {/* BOTON (-) EN RETIRADOS */}
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                            <g clipPath='url(#clip0_1384_742)'>
                              <circle cx='12' cy='12' r='12' fill='#8480C0' />
                              <path d='M7 12H17' stroke='#DCDAD8' strokeLinecap='round' strokeLinejoin='round' />
                            </g>
                            <defs>
                              <clipPath id='clip0_1384_742'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                        <input
                          readOnly
                          className='outline-none focus:outline-none text-center w-full font-semibold text-md flex items-center text-black' name='custom-input-number' value={quantityPurchased}
                          max={maxQuantity}
                        />
                        <button data-action='increment' className='btn-sm join-item rounded-full hover:bg-d-soft-soft-purple' onClick={handleIncreasePurchased}>
                          {/* BOTON (+) EN RETIRADOS */}
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                            <g clipPath='url(#clip0_1384_744)'>
                              <circle cx='12' cy='12' r='12' fill='#7A36E6' />
                              <path d='M12 7V17M7 12H17' stroke='white' strokeLinecap='round' strokeLinejoin='round' />
                            </g>
                            <defs>
                              <clipPath id='clip0_1384_744'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

            )}

    </>
  )
}

export default AccordeonCard
