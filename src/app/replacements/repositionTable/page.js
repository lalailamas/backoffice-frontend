/* eslint-disable multiline-ternary */
'use client'
import { useState } from 'react'
import DspLoader from '@/components/admin/common/loader'

export default function RepositionTable ({ data }) {
  const [expandedRows, setExpandedRows] = useState([])
  let date
  if (!data || data.length === 0) {
    return (

      <DspLoader />

    )
  }

  return (
    <>
      <div className='overflow-x-auto'>
        {data.data.length > 0 ? (
          <table className='table text-d-dark-dark-purple table-zebra w-full max-[431px]:hidden'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th />
                <th>Transaction Id</th>
                <th>Open Store Type</th>
                <th>Request Timestamp</th>
                <th>Transaction Time</th>
                <th>Details</th>
                <th>Status</th>
                <th>Store ID</th>
                <th>User ID</th>
                <th>User Client ID</th>
                <th>User Client</th>
              </tr>
            </thead>

            <tbody>
              {data.data.map((item) => {
                // const fecha = new Date(item.Fecha)
                // const mes = fecha.toLocaleString('default', { month: 'long' })
                // const dia = fecha.getDate()
                // const hora = fecha.toLocaleTimeString()
                date = new Date(item.requestTimestamp * 1000)

                return (
                  <tr key={item.transactionId}>
                    <td />
                    <td>{item.transactionId}</td>
                    <td>{item.openStoreType}</td>
                    <td>{date.toLocaleString()}</td>
                    <td>{item.transactionTime}</td>
                    <td>
                      <ul>
                        {item.results.restocked && item.results.restocked.length > 0
                          ? (
                              item.results.restocked.map((restockedItem) => (
                                <li key={restockedItem.productId}>
                                  Product: {restockedItem.productId}, QTY: {restockedItem.quantity}
                                </li>
                              ))
                            )
                          : (
                            <li>No restocked items</li>
                            )}
                      </ul>
                    </td>

                    {/* <td>{item.Producto}</td>
                  <td>{item.Añadidos}</td>
                  <td>{item.Removidos}</td>
                  <td>{item.Tienda}</td>
                  <td>{item['ID Reponedor']}</td>
                  <td>{item['Nombre Reponedor']}</td>
                  <td>{item.Fecha}</td>
                  <td>{mes}</td>
                  <td>{dia}</td>
                  <td>{hora}</td> */}
                    <td>{item.status}</td>
                    <td>{item.storeId}</td>
                    <td>{item.userId}</td>
                    <td>{item.userClientId}</td>
                    <td>{item.userClient ? item.userClient : 'No user client'}</td>
                    <td />
                  </tr>
                )
              })}

            </tbody>
          </table>

        ) : (
          <div className=''>
            <p className='text-center'>No hay datos disponibles</p>
          </div>
        )}
      </div>
      <div className='md:hidden'>
        {data.data.map((item) => (
          <div key={item.transactionId} className='pb-2'>
            <div className='flex justify-between w-full md:hidden bg-d-soft-purple p-2 rounded-md'>
              <div className=''>
                <h3>
                  <span className='mr-20 font-bold'>Transaction ID</span>
                  {item.transactionId}
                </h3>
              </div>
              <button
                className='btn'
                onClick={() => {
                  const newExpandedRows = [...expandedRows]
                  if (newExpandedRows.includes(item)) {
                    newExpandedRows.splice(newExpandedRows.indexOf(item), 1)
                  } else {
                    newExpandedRows.push(item)
                  }
                  setExpandedRows(newExpandedRows)
                }}
              >
                <svg width='19' height='8' viewBox='0 0 19 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <g id='&#240;&#159;&#166;&#134; icon &#34;arrow down 1&#34;'>
                    <path id='Vector' d='M9.24372 7.31144C8.52431 7.31144 7.8049 7.08182 7.26021 6.6311L0.559468 1.08641C0.261427 0.839788 0.261427 0.431587 0.559468 0.184966C0.857508 -0.0616553 1.35082 -0.0616553 1.64886 0.184966L8.3496 5.72966C8.84291 6.13786 9.64453 6.13786 10.1378 5.72966L16.8386 0.184966C17.1367 -0.0616553 17.63 -0.0616553 17.928 0.184966C18.226 0.431587 18.226 0.839788 17.928 1.08641L11.2272 6.6311C10.6825 7.08182 9.96313 7.31144 9.24372 7.31144Z' fill='#292D32' />
                  </g>
                </svg>
              </button>
            </div>
            {/* Detalles colapsables */}
            {expandedRows.includes(item) && (
              <div className='mt-2 p-2'>
                <div className='grid grid-cols-2 gap-4'>
                  <h2 className='font-semibold'>OpenStoreType</h2>
                  <span>{item.openStoreType}</span>

                  <h2 className='font-semibold'>RequestTimestamp</h2>
                  <span>{date.toLocaleString()}</span>

                  <h2 className='font-semibold'>TransactionTime</h2>
                  <span>{item.transactionTime}</span>
                </div>
                <div className='grid grid-cols-2 gap-4 mt-4'>
                  <td>
                    <ul>
                      {item.results.restocked && item.results.restocked.length > 0
                        ? (
                            item.results.restocked.map((restockedItem) => (
                              <li key={restockedItem.productId}>
                                Product: {restockedItem.productId}, QTY: {restockedItem.quantity}
                              </li>
                            ))
                          )
                        : (
                          <li>No restocked items</li>
                          )}
                    </ul>
                  </td>
                  <h2 className='font-semibold'>Status</h2>
                  <span>{item.status}</span>

                  <h2 className='font-semibold'>StoreID</h2>
                  <span>{item.storeId}</span>

                  <h2 className='font-semibold'>UserID</h2>
                  <span>{item.userId}</span>

                  <h2 className='font-semibold'>UserClientID</h2>
                  <span>{item.userClient ? item.userClient : 'No user client'}</span>
                </div>
              </div>
            )}
          </div>
        ))}

      </div>

    </>
  )
}
