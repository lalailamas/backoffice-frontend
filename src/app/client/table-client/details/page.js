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
import CreditCardDisplay from './creditcard'
import TransactionList from './transactions'

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

  // const handleCardClick = (payment) => {
  //   // Esta es la función que manejará el clic en el ícono de la tarjeta
  //   // Puedes realizar una acción específica aquí, como mostrar más detalles de la tarjeta, abrir un modal, etc.
  //   console.log('Tarjeta clicada:', payment)
  // }

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

        </div>
      )
    },

    {
      id: 'tabs-message',
      name: 'Métodos de pago',
      active: false,
      content: (
        <div className=''>
          <div className='flex-1'>
            <h2 className='font-semibold mb-5 underline'>Métodos de pago</h2>

            <ul className='grid grid-cols-1 gap-4 overflow-x-auto'>
              {payments.map((payment, index) => (
                <li key={index} className='bg-white border p-4 rounded-lg shadow-md'>
                  <div className='space-y-4'>
                    <div>
                      <h2 className='font-semibold'>Tipo de Pago</h2>
                      <span>{payment.type}</span>

                    </div>
                    {payment.type === 'card' && (

                      <div>
                        <h2 className='font-semibold'>Tarjeta</h2>
                        <span>{payment.cardName}</span>
                        <div />
                      </div>
                    )}
                    {payment.type === 'card' && (
                      <div className=''>
                        <h2 className='font-semibold'>Tipo</h2>
                        <span>{payment.cardType}</span>
                        {/* <FontAwesomeIcon
                          icon={faCreditCard}
                          size='3x'
                          onClick={() => handleCardClick(payment)} // Agrega una función para la interacción
                          className='cursor-pointer'
                        /> */}
                        <CreditCardDisplay />
                      </div>
                    )}
                    {payment.type === 'card' && (
                      <div>
                        <h2 className='font-semibold'>Emisor</h2>
                        <span>{payment.issuer}</span>
                      </div>
                    )}
                    {payment.type === 'card' && (
                      <div>
                        <h2 className='font-semibold'>Procesador</h2>
                        <span>{payment.processor}</span>
                      </div>
                    )}
                    {payment.type === 'balance' && (
                      <div>
                        <h2 className='font-semibold'>Saldo</h2>
                        <span>
                          {payment.currentBalance !== undefined
                            ? payment.currentBalance.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })
                            : 'Sin información'}
                        </span>
                      </div>
                    )}

                    {payment.type === 'balance' && payment.expiresAt !== undefined && (
                      <div>
                        <h2 className='font-semibold'>Fecha de Vencimiento del Saldo</h2>
                        <span>{new Date(payment.expiresAt * 1000).toLocaleDateString()}</span>
                      </div>
                    )}

                    {payment.lastRecharge && payment.lastRecharge.timestamp !== undefined && (
                      <div>
                        <h2 className='font-semibold'>Última Recarga</h2>
                        <span>{new Date(payment.lastRecharge.timestamp * 1000).toLocaleDateString()}</span>
                      </div>
                    )}
                    {payment.lastRecharge && payment.lastRecharge.amount !== undefined && (
                      <div>
                        <h2 className='font-semibold'>Monto Última Recarga</h2>
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
      id: 'tabs-profile',
      name: 'Transacciones',
      active: false,
      content: (
        <div>
          <TransactionList />

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
