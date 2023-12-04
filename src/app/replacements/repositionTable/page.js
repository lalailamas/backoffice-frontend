/* eslint-disable multiline-ternary */
'use client'
import React from 'react'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function RepositionTable ({ data, stores }) {
  console.log(data, 'data')
  console.log(stores, 'stores')
  const pathname = usePathname()

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
    return store.name
  }
  function cutDate (date) {
    if (!date) return 'no date'

    // Obtener las partes de la fecha (año, mes, día)
    const [year, month, day] = date.slice(0, 10).split('-')

    // Formatear la fecha en el formato DD-MM-YYYY
    const formattedDate = `${day}-${month}-${year}`

    return formattedDate
  }
  function countProducts (restocked) {
    let count = 0
    restocked?.forEach(element => {
      count += element.quantity
    })
    return count
  }

  return (
    <>
      <div className='overflow-x-auto'>
        {data?.length > 0 ? (
          <table className='table text-d-dark-dark-purple table-zebra w-full max-[431px]:hidden'>
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
              {data.map((item) => (
                <tr key={item.external_transaction_id}>
                  <td />
                  <td>{item.external_transaction_id}</td>
                  <td>{findStoreName(item.store_id)}</td>
                  <td>{cutDate(item.start_timestamp)}</td>
                  <td>{formatTimeDifference(item.start_timestamp, item.end_timestamp)}</td>
                  <td>{countProducts(item.results?.restocked)}</td>
                  <td><Link href={`${pathname}/id?id=${item.id}&external_transactionId=${item.external_transaction_id}`}>ver más</Link></td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className=''>
            <p className='text-center'>No hay datos disponibles</p>
          </div>
        )}
      </div>
    </>
  )
}

// function formatLocalDate (utcFechaString) {
//   if (!utcFechaString) return 'no date'
//   // Crear un objeto Date desde la cadena de fecha UTC
//   const fechaUtc = new Date(utcFechaString)

//   // Obtener opciones de formato para la zona horaria local
//   const opcionesDeFormato = {
//     year: 'numeric',
//     month: '2-digit',
//     day: '2-digit',
//     hour: '2-digit',
//     minute: '2-digit',
//     second: '2-digit',
//     fractionalSecondDigits: 3,
//     timeZoneName: 'short'
//   }

//   // Formatear la fecha en el formato de la zona horaria local
//   const formatoLocal = new Intl.DateTimeFormat(undefined, opcionesDeFormato)
//   const fechaFormateada = formatoLocal.format(fechaUtc)

//   return fechaFormateada
// }
// [
// {
//   "id": 12,
//   "external_transaction_id": "179a1ea6-2e9e-40dc-a247-e3cbc9e60074",
//   "store_id": "DEV_CNV_002",
//   "start_timestamp": "2023-11-06T13:39:39.619Z",
//   "end_timestamp": "2023-11-06T13:45:08.638Z",
//   "comments": "string de prueba",
//   "start_image_url": null,
//   "end_image_url": null,
//   "products": [
//     {
//       "productId": "DEV_CNV_048",
//       "productName": "Redbull 250ml",
//       "img": "https://storage.googleapis.com/reite-store-products/RED_BULL_250.webp",
//       "stockBefore": 7,
//       "stockAfter": 7
//     },
//     {
//       "productId": "DEV_CNV_059",
//       "productName": "Yogurt Protein con Frutos Secos 150gr",
//       "img": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_059/YOGHURT_PROTEIN_FRUTOS_SECOS.webp",
//       "stockBefore": 6,
//       "stockAfter": 6
//     },
//     {
//       "productId": "DEV_CNV_057",
//       "productName": "Galleta Tritón Vainilla 126gr",
//       "img": "https://storage.googleapis.com/smart-stores-dev-products/WE862T5CBxVkuzyI9GnT/CNV_057/TRITON_126.webp",
//       "stockBefore": 7,
//       "stockAfter": 7
//     }
//   ],
//   "results": {
//     "after": [],
//     "purchased": [
//       {
//         "quantity": 2,
//         "productId": "DEV_CNV_004"
//       },
//       {
//         "quantity": 2,
//         "productId": "DEV_CNV_006"
//       }
//     ],
//     "restocked": [
//       {
//         "quantity": 2,
//         "productId": "DEV_CNV_004"
//       },
//       {
//         "quantity": 2,
//         "productId": "DEV_CNV_006"
//       },
//       {
//         "quantity": 3,
//         "productId": "DEV_gNfXKMwp6zNULBXQ5hy9"
//       }
//     ],
//     "before": []
//   }
// }
// ]
