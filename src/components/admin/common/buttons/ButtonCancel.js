import React from 'react'

function ButtonCancel ({ onClick, text }) {
  return (
    <button type='button' databehavior='cancel' className='btn btn-sm join-item rounded-full' onClick={onClick}>
      {text}
    </button>
  )
}

ButtonCancel.defaultProps = {
  text: 'Cancelar'
}

export default ButtonCancel