import React from 'react'

function ButtonCancel ({ onClick }) {
  return (
    <button type='button' databehavior='cancel' className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm' onClick={onClick}>
      Cancelar
    </button>
  )
}

export default ButtonCancel
