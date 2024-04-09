'use client'
import { testingError } from '@/api/testingError'
import { errorHandler } from '@/utils/errors/errors'
import React, { useState } from 'react'

function testError () {
  const [errorCode, setErrorCode] = useState('')
  const handleSendError = async () => {
    try {
      await testingError(errorCode)
    } catch (error) {
      errorHandler(error)
    }
  }
  return (

    <div className='max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md'>
      <h2 className='text-2xl font-semibold mb-4'>Testing Error</h2>
      <div className='mb-4'>
        <label htmlFor='errorCodeInput' className='block text-sm font-medium text-gray-600'>
          Error Code:
        </label>
        <input
          type='text'
          id='errorCodeInput'
          className='mt-1 p-2 w-full border rounded-md'
          value={errorCode}
          onChange={(e) => setErrorCode(e.target.value)}
        />
      </div>
      <button
        className='bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
        onClick={handleSendError}
      >
        Try Error
      </button>
    </div>

  )
}

export default testError
