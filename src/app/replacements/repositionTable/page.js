/* eslint-disable multiline-ternary */
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import RepositionTableLoader from '@/app/loader_desktop'
import { useState } from 'react'
import MobileTableLoader from '@/app/loader_mobile'
import { useMediaQuery } from '@react-hook/media-query'

export default function RepositionTable ({ data, stores }) {
  const pathname = usePathname()
  const [expandedRows, setExpandedRows] = useState([])

  function formatTimeDifference (start, end) {
    const startTime = new Date(start)
    const endTime = new Date(end)

    if (isNaN(startTime) || isNaN(endTime)) {
      return '00:00:00'
    }

    const timeDifference = endTime.getTime() - startTime.getTime()

    if (timeDifference <= 0) {
      return '00:00:00'
    }

    const hours = Math.floor(timeDifference / (1000 * 60 * 60))
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  function findStoreName (storeId) {
    const store = stores.find((store) => store.storeId === storeId)
    if (store === undefined) return 'No store'
    return store.name
  }
  function cutDate (date) {
    if (!date) return 'no date'

    // Obtener las partes de la fecha y hora
    const dateTime = new Date(date)

    // Obtener las partes de la fecha (año, mes, día)
    const year = dateTime.getFullYear()
    const month = String(dateTime.getMonth() + 1).padStart(2, '0')
    const day = String(dateTime.getDate()).padStart(2, '0')

    // Obtener las partes de la hora (hora, minutos, segundos)
    const hours = String(dateTime.getHours()).padStart(2, '0')
    const minutes = String(dateTime.getMinutes()).padStart(2, '0')
    const seconds = String(dateTime.getSeconds()).padStart(2, '0')

    // Formatear la fecha en el formato DD-MM-YYYY HH:mm:ss
    const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`

    return formattedDateTime
  }
  function countProducts (restocked) {
    let count = 0
    restocked?.forEach(element => {
      count += element.quantity
    })
    return count
  }

  // Usa useMediaQuery para detectar el tamaño de la pantalla
  const isMobile = useMediaQuery('(max-width: 431px)')

  return (
    <>
      {isMobile ? (
        <div className='md:hidden m-2'>
          {data && data.length === 0 ? (
            <MobileTableLoader />
          ) : (
            data?.map((item) => (
              <div key={item.external_transaction_id} className='pb-2 h-screen'>
                <div className='flex justify-between w-full md:hidden bg-d-soft-purple p-2 rounded-md'>
                  <div>
                    <h3>
                      <span className='mr-5 font-bold'>
                        Tienda
                      </span>
                      {findStoreName(item.store_id)}
                    </h3>
                    <h3>
                      <span className='mr-5 font-bold'>
                        Fecha
                      </span>
                      {cutDate(item.start_timestamp)}
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
                {expandedRows.includes(item) && (
                  <div className='mt-2 p-2'>
                    <div className='grid grid-cols-2 gap-4'>
                      <h2 className='font-semibold'>ID de transacción</h2>
                      <span>{item.external_transaction_id}</span>

                      <h2 className='font-semibold'>Duración</h2>
                      <div>
                        <span>{formatTimeDifference(item.start_timestamp, item.end_timestamp)}</span>
                      </div>

                      <h2 className='font-semibold'>Productos repuestos</h2>
                      <span>{countProducts(item.results?.restocked)}</span>
                    </div>
                    <div className='flex justify-center'>
                      <button className='btn mt-5'>
                        <Link href={`${pathname}/id?id=${item.id}&external_transactionId=${item.external_transaction_id}`} className='hover:underline'>Ver más</Link>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div className='overflow-x-auto p-4'>
          {data && data.length === 0 ? (
            // null
            <RepositionTableLoader key={1} id={1} />

          ) : (
            <table className='table text-d-dark-dark-purple table-zebra mt-8 p-8 max-[431px]:hidden'>
              <thead>

                <tr className='bg-d-dark-dark-purple text-d-white'>
                  <th />
                  <th>ID de Transacción</th>
                  <th>Tienda</th>
                  <th>Fecha</th>
                  <th>Duración</th>
                  <th>Productos Repuestos</th>
                  <th>Detalle</th>
                </tr>

              </thead>
              <tbody>
                {data?.map((item) => (
                  <tr key={item.external_transaction_id}>
                    <td />
                    <td>{item.external_transaction_id}</td>
                    <td>{findStoreName(item.store_id)}</td>
                    <td>{cutDate(item.start_timestamp)}</td>
                    <td>{formatTimeDifference(item.start_timestamp, item.end_timestamp)}</td>
                    <td>{countProducts(item.results?.restocked)}</td>
                    <td><Link href={`${pathname}/id?id=${item.id}&external_transactionId=${item.external_transaction_id}`} className='hover:underline'>Ver más</Link></td>

                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </>
  )
}
