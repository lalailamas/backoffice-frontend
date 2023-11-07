'use client'
import DspLoader from '@/components/admin/common/loader'
import getTransactionsById from '@/hooks/useGetTransactionsById'
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import OperationTable from './operationTable'
import InsideLayout from '@/components/admin/layouts/inside'

function page () {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const externalTransactionId = searchParams.get('external_transactionId')
  console.log('id', id)
  console.log('external_transaction_id', externalTransactionId)
  const { OperationStock, loading, error } = getTransactionsById(id, externalTransactionId)
  console.log('OperationStock', OperationStock)
  console.log(error, 'error')

  return (
    <div>
      {(loading)
        ? (<DspLoader />)
        : (
          <div>
            <InsideLayout />
            <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center p-4 '>Detalle de Reposición</h2>
            <div className='overflow-x-auto p-10 mt-8'>
              <OperationTable data={OperationStock[0]} />
            </div>

          </div>
          )}
    </div>
  )
}

export default page
