/* eslint-disable multiline-ternary */
'use client'
import InsideLayout from '@/components/admin/layouts/inside'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getDetailsClient } from '@/api/client'
import DspLoader from '@/components/admin/common/loader'
import Link from 'next/link'
import TabsComponent from '@/components/admin/common/tabs'

function DetailsClient () {
  const searchParams = useSearchParams()
  // console.log(searchParams, 'search Params')
  const id = searchParams.get('clientId')
  // console.log(id, 'id cliente')
  const [clientData, setClientData] = useState(null)
  // const router = useRouter()

  useEffect(() => {
    if (id) {
      // console.log(id, 'id dentro el useEffect')
      getDetailsClient(id)
        .then((response) => {
          console.log(response.data.data, 'respuesta get')
          setClientData(response.data.data)
        })
        .catch((error) => {
          console.error('Error fetching client details:', error)
        })
    }
  }, [id])

  if (!clientData) {
    return (
      <div>
        <InsideLayout />
        <DspLoader />
      </div>
    )
  }

  const { name, email, phone, payments } = clientData

  const tabs = [
    {
      id: 'tabs-home',
      name: 'Perfil',
      active: true,
      content: (
        <div className='flex flex-col gap-4'>
          <h2 className='font-semibold mb-3 underline'>Datos personales</h2>

          <div className='flex-1'>
            <h2 className='font-semibold'>Nombre</h2>
            <span>{name}</span>
          </div>
          <div className='flex-1'>
            <h2 className='font-semibold'>Email</h2>
            <span>{email}</span>
          </div>
          <div className='flex-1'>
            <h2 className='font-semibold'>Teléfono</h2>
            <span>{phone ? `${phone.areaCode} ${phone.number}` : 'Sin información'}</span>
          </div>
          <div className='flex-1'>
            <h2 className='font-semibold mt-10 mb-5 underline'>Métodos de pago</h2>
            <ul className='grid grid-cols-1 gap-4 overflow-x-auto'>
              {payments.map((payment, index) => (
                <li key={index} className='bg-white border p-4 rounded-lg shadow-md'>
                  TODO: CADA TIPO DE PAGO TIENE DIFERENTES OPCIONES, SON DIFERENTES, FIX
                  <div className='space-y-4'>
                    <div>
                      <h2 className='font-semibold'>Tipo de Pago</h2>
                      <span>{payment.type}</span>
                    </div>
                    <div>
                      <h2 className='font-semibold'>Tarjeta</h2>
                      <span>{payment.cardName}</span>
                    </div>
                    <div>
                      <h2 className='font-semibold'>Emisor</h2>
                      <span>{payment.issuer}</span>
                    </div>
                    <div>
                      <h2 className='font-semibold'>Procesador</h2>
                      <span>{payment.processor}</span>
                    </div>

                    {payment.lastRecharge && payment.lastRecharge.timestamp !== undefined && (
                      <div>
                        <h2 className='font-semibold'>Última Recarga</h2>
                        <span>{new Date(payment.lastRecharge.timestamp * 1000).toLocaleDateString()}</span>
                      </div>
                    )}
                    {payment.lastRecharge && payment.lastRecharge.amount !== undefined && (
                      <div>
                        <h2 className='font-semibold'>Monto de Recarga</h2>
                        <span>
                          {payment.lastRecharge.amount !== undefined
                            ? payment.lastRecharge.amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
                            : 'Sin información'}
                        </span>
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>

          </div>
        </div>
      )
    },

    {
      id: 'tabs-message',
      name: 'Tarjetas',
      active: false,
      content: (
        <div className='grid grid-cols-2 gap-1 overflow-x-auto'>
          {/* Contenido del Tab 3 */}
        </div>
      )
    },
    {
      id: 'tabs-profile',
      name: 'Transacciones',
      active: false,
      content: (
        <div>
          {/* Contenido del Tab 2 */}

        </div>
      )
    }
  ]
  return (
    <>
      <InsideLayout />
      <div className='flex justify-center'>
        <div className='mt-4 p-4 m-2 border rounded-xl shadow-lg '>
          <h1 className='mb-10 text-d-dark-dark-purple text-2xl font-bold text-center'>Información Cliente</h1>
          <TabsComponent tabs={tabs} />

          <button className='mt-8'>
            <Link href='/client/table-client'>
              <span className='items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple mt-8'>Atrás</span>
            </Link>
          </button>
        </div>
      </div>
    </>
  )
}

export default DetailsClient
