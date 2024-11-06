'use client'
import React, { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { markAsRead } from '@/api/notificacions'
import { swallError } from '@/utils/sweetAlerts'
const baseUrl = process.env.NEXT_PUBLIC_DSP_API_BASE

function Bell () {
  const { data: session } = useSession()
  const [allNotifications, setAllNotifications] = useState([])
  const allNotificationsRef = useRef(allNotifications)
  const [showNotifications, setShowNotifications] = useState(false)
  const [newNotifications, setNewNotifications] = useState(false)
  const bellRef = useRef(null)
  const [listening, setListening] = useState(false)

  const handleClick = () => {
    if (showNotifications) {
      setShowNotifications(false)
    } else {
      setShowNotifications(true)
    }
  }
  const _setAllNotifications = (newNotifications) => {
    allNotificationsRef.current = newNotifications
    setAllNotifications(newNotifications)
  }

  const handleCloseNotifications = (event) => {
    setShowNotifications(false)
  }

  useEffect(() => {
    document.addEventListener('click', handleCloseNotifications)
    document.addEventListener('touchstart', handleCloseNotifications) // Agrega el evento touchstart

    return () => {
      document.removeEventListener('click', handleCloseNotifications)
      document.removeEventListener('touchstart', handleCloseNotifications) // Remueve el evento touchstart
    }
  }, [showNotifications])

  useEffect(() => {
    if (session?.user.id && session.user.role === 'admin') {
      if (!listening) {
        // eslint-disable-next-line no-undef
        const innerEvents = new EventSource(`${baseUrl}notification/subscribe/${session.user.id}`)

        innerEvents.onmessage = (event) => {
          const parsedData = JSON.parse(event.data)
          parsedData.forEach((parsedData) => {
            const repeated = allNotificationsRef.current.find((notification) => notification.id === parsedData.id)

            if (repeated === undefined) {
              _setAllNotifications(allNotificationsRef.current.concat(parsedData))
              setNewNotifications(prevCount => prevCount + 1)
            }
          })
        }

        setListening(true)
      }
    }
  }, [listening, allNotifications, session])

  // Efecto para restablecer el número de notificaciones nuevas cuando se eliminan notificaciones
  useEffect(() => {
    const handleDeleteNotification = (event) => {
      setNewNotifications(allNotificationsRef.current.length - 1) // Restablece el número de notificaciones nuevas
    }

    document.addEventListener('notificationDeleted', handleDeleteNotification)

    return () => {
      document.removeEventListener('notificationDeleted', handleDeleteNotification)
    }
  }, [])

  // Efecto para actualizar el número de notificaciones nuevas cuando llegan nuevas notificaciones
  useEffect(() => {
    const handleNewNotification = () => {
      setNewNotifications(prevCount => prevCount + 1) // Incrementa el número de notificaciones nuevas
    }

    document.addEventListener('newNotification', handleNewNotification)

    return () => {
      document.removeEventListener('newNotification', handleNewNotification)
    }
  }, [])

  const handleDeleteNotification = async (notificationId, event) => {
    event.nativeEvent.stopImmediatePropagation()
    const response = await markAsRead(session.user.id, notificationId)
    if (response.successful) {
      setAllNotifications(prevNotifications => prevNotifications.filter(notification => notification.id !== notificationId))
      setNewNotifications(prevCount => prevCount - 1)
    } else {
      swallError('Error al marcar como leída la notificación', false)
    }
  }

  function formatDate (dateString) {
    const date = new Date(dateString)
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric' }
    return date.toLocaleDateString('es-ES', options)
  }

  return (
    <>
      <div className='flex justify-end'>
        <span ref={bellRef} className='relative' onClick={handleClick}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0' />
          </svg>
          {newNotifications > 0 && (
            <span className='absolute top-0 right-0 -mt-1 -mr-1 flex items-center justify-center text-xs bg-red-500 w-4 h-4 rounded-full text-d-white'>
              {newNotifications}
            </span>
          )}
        </span>

      </div>
      <div className='fixed pt-5 top-0 right-0 z-50 h-screen overflow-y-auto transition-transform  bg-d-dark-dark-purple text-d-white'>
        <button className='absolute top-2 right-2 text-white' onClick={handleClick}>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
          </svg>
        </button>
        {showNotifications && (
          <>
            {allNotifications.length === 0
              ? (
                <div className='flex flex-col mt-4 p-6 m-4 relative text-d-white rounded-2xl pl-5 bg-d-dark-purple w-80'>
                  <span>Sin notificaciones</span>
                </div>
                )
              : (
                  allNotifications
                    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                    .map((notification, index) => (
                      <div key={index} className='flex flex-col mt-4 p-6 m-4 relative text-d-white rounded-2xl pl-5 bg-d-dark-purple w-80'>
                        <span className='text-xs'>{formatDate(notification.createdAt)}</span>
                        <span className='font-bold text-lg'>{notification.title}</span>
                        <span className='text-xs'>{notification.body}</span>
                        <span className='absolute top-0 right-0 mr-4 mt-1 p-1 text-white cursor-pointer  hover:bg-d-dark-dark-purple rounded-full' onClick={(event) => handleDeleteNotification(notification.id, event)}>
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18 18 6M6 6l12 12' />
                          </svg>
                        </span>
                      </div>
                    ))
                )}
          </>
        )}

      </div>
    </>
  )
}

export default Bell
