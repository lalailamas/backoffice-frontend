// components/MainTitle.js

import React from 'react'

const MainTitle = ({ children }) => {
  return (
    <div className='flex justify-center mt-4 mb-4 p-4'>
      <h1 className='text-d-dark-dark-purple text-2xl font-bold text-center'>{children}</h1>
    </div>

  )
}

export default MainTitle
