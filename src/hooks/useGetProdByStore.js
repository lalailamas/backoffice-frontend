import { getReiteProdByStore } from '@/api/product/reite'
import { useEffect, useState } from 'react'

export default function useGetProdByStore (id) {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null
  })
  async function fetchAllReiteData () {
    try {
      const productsResponse = await getReiteProdByStore(id)
      if (productsResponse.data) {
        setState({
          products: productsResponse.data,
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
    }
  }
  useEffect(() => {
    fetchAllReiteData()
  }, [])

  return {
    ...state
  }
}