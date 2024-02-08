import { getAllReiteData } from '@/api/product/reite'
import { useEffect, useState } from 'react'

export default function useGetReiteProd () {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null
  })
  async function fetchAllReiteData () {
    try {
      const productsResponse = await getAllReiteData()
      if (productsResponse) {
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
    }
  }
  useEffect(() => {
    fetchAllReiteData()
  }, [])

  return {
    ...state
  }
}
