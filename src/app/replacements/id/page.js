'use client'
import DspLoader from '@/components/admin/common/loader'
import getTransactionsById from '@/hooks/useGetTransactionsById'
import { useSearchParams } from 'next/navigation'
import React from 'react'
import OperationTable from './operationTable'
import InsideLayout from '@/components/admin/layouts/inside'
import { Card, Grid, Metric, Text } from '@tremor/react'
import Image from 'next/image'
import store from '@/utils/images/store.jpg'

function page () {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const externalTransactionId = searchParams.get('external_transactionId')

  const { OperationStock, loading } = getTransactionsById(id, externalTransactionId)

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
                    <Text>TIEMPO PROMEDIO REPOSICIÓN</Text>
                    <Metric>{formatTimeDifference(OperationStock[0].start_timestamp, OperationStock[0].end_timestamp)}</Metric>
                  </Card>
                  <Card className='text-center'>
                    <Text>Productos Repuestos</Text>
                    <Metric>{OperationStock[0].results.purchased.length}</Metric>
                  </Card>
                  <Card className='text-center'>
                    <Text>Productos Retirados</Text>
                    <Metric>{OperationStock[0].results.restocked.length}</Metric>
                  </Card>

                </Grid>
              </Card>

              <div className='mt-2 mx-2 border border-gray-500 rounded-md p-4 w-full flex justify-center'>

                <Card className='text-center'>
                  <Text>Imagen antes de abrir tienda</Text>

                  <Image src={store} alt='store' className=' w-96 m-2' />
                </Card>

                <Card className='text-center'>
                  <Text>Imagen luego de cerrar tienda</Text>

                  <Image src={store} alt='store' className=' w-96 m-2' />
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
