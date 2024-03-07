import React from 'react'

function ButtonCancel ({ onClick, text = 'Cancelar' }) {
  return (
    <button type='button' databehavior='cancel' className='btn btn-sm join-item rounded-full' onClick={onClick}>
      {text}
    </button>
  )
}

export default ButtonCancel
