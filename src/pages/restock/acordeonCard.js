const { useState } = require('react')

const AccordeonCard = ({
  className,
  header,
  children,
  bottom
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`bg-white rounded-lg shadow-lg p-3 h-fit ${className}`}>
      <button
        className='block w-full'
        type='button'
        onClick={() => setIsOpen(!isOpen)}
      >
        {header}
      </button>
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
