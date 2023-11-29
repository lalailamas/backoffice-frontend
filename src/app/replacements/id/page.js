'use client'
import DspLoader from '@/components/admin/common/loader'
import getTransactionsById from '@/hooks/useGetTransactionsById'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import OperationTable from './operationTable'
import InsideLayout from '@/components/admin/layouts/inside'
import { Card, Grid, Metric, Text } from '@tremor/react'
import Image from 'next/image'
// const store = 'https://despnsa247-public-files.s3.amazonaws.com/gabinete1.jpg'

function page () {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const externalTransactionId = searchParams.get('external_transactionId')

  const { OperationStock, loading } = getTransactionsById(id, externalTransactionId)
  console.log('OperationStock', OperationStock)

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
  function formatLocalDate (utcFechaString) {
    if (!utcFechaString) return 'no date'
    // Crear un objeto Date desde la cadena de fecha UTC
    const fechaUtc = new Date(utcFechaString)

    // Obtener opciones de formato para la zona horaria local
    const opcionesDeFormato = {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }

    // Formatear la fecha en el formato de la zona horaria local
    const formatoLocal = new Intl.DateTimeFormat(undefined, opcionesDeFormato)
    const fechaFormateada = formatoLocal.format(fechaUtc)

    return fechaFormateada
  }
  function countProducts (restocked) {
    let count = 0
    restocked?.forEach(element => {
      count += element.quantity
    })
    return count
  }
  function cutDate (date) {
    if (!date) return 'no date'

    // Obtener las partes de la fecha (año, mes, día)
    const [year, month, day] = date.slice(0, 10).split('-')

    // Formatear la fecha en el formato DD-MM-YYYY
    const formattedDate = `${day}-${month}-${year}`

    return formattedDate
  }

  return (
    <div>
      {(loading)
        ? (<DspLoader />)
        : (
          <div>
            <InsideLayout />
            <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center p-4 '>Detalle de Reposición</h2>
            <div className='flex justify-center w-full'>
              <Card className='w-full justify-center mt-2'>
                <Grid numItems={2} numItemsSm={2} numItemsLg={2} className='gap-2'>
                  <Card className='text-center'>
                    <Text>Duración de la reposición</Text>
                    <Metric>{formatTimeDifference(OperationStock[0].start_timestamp, OperationStock[0].end_timestamp)}</Metric>
                  </Card>
                  <Card className='text-center'>
                    <Text>Fecha</Text>
                    <Metric>{cutDate(OperationStock[0].start_timestamp)}</Metric>
                  </Card>
                  <Card className='text-center'>
                    <Text>Hora inicio de reposición</Text>
                    <Metric>{formatLocalDate(OperationStock[0].start_timestamp)}</Metric>
                  </Card>
                  <Card className='text-center'>
                    <Text>Hora fin de reposición</Text>
                    <Metric>{formatLocalDate(OperationStock[0].end_timestamp)}</Metric>
                  </Card>
                  <Card className='text-center'>
                    <Text>Productos Retirados</Text>
                    <Metric>{countProducts(OperationStock[0].results?.purchased)}</Metric>
                  </Card>
                  <Card className='text-center'>
                    <Text>Productos Repuestos</Text>
                    <Metric>{countProducts(OperationStock[0].results?.restocked)}</Metric>
                  </Card>
                  <Card className='text-center'>
                    <Text>Monto merma</Text>
                    <Metric>$0</Metric>
                  </Card>
                </Grid>
                <Grid numItems={1} numItemsSm={1} numItemsLg={1} className='gap-2 mt-2'>
                  <Card className='text-center'>
                    <Text className='text-center font-bold'>Comentarios</Text>
                    <Text>{OperationStock[0]?.comments || 'sin comentarios'}</Text>

                  </Card>
                </Grid>
              </Card>

              <div className='mt-2 mx-2 border border-gray-500 rounded-md p-4 w-full flex justify-center'>

                <Card className='text-center'>
                  <Text>Imagen antes de abrir tienda</Text>

                  {OperationStock[0].start_image_url
                    ? <Image
                        src={OperationStock[0]?.start_image_url}
                        alt='store'
                        className='w-96 m-2'
                        width={1300} // Establece el ancho deseado
                        height={500}
                      />
                    : null}
                </Card>

                <Card className='text-center'>
                  <Text>Imagen luego de cerrar tienda</Text>
                  {OperationStock[0].start_image_url
                    ? <Image
                        src={OperationStock[0]?.end_image_url}
                        alt='store'
                        className='w-96 m-2'
                        width={1300} // Establece el ancho deseado
                        height={500}
                      />
                    : null}
                </Card>

              </div>
            </div>
            <div className='overflow-x-auto p-10 mt-8'>
              <OperationTable data={OperationStock[0]} />
            </div>

          </div>
          )}
    </div>
  )
}

export default page
