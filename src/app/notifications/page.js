'use client'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import { useEffect, useState } from 'react'

const IndexPage = () => {
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    const eventSource = new EventSource('http://localhost:3500/api/notification/reite/subscribe') //eslint-disable-line

    eventSource.onmessage = (event) => {
      const newNotification = JSON.parse(event.data)
      setNotifications(prevNotifications => [...prevNotifications, newNotification])
    }

    eventSource.onerror = (error) => {
      console.error('Error de EventSource:', error)
    }

    return () => {
      eventSource.close()
    }
  }, [])

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
          <li key={index}>{`${notification.store} está ${notification.status}`}</li>
        ))}
      </ul>
    </div>
  )
}

export default IndexPage
