import React, { useRef, useState } from 'react'
import Webcam from 'react-webcam'
// import { Camera } from 'react-camera-pro'

function CameraModal ({ title, message, confirmButtonText, cancelButtonText, handleOperationConfirmation, handleConfirmationModal, takeSnapshot }) {
  const webcamRef = useRef(null)
  const [facingMode, setFacingMode] = useState('user') // 'user' para cámara frontal, 'environment' para cámara trasera

  const switchCamera = () => {
    setFacingMode((prevFacingMode) =>
      prevFacingMode === 'user' ? 'environment' : 'user'
    )
  }
  const [image, setImage] = useState(null)
  const [showcamera, setShowCamera] = useState(true)
  const handleCapture = async () => {
    const imageSrc = await webcamRef.current.getScreenshot()
    setImage(imageSrc)
    setShowCamera(false)
    // if (imageSrc) {
    //   takeSnapshot(imageSrc)
    //   console.log('Imagen convertida a formato JPEG:', imageSrc)
    // }

    // Enviar la imagen al servidor (jpegImageSrc)
    // Aquí puedes usar fetch u otra lógica para enviar la imagen al servidor
  }
  return (
    <div>
      <div id='YOUR_ID' className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>

          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75' />
          </div>

          <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>

          <div
            className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'
            role='dialog' aria-modal='true' aria-labelledby='modal-headline'
          >
            <div className='sm:flex sm:items-start'>
              <div
                className='mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-d-soft-soft-purple sm:mx-0 sm:h-10 sm:w-10'
              >
                <svg
                  className='h-6 w-6 text-d-dark-dark-purple' xmlns='http://www.w3.org/2000/svg' fill='none'
                  viewBox='0 0 24 24' stroke='currentColor' aria-hidden='true'
                >
                  <path
                    strokeLinecap='round' strokeLinejoin='round' strokeWidth='2'
                    d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z'
                  />
                </svg>
              </div>
              <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                  {title}
                </h3>
                <div className='mt-2'>
                  <p className='text-sm text-gray-500'>
                    {message}
                  </p>
                </div>
              </div>
            </div>
            <div className='mt-5'>
              <div className={`${showcamera ? 'mt-5' : 'hidden'}`}>

                <Webcam
                  ref={webcamRef}
                  height={1600}
                  width={400}
                  mirrored={facingMode === 'user'}
                  facingMode={facingMode}
                />
              </div>
              <div className={`${!showcamera ? 'mt-5' : 'hidden'}`}>
                <img src={image} alt='Taken photo' />

              </div>
            </div>
            <div className='mt-5'>
              <button onClick={switchCamera}>Cambiar Cámara</button>
              <button type='button' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-d-dark-dark-purple font-medium hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple text-white sm:ml-3 sm:w-auto sm:text-sm' onClick={handleCapture}>
                Tomar Foto
              </button>
            </div>

            <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
              <button type='button' className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-d-dark-dark-purple font-medium hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple text-white sm:ml-3 sm:w-auto sm:text-sm' onClick={handleOperationConfirmation}>
                {confirmButtonText}
              </button>
              <button type='button' databehavior='cancel' className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm' onClick={handleOperationConfirmation}>
                {cancelButtonText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CameraModal
