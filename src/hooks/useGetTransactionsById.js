import { getStockOperationById } from '@/api/restock'
import { useEffect, useState } from 'react'

export default function getTransactionsById (id, externalTransactionId) {
  const [state, setState] = useState({
    OperationStock: [],
    loading: true,
    error: null
  })
  async function fetchOperationData () {
    try {
      const operationResponse = await getStockOperationById(id, externalTransactionId)
      // console.log('operationResponse', operationResponse)
      if (operationResponse) {
        setState({
          OperationStock: operationResponse,
          loading: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        OperationStock: [],
        loading: false,
        error: error.message
      })
    }
  }
  useEffect(() => {
    fetchOperationData()
  }, [])

  return {
    ...state
  }
}
