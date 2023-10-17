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
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1)
      if (step === 2) {
        if (occurrence) {
          quantityChangeHandler(index, productId, ((quantity + 1) - occurrence))
        } else {
          quantityChangeHandler(index, productId, ((quantity + 1) - initialQuantity))
        }
      } else { updateProductQuantity(index, productId, (quantity + 1), 'restocked') }
    }
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
        quantityChangeHandler(index, productId, ((quantity - 1) - initialQuantity))
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

  const handleCheck = () => {
    // Lógica para confirmar la cantidad, podrías enviarla al servidor aquí si es necesario
  }
  const handleInputChange = (e) => {
    const inputQuantity = parseInt(e.target.value, 10)
    setQuantity(isNaN(inputQuantity) ? 0 : inputQuantity)
  }
  const handleInputChangePurchased = (e) => {
    const inputQuantityPurchased = parseInt(e.target.value, 10)
    setQuantityPurchased(isNaN(inputQuantityPurchased) ? 0 : inputQuantityPurchased)
  }

  return (
    <div className='max-w-md m-3 p-2 rounded overflow-hidden shadow-lg gap-6 h-full '>

      {header}

      {step === 4
        ? (

          <div className='flex justify-center text-center items-center h-[120px] gap-3'>
            <p className='text-center text-gray-800 mt-1'>${price}</p>
            <p className='ml-auto font-bold text-d-dark-dark-purple'> {initialQuantity}/{maxQuantity}</p>
          </div>

          )
        : step === 2
          ? (
            <div className='flex justify-center text-center items-center h-[120px] gap-3'>

              <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleDecrease}>-</button>
              <p className='flex items-center justify-center  h-8 ml-2 font-bold text-d-dark-dark-purple'>{quantity}/{maxQuantity}</p>
              <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleIncrease}>+</button>
              <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleCheck}>✓</button>
            </div>

            )

          : (
            <div className='flex flex-col gap-4 h-[150px] items-center '>
              <div className='custom-number-input h-8 w-32'>
                <label htmlFor='custom-input-number' className='w-full text-gray-500 text-xs font-light'>añadidos
                </label>
                <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                  <button data-action='decrement' className=' bg-green-500/80 text-white hover:text-gray-700 hover:bg-green-500/30 h-full w-20 rounded-l cursor-pointer outline-none' onClick={handleDecrease}>
                    <span className='m-auto text-2xl font-thin'>−</span>
                  </button>
                  <input
                    readOnly
                    className='outline-none focus:outline-none text-center w-full bg-green-500/80 font-semibold text-md    md:text-basecursor-default flex items-center text-white  outline-none' name='custom-input-number' value={quantity}
                    onChange={handleInputChange}
                    max={maxQuantity}
                  />
                  <button data-action='increment' className='bg-green-500/80 text-white hover:text-gray-700 hover:bg-green-500/30 h-full w-20 rounded-r cursor-pointer' onClick={handleIncrease}>
                    <span className='m-auto text-2xl font-thin'>+</span>
                  </button>
                </div>
              </div>
              <div className='custom-number-input h-8 w-32 py-5'>
                <label htmlFor='custom-input-number' className='w-full text-gray-500 text-xs font-light'>retirados
                </label>
                <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                  <button data-action='decrement' className=' bg-red-500/80 text-white hover:text-white hover:bg-red-500/30 h-full w-20 rounded-l cursor-pointer outline-none' onClick={handleDecreasePurchased}>
                    <span className='m-auto text-2xl font-thin'>−</span>
                  </button>
                  <input
                    readOnly
                    className='outline-none focus:outline-none text-center w-full bg-red-500/80 font-semibold text-md   md:text-basecursor-default flex items-center text-white  outline-none' name='custom-input-number' value={quantityPurchased}
                    onChange={handleInputChangePurchased}
                  />
                  <button data-action='increment' className='bg-red-500/80 text-white hover:text-white hover:bg-red-500/30 h-full w-20 rounded-r cursor-pointer' onClick={handleIncreasePurchased}>
                    <span className='m-auto text-2xl font-thin'>+</span>
                  </button>
                </div>
              </div>
            </div>
            )}

    </div>
  )
}

export default AccordeonCard
