const { useState } = require('react')

const AccordeonCard = ({
  className,
  header,
  children,
  bottom
}) => {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <div className={`max-w-sm m-1 p-2 rounded overflow-hidden shadow-lg ${className} gap-3`}>
      <button
        className='block w-50'
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
