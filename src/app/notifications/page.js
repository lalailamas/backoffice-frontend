'use client'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'

const IndexPage = () => {
  const { data: session, status } = useSession()
  console.log(session?.user.email)
  const [notifications, setNotifications] = useState([])
  console.log(notifications)

  useEffect(() => {
    if (status === 'authenticated' && session.user.email) {
      try {
        const eventSource = new EventSource('http://localhost:3500/api/notification/subscribe?email=graciana.baratti@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        })

        eventSource.onmessage = (event) => {
          const newNotification = JSON.parse(event.data)
          console.log(newNotification, 'newNotification')

          // Verificar si la notificación ya existe en el estado
          if (notifications.find(notification => notification.id === newNotification.id)) return

          // Agregar la nueva notificación al estado
          setNotifications(prevNotifications => [...prevNotifications, newNotification])
        }

        eventSource.onerror = (error) => {
          console.error('Error de EventSource:', error)
        }

        return () => {
          eventSource.close()
        }
      } catch (e) {
        console.log(e)
      }
    }
  }, [status, session])

  const handleNotify = async (store, status) => {
    await fetch('http://localhost:3500/api/notification/reite/store/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ store, status })
    })
  }

  return (
    <div className='flex flex-col p-4'>
      <h1>Estado de las Tiendas</h1>
      <ButtonPrimary text='Tienda A UP' onClick={() => handleNotify('Tienda A', 'UP')} />
      <ButtonPrimary text='Tienda A DOWN' onClick={() => handleNotify('Tienda A', 'DOWN')} />
      <ButtonPrimary text='Tienda B UP' onClick={() => handleNotify('Tienda B', 'UP')} />
      <ButtonPrimary text='Tienda B DOWN' onClick={() => handleNotify('Tienda B', 'DOWN')} />
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{`${notification.title}: ${notification.body}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPage
