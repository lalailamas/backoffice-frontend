import { useState, useEffect, useRef } from 'react'

export const SearchField = (props) => {
  const [currentValue, setCurrentValue] = useState(props.value ? props.value : '')
  const [timeoutHandler, setTimeoutHandler] = useState(null)
  const prevValue = useRef()
  useEffect(() => {
    setCurrentValue(props.value || '') // Actualiza el valor interno cuando cambia el valor de props
  }, [props.value])
  const handleChange = (e) => {
    setCurrentValue(e.target.value)
  }

  const handleClear = () => {
    setCurrentValue('') // Borra el valor del input
    props.onChange('') // Notifica al componente padre que el valor ha cambiado
  }
  useEffect(() => {
    if (prevValue.current !== undefined && prevValue.current !== currentValue) {
      if (timeoutHandler != null) {
        window.clearTimeout(timeoutHandler)
      }
      const newTimeoutHandler = window.setTimeout(
        () => {
          props.onChange(currentValue)
        },
        500
      )
      setTimeoutHandler(newTimeoutHandler)
    }
    prevValue.current = currentValue
  },
  [currentValue]
  )
  return (
    <div className='join w-full md:max-w-xs '>
      <input
        type='text'
        placeholder={props.placeholder || 'Buscar'}
        name='search'
        className='input input-sm input-bordered w-full  bg-d-white join-item rounded-full text-d-dark-dark-purple'
        value={currentValue} // Usa el valor del estado
        onChange={handleChange} // Actualiza el estado cuando el usuario escribe
      />
      <button
        type='button'
        onClick={handleClear}
        className='btn btn-sm join-item rounded-r-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
      >
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
        </svg>
      </button>
    </div>
  )
}
