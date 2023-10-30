/* eslint-disable multiline-ternary */
'use client'
import InsideLayout from '@/components/admin/layouts/inside'
// import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { getDetailsClient } from '@/api/client'
import DspLoader from '@/components/admin/common/loader'
import Link from 'next/link'

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
          // console.log(response.data.data, 'respuesta get')
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

  return (
    <>
      <InsideLayout />
      <div className='flex justify-center'>
        <div className='mt-4 p-4 m-2 border rounded-xl shadow-lg '>
          <h1 className='mb-10 text-d-dark-dark-purple text-2xl font-bold text-center'>Ficha Cliente</h1>
          <div className='grid grid-cols-2 gap-1 overflow-x-auto'>
            <h2 className='font-semibold'>Nombre</h2>
            <span>{name}</span>
            <h2 className='font-semibold'>Email</h2>
            <div>
              <span>{email}</span>
            </div>
            <h2 className='font-semibold'>Teléfono</h2>
            <span>{phone ? `${phone.areaCode} ${phone.number}` : 'Sin información'}</span>

          </div>
          <h2 className='font-semibold mt-10 mb-5'>Pagos</h2>
          <ul className='overflow-x-auto'>
            {payments && payments.length > 0 ? (
              payments.map((payment, index) => (
                <li key={index} className='grid grid-cols-2 gap-1'>
                  <p className='font-semibold'>Tipo de Pago</p> <span>{payment.type}</span>
                  <p className='font-semibold'>Saldo</p> <span className='font-bold'>{payment.balance !== undefined ? payment.balance.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) : 'Sin información'}</span>
                  <p className='font-semibold'>Saldo Actual</p> <span className='font-bold'>{payment.currentBalance !== undefined ? payment.currentBalance.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) : 'Sin información'}</span>
                  <p className='font-semibold'>Fecha de Vencimiento</p> <span>{payment.expiresAt !== undefined ? new Date(payment.expiresAt * 1000).toLocaleDateString() : 'Sin información'}</span>
                  <div className='col-span-2'>
                    {payment.lastRecharge && payment.lastRecharge.timestamp !== undefined && (
                      <div className='grid grid-cols-2 gap-1'>
                        <p className='font-semibold'>Última Recarga</p> <span>{new Date(payment.lastRecharge.timestamp * 1000).toLocaleDateString()}</span>
                        <p className='font-semibold'>Monto de Recarga</p> <span className='font-bold'>{payment.lastRecharge.amount !== undefined ? payment.lastRecharge.amount.toLocaleString('es-CL', { style: 'currency', currency: 'CLP' }) : 'Sin información'}</span>
                      </div>
                    )}
                  </div>
                </li>
              ))
            ) : (
              <li>Sin información de pagos</li>
            )}
          </ul>
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
