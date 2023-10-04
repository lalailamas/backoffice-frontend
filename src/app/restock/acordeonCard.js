const { useState } = require('react')

const AccordeonCard = ({
  className,
  initialQuantity,
  maxQuantity,
  header,
  children,
  bottom
}) => {
  const [quantity, setQuantity] = useState(initialQuantity) // Estado local para la cantidad

  const handleIncrease = () => {
    // Lógica para aumentar la cantidad
    setQuantity(quantity + 1)
  }

  const handleDecrease = () => {
    // Lógica para disminuir la cantidad
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const handleCheck = () => {
    // Lógica para confirmar la cantidad, podrías enviarla al servidor aquí si es necesario
  }

  return (
    <div className='max-w-md m-1 p-2 rounded overflow-hidden shadow-lg gap-6 h-full'>

      {header}

      {/* <p className='ml-auto font-bold text-d-dark-dark-purple'> {initialQuantity}/{maxQuantity}</p> */}

      {/* TODO: BOTON + Y TICKET ESPACIADO AQUI */}

      {initialQuantity
        ? (
          <div className='flex justify-center text-center items-center h-[120px] gap-3'>

            <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleDecrease}>-</button>
            <p className='flex items-center justify-center  h-8 ml-2 font-bold text-d-dark-dark-purple'>{quantity}/{maxQuantity}</p>
            <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleIncrease}>+</button>
            <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleCheck}>✓</button>
          </div>

          )
        : (
          <div className='flex flex-col gap-4 h-[150px] items-center'>
            <div className='custom-number-input h-8 w-32'>
              <label for='custom-input-number' className='w-full text-gray-500 text-xs font-light'>productos añadidos
              </label>
              <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                <button data-action='decrement' className=' bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none'>
                  <span className='m-auto text-2xl font-thin'>−</span>
                </button>
                <input type='number' className='outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none' name='custom-input-number' value='0' />
                <button data-action='increment' className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer'>
                  <span className='m-auto text-2xl font-thin'>+</span>
                </button>
              </div>
            </div>
            <div className='custom-number-input h-8 w-32 py-5'>
              <label for='custom-input-number' className='w-full text-gray-500 text-xs font-light'>productos retirados
              </label>
              <div className='flex flex-row h-10 w-full rounded-lg relative bg-transparent mt-1'>
                <button data-action='decrement' className=' bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-l cursor-pointer outline-none'>
                  <span className='m-auto text-2xl font-thin'>−</span>
                </button>
                <input type='number' className='outline-none focus:outline-none text-center w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none' name='custom-input-number' value='0' />
                <button data-action='increment' className='bg-gray-300 text-gray-600 hover:text-gray-700 hover:bg-gray-400 h-full w-20 rounded-r cursor-pointer'>
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
