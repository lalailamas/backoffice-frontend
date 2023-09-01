const { useState } = require('react')

const AccordeonCard = ({
  className,
  initialQuantity,
  maxQuantity,
  header,
  children,
  bottom
}) => {
  const [isOpen, setIsOpen] = useState(true)
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
    <div className={`max-w-sm m-1 p-2 rounded overflow-hidden shadow-lg ${className} gap-3`}>
      <button
        className='block w-50'
        type='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        {header}
      </button>
      {/* <p className='ml-auto font-bold text-d-dark-dark-purple'> {initialQuantity}/{maxQuantity}</p> */}
      <div className='flex justify-center text-center items-center'>

        <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleDecrease}>-</button>
        <p className='flex items-center justify-center w-16 h-8 ml-2 font-bold text-d-dark-dark-purple'>{quantity}/{maxQuantity}</p>
        <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleIncrease}>+</button>
        <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={handleCheck}>✓</button>
      </div>
      <div
        className='w-full max-h-screen overflow-y-scroll'
        style={{ display: isOpen ? 'block' : 'none' }}
      >
        {children}
      </div>
      <div className='block w-full'>{bottom}</div>
    </div>
  )
}

export default AccordeonCard
