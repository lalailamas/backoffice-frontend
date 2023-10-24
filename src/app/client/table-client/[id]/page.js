'use client'
import InsideLayout from '@/components/admin/layouts/inside'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getDetailsClient } from '@/api/client'
import DspLoader from '@/components/admin/common/loader'

function DetailsClient () {
//   const router = useRouter()
//   const { id } = router.query
  const [clientData, setClientData] = useState(null)

  useEffect(() => {
  //     if (id) {
  //       // Realizar la solicitud API para obtener los detalles del cliente usando el ID (id)
    getDetailsClient()
      .then((response) => {
        setClientData(response.data)
      })
      .catch((error) => {
        console.error('Error fetching client details:', error)
      })
  }, [])

  if (!clientData) {
    // Muestra un mensaje de carga o cualquier indicador de carga mientras se realiza la solicitud.
    return (
      <div>
        <InsideLayout />

        <DspLoader />
      </div>
    )
  }
  return (
    <>
      <InsideLayout />
      <h1>Detalles del Cliente</h1>
      <p>Nombre: {name}</p>
      <p>Email: {email}</p>
      <p>Teléfono: {phone}</p>
      {/* Mostrar otros detalles del cliente aquí */}
    </>
  )
}

export default DetailsClient
