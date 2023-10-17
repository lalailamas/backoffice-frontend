const { useState } = require('react')

const AccordeonCard = ({
  className,
  initialQuantity,
  maxQuantity,
  header,
  price, step
}) => {
  const [quantity, setQuantity] = useState(initialQuantity || 0) // Estado local para la cantidad
  const [quantityPurchased, setQuantityPurchased] = useState(0) // Estado local para la cantidad

  const handleIncrease = () => {
    // Lógica para aumentar la cantidad
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
    }
  }
  const handleIncreasePurchased = () => {
    // Lógica para aumentar la cantidad
    if (quantityPurchased < initialQuantity) {
      setQuantityPurchased(quantityPurchased + 1)
    }
  }

  const handleDecrease = () => {
    // Lógica para disminuir la cantidad
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }
  const handleDecreasePurchased = () => {
    // Lógica para disminuir la cantidad
    if (quantityPurchased > 0) {
      setQuantityPurchased(quantityPurchased - 1)
    }
  }

  // const handleCheck = () => {
  //   // Lógica para confirmar la cantidad, podrías enviarla al servidor aquí si es necesario
  // }
  // const handleInputChange = (e) => {
  //   const inputQuantity = parseInt(e.target.value, 10)
  //   setQuantity(isNaN(inputQuantity) ? 0 : inputQuantity)
  // }
  // const handleInputChangePurchased = (e) => {
  //   const inputQuantityPurchased = parseInt(e.target.value, 10)
  //   setQuantityPurchased(isNaN(inputQuantityPurchased) ? 0 : inputQuantityPurchased)
  // }

  return (
    <>
      {step === 4
        ? (

          <div className='flex justify-center text-center items-center h-[120px] gap-3'>
            <p class='text-center text-gray-800 mt-1'>${price}</p>
            <p className='ml-auto font-bold text-d-dark-dark-purple'> {initialQuantity}/{maxQuantity}</p>
          </div>

          )
        : step === 2
          ? (
            <div className='w-[250px] h-[210px]'>
              <div className='p-2 rounded shadow-lg gap-2 h-full overflow-hidden flex flex-col justify-end items-center'>

                {header}
                <div className='flex flex-row'>
                  <div className='p-2 rounded shadow-lg gap-2 h-full overflow-hidden flex flex-row justify-end items-center'>

                    <button className='btn btn-sm join-item rounded-full' onClick={handleDecrease}>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <g clip-path='url(#clip0_1384_742)'>
                          <circle cx='12' cy='12' r='12' fill='#8480C0' />
                          <path d='M7 12H17' stroke='#DCDAD8' stroke-linecap='round' stroke-linejoin='round' />
                        </g>
                        <defs>
                          <clipPath id='clip0_1384_742'>
                            <rect width='24' height='24' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>

                    <p className='flex items-center justify-center font-bold text-d-dark-dark-purple'>{quantity}/{maxQuantity}</p>
                    <button className='btn btn-sm join-item rounded-full ' onClick={handleIncrease}>
                      <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                        <g clip-path='url(#clip0_1384_744)'>
                          <circle cx='12' cy='12' r='12' fill='#7A36E6' />
                          <path d='M12 7V17M7 12H17' stroke='white' stroke-linecap='round' stroke-linejoin='round' />
                        </g>
                        <defs>
                          <clipPath id='clip0_1384_744'>
                            <rect width='24' height='24' fill='white' />
                          </clipPath>
                        </defs>
                      </svg>
                    </button>
                    {/* <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleCheck}>✓</button> */}
                  </div>
                </div>
              </div>

            </div>
            )

          : (
            <div className='w-[250px] h-[280px]'>
              <div className='p-2 rounded shadow-lg gap-2 h-full overflow-hidden flex flex-col justify-end items-center'>

                {header}
                <div className='flex flex-col gap-8 w-[250px] h-[280px] items-center overflow-y-hidden'>
                  <div className='custom-number-input h-8 w-32'>
                    <label for='custom-input-number' className='w-full text-gray-500 text-xs font-light'>añadidos
                    </label>
                    <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                      <button data-action='decrement' className=' d-soft-white text-black hover:text-gray-700 hover:bg-green-500/30 h-full w-20 rounded-l cursor-pointer outline-none' onClick={handleDecrease}>
                        <span className='m-auto text-2xl font-thin'>
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                            <g clip-path='url(#clip0_1384_742)'>
                              <circle cx='12' cy='12' r='12' fill='#8480C0' />
                              <path d='M7 12H17' stroke='#DCDAD8' stroke-linecap='round' stroke-linejoin='round' />
                            </g>
                            <defs>
                              <clipPath id='clip0_1384_742'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </button>
                      <input
                        readOnly
                        className='outline-none focus:outline-none text-center w-full d-soft-white font-semibold text-md md:text-basecursor-default flex items-center text-black' name='custom-input-number' value={quantity}
                      // onChange={handleInputChange}
                        max={maxQuantity}
                      />
                      <button data-action='increment' className='d-soft-white text-black hover:text-gray-700 hover:bg-green-500/30 h-full w-20 rounded-r cursor-pointer' onClick={handleIncrease}>
                        <span className='m-auto text-2xl font-thin'>
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                            <g clip-path='url(#clip0_1384_744)'>
                              <circle cx='12' cy='12' r='12' fill='#7A36E6' />
                              <path d='M12 7V17M7 12H17' stroke='white' stroke-linecap='round' stroke-linejoin='round' />
                            </g>
                            <defs>
                              <clipPath id='clip0_1384_744'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  <div className='custom-number-input h-8 w-32'>
                    <label for='custom-input-number' className='w-full text-gray-500 text-xs font-light'>retirados
                    </label>
                    <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                      <button data-action='decrement' className=' d-soft-white text-black hover:text-gray-700 hover:bg-green-500/30 h-full w-20 rounded-l cursor-pointer outline-none' onClick={handleDecreasePurchased}>
                        <span className='m-auto text-2xl font-thin'>
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                            <g clip-path='url(#clip0_1384_742)'>
                              <circle cx='12' cy='12' r='12' fill='#8480C0' />
                              <path d='M7 12H17' stroke='#DCDAD8' stroke-linecap='round' stroke-linejoin='round' />
                            </g>
                            <defs>
                              <clipPath id='clip0_1384_742'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </button>
                      <input
                        readOnly
                        className='outline-none focus:outline-none text-center w-full bg-d-soft-white font-semibold text-md md:text-basecursor-default flex items-center text-black' name='custom-input-number' value={quantity}
                      // onChange={handleInputChange}
                        max={maxQuantity}
                      />
                      <button data-action='increment' className='bg-d-soft-white text-black hover:text-gray-700 hover:bg-d-soft-green h-full w-20 rounded-r cursor-pointer' onClick={handleIncreasePurchased}>
                        <span className='m-auto text-2xl font-thin'>
                          <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
                            <g clip-path='url(#clip0_1384_744)'>
                              <circle cx='12' cy='12' r='12' fill='#7A36E6' />
                              <path d='M12 7V17M7 12H17' stroke='white' stroke-linecap='round' stroke-linejoin='round' />
                            </g>
                            <defs>
                              <clipPath id='clip0_1384_744'>
                                <rect width='24' height='24' fill='white' />
                              </clipPath>
                            </defs>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>
                  {/* <div className='custom-number-input h-8 w-32 py-5'>
                  <label for='custom-input-number' className='w-full text-gray-500 text-xs font-light'>retirados
                  </label>
                  <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                    <button data-action='decrement' className=' bg-red-500/80 text-white hover:text-white hover:bg-red-500/30 h-full w-20 rounded-l cursor-pointer outline-none' onClick={handleDecreasePurchased}>
                      <span className='m-auto text-2xl font-thin' />
                    </button>
                    <input
                      readOnly
                      className='outline-none focus:outline-none text-center w-full bg-red-500/80 font-semibold text-md   md:text-basecursor-default flex items-center text-white' name='custom-input-number' value={quantityPurchased}
                      // onChange={handleInputChangePurchased}
                    />
                    <button data-action='increment' className='bg-red-500/80 text-white hover:text-white hover:bg-red-500/30 h-full w-20 rounded-r cursor-pointer' onClick={handleIncreasePurchased}>
                      <span className='m-auto text-2xl font-thin'>+</span>
                    </button>
                  </div>
                </div> */}
                </div>
              </div>
            </div>

            )}

    </>
  )
}

export default AccordeonCard
