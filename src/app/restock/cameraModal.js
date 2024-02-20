'use client'
import ButtonCancel from '@/components/admin/common/buttons/ButtonCancel'
import React, { useState } from 'react'
// import Webcam from 'react-webcam'
// import { Camera } from 'react-camera-pro'
import { Camera } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'

function CameraModal ({
  title,
  message,
  confirmButtonText,
  cancelButtonText,
  handleOperationConfirmation,
  handleConfirmationModal,
  takeSnapshot
}) {
  const [image, setImage] = useState('')
  const [showcamera, setShowCamera] = useState(false)
  const [showInput, setShowInput] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const cameraRef = React.useRef()
  const handleShowBack = () => {
    console.log('handleShowBack')
    setShowCamera(false)
    setShowInput(false)
    setSelectedFile(null)
    setImage('')
  }

  const handleTakePhoto = (dataUri) => {
    // Callback cuando se toma una foto
    setImage(dataUri)
    setShowCamera(false)
  }
  const handleShowCamera = () => {
    // console.log('handleShowCamera')
    setShowCamera(!showcamera)
    setImage('')
  }
  // const handleShowInputFile = () => {
  //   setShowCamera(false)
  //   setShowInput(true)
  // }

  function handleTakePhotoAnimationDone (dataUri) {
    // console.log(dataUri, 'takePhoto')
    setImage(dataUri)
  }

  function handleCameraError (error) {
    console.log('handleCameraError', error)
  }

  // function handleCameraStart (stream) {
  //   console.log('handleCameraStart')
  // }

  // function handleCameraStop () {
  //   console.log('handleCameraStop')
  // }
  const handleFileInputChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader() //eslint-disable-line
      reader.onloadend = () => {
        setImage(reader.result)
        setShowCamera(false)
        setSelectedFile(file)
        console.log(reader.result, 'reader.result')
      }
      reader.readAsDataURL(file)
    }
  }
  const SendSnapshot = (image) => {
    return () => {
      takeSnapshot(image)
      handleConfirmationModal()
    }
  }
  // Esta función es para usar en caso de que las fotos ya no sean obligatorias----
  // const handleNext = () => {
  //   return () => {
  //     handleConfirmationModal()
  //     handleOperationConfirmation()
  //   }
  // }

  return (
    <div>
      <div id='YOUR_ID' className='fixed z-50 inset-0 overflow-y-auto'>
        <div className='flex items-center justify-center min-h-screen pt-4 px-4 text-center sm:p-0'>
          {/* Blurry background */}
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75' />
          </div>
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
              </div>
            </div>

            <div className='mt-5'>
              {image && !selectedFile
                ? (
                  <div className='relative'>
                    <button className='absolute top-2 right-2 z-10' onClick={handleShowCamera}>
                      {/* Puedes personalizar el botón de cerrar según tus necesidades */}
                      <span className='text-2xl font-bold text-grey-700'>X</span>
                    </button>
                    <img src={image} alt='Taken photo' />
                  </div>
                  )
                : showcamera
                  ? (
                    <div className={`${showcamera ? 'mt-2 relative' : 'hidden'}`}>
                      <button className='absolute top-2 right-2 z-10' onClick={handleShowCamera}>
                        {/* Puedes personalizar el botón de cerrar según tus necesidades */}
                        <span className='text-2xl font-bold text-white'>X</span>
                      </button>
                      <Camera
                        className='z-0'
                        ref={cameraRef}
                        onTakePhoto={(dataUri) => {
                          handleTakePhoto(dataUri)
                        }}
                        onTakePhotoAnimationDone={(dataUri) => {
                          handleTakePhotoAnimationDone(dataUri)
                        }}
                        onCameraError={(error) => {
                          handleCameraError(error)
                        }}
                        // onCameraStart={(stream) => {
                        //   handleCameraStart(stream)
                        // }}
                        // onCameraStop={() => {
                        //   handleCameraStop()
                        // }}
                        idealFacingMode='environment'
                        // isFullscreen
                      />
                    </div>
                    )
                  : !showInput
                      ? (
                        <div className='flex space-x-4'>
                          <button className='flex-grow' onClick={handleShowCamera}>
                            <div className='flex-grow'>
                              <div className='flex flex-col justify-center items-center w-full h-full rounded-lg border border-gray-300 p-4 text-center'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z' />
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z' />
                                </svg>
                                <p className='text-xs'>Tomar foto</p>
                              </div>
                            </div>
                          </button>
                          {/* <button className='flex-grow' onClick={handleShowInputFile}>
                            <div className='flex-grow'>
                              <div className='flex flex-col justify-center items-center w-full h-full rounded-lg border border-gray-300 p-4 text-center'>
                                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                                  <path strokeLinecap='round' strokeLinejoin='round' d='M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z' />
                                </svg>
                                <p className='text-xs'>Subir imagen</p>
                              </div>
                            </div>
                          </button> */}

                        </div>
                        )
                      : (
                        <div className='relative'>
                          <button className='absolute top-2 right-2 z-10' onClick={handleShowBack}>
                            {/* Puedes personalizar el botón de cerrar según tus necesidades */}
                            <span className='text-2xl font-bold text-grey -700'>X</span>
                          </button>
                          <div className='p-3'>
                            <input type='file' accept='image/*' onChange={handleFileInputChange} />
                          </div>
                        </div>
                        )}
            </div>

            <div className='mt-5 flex flex-row-reverse gap-2'>
              {image &&
                <div>
                  <button
                    type='button'
                    databehavior='submit'
                    className={`${image ? ' inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800' : 'hidden'}`}
                    onClick={SendSnapshot(image)}
                  >
                    Siguiente
                  </button>
                </div>}

              <ButtonCancel onClick={handleOperationConfirmation} />

            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CameraModal
