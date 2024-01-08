import { getReiteProdByStore } from '@/api/product/reite'
import { useEffect, useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import { withScope } from '@sentry/nextjs'

export default function useGetProdByStore (id) {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null
  })
  async function fetchAllReiteData () {
    try {
      const productsResponse = await getReiteProdByStore(id)
      if (productsResponse) {
        // console.log(productsResponse, 'respuesta productos')
        setState({
          products: productsResponse,
          loading: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        products: [],
        loading: false,
        error: error.message
      })
      withScope((scope) => {
        scope.setExtras(error.response.data)
        Sentry.captureException(error)
      })
    }
  }
  useEffect(() => {
    fetchAllReiteData()
  }, [])

  return {
    ...state
  }
}
