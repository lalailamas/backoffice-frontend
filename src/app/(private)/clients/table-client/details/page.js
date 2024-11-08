/* eslint-disable multiline-ternary */
'use client'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getDetailsClient } from '@/api/client'
import DspLoader from '@/components/admin/common/loader'
import TabsComponent from '@/components/admin/common/tabs'
import CreditCardDisplay from './creditcard'
import useGetStores2 from '@/hooks/useStores2'
import SimpleModal from '@/components/admin/modals/simpleModal'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import GoBack from '@/components/admin/common/goback'

function DetailsClient () {
  const searchParams = useSearchParams()
  const id = searchParams.get('clientId')
  const { stores } = useGetStores2(false)
  const [clientData, setClientData] = useState(null)
  const [modalVisible, setModalVisible] = useState(false)

  const handleConfirmationModal = () => {
    setModalVisible(!modalVisible)
  }

  const getStoreName = (storeId) => {
    if (stores) {
      for (const store of stores) {
        if (store.storeId === storeId) {
          return store.name
        }
      }
    }
  }

  useEffect(() => {
    if (id) {
      getDetailsClient(id)
        .then((response) => {
          setClientData(response.data)
        })
        .catch((error) => {
          console.error('Error fetching client details:', error)
        })
    }
  }, [id])

  if (!clientData) {
    return (
      <div>
        <DspLoader />
      </div>
    )
  }

  const { name, email, phone, stats, payments, transactions } = clientData

  const tabs = [
    {
      id: 'tabs-home',
      name: 'Perfil',
      active: true,
      content: (
        <div className='flex flex-col gap-4'>
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
                        <CreditCardDisplay
                          cardholder={payment.cardHolderName}
                          cardNumber={payment.lastFourDigits}
                          expiredMonth={payment.expirationDate.split('/')[0]}
                          expiredYear={payment.expirationDate.split('/')[1]}
                          cardType={payment.cardName.toLowerCase()}
                        />
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
                      <div className='relative'>
                        <img
                          style={{ position: 'absolute', right: 0, top: -50 }}
                          src='/img/wallet.svg'
                          width={100}
                          height={60}
                        />
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
        <div className=''>
          <div className='flex flex-col '>
            <h1 className='text-center text-sm font-semibold mb-4'>Resumen General</h1>
            <div className='flex flex-wrap justify-between mb-4'>
              <article className='rounded-lg overflow-hidden shadow transform transition-all w-full sm:w-1/3'>
                <div className='text-center m-5'>
                  <p className='text-2xl font-bold text-black'>{stats.transactions}</p>
                  <h3 className='text-sm leading-6 font-medium text-gray-400'>Transacciones</h3>
                </div>
              </article>
              <article className='rounded-lg overflow-hidden shadow transform transition-all w-full sm:w-1/3 '>
                <div className='text-center m-5'>
                  <p className='text-2xl font-bold text-black'>{stats.openings}</p>
                  <h3 className='text-sm leading-6 font-medium text-gray-400'>Aperturas</h3>
                </div>
              </article>
              <article className='rounded-lg overflow-hidden shadow transform transition-all w-full sm:w-1/3'>
                <div className='text-center m-5'>
                  <p className='text-2xl font-bold text-black'>{stats.spent.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' })}</p>
                  <h3 className='text-sm leading-6 font-medium text-gray-400'>Gastado</h3>
                </div>
              </article>
            </div>

          </div>
          <h1 className='text-sm font-bold px-2 pb-2'>
            Historial
          </h1>

          <div className='overflow-auto'>
            <table className=' '>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className='bg-white p-4 rounded-lg shadow-md border-b-2 border-d-gray'>
                    <td className='text-gray-400 py-2 px-2 text-xs w-full'>
                      <div className='flex flex-wrap justify-between'>
                        <div>
                          <span className='font-bold mr-2'> Fecha:</span>
                          <span>{new Date(transaction.timestamp * 1000).toLocaleDateString()}</span>
                        </div>
                        <div className=''>
                          <a
                            className='text-d-neon-purple text-xs hover:underline' href='#' onClick={() => {
                              handleConfirmationModal()
                            }}
                          >{transaction.id}
                          </a>
                        </div>
                        {modalVisible && (
                          <SimpleModal
                            handleConfirmationModal={handleConfirmationModal}
                            title='Comprobante de compra'
                            message={
                              <div>
                                <div className='text-xs grid grid-cols-2'>
                                  <span>ID</span>
                                  <span>{transaction.id}</span>
                                </div>
                                <div className='text-xs grid grid-cols-2'>
                                  <span>Método de pago</span>
                                  <span>{transaction.paymentMethod}</span>
                                </div>
                                <div className='text-xs grid grid-cols-2'>
                                  <span>Productos</span>
                                  <div>
                                    {transaction.products.map((product, index) => (
                                      <div key={index}>{product.name}</div>
                                    ))}
                                  </div>
                                </div>
                                <div className='text-xs grid grid-cols-2'>
                                  Monto
                                  <span>
                                    {transaction.amount.toLocaleString('es-CL', {
                                      style: 'currency',
                                      currency: 'CLP'
                                    })}
                                  </span>
                                </div>
                                <div className='text-xs grid grid-cols-2'>
                                  <span>Estado</span>
                                  <span>{transaction.status}</span>
                                </div>
                              </div>
                              }
                            cancelButtonText='Cancelar'
                          />
                        )}
                      </div>
                      <div className='leading-10 grid text-black py-2'>
                        <div className='text-xs grid grid-cols-2'>
                          Tienda
                          <span>{getStoreName(transaction.storeId)}</span>
                        </div>
                        <div className='text-xs grid grid-cols-2'>
                          Monto
                          <span>
                            {transaction.amount.toLocaleString('es-CL', {
                              style: 'currency',
                              currency: 'CLP'
                            })}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td />

                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )
    }
  ]
  return (
    <>
      <div className='flex justify-center'>
        <div className='mt-4 p-4 m-2 border rounded-xl shadow-lg '>
          <MainTitle>Información del Cliente</MainTitle>
          <GoBack />
          <div className=''>
            <TabsComponent tabs={tabs} />
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsClient
