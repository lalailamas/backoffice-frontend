import { getReiteProdByStore } from '@/api/product/reite'
import { useEffect, useState } from 'react'

export default function useGetProdByStore (id) {
  const [state, setState] = useState({
    products: [],
    loading: true,
    error: null
  })
  async function fetchAllReiteData () {
    console.log('entré al fetchAllReiteData', id)
    try {
      const productsResponse = await getReiteProdByStore(id)
      console.log('la respuesta del coso', productsResponse.data)
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
    // console.log('this is el useEffect del useGetAll')

    fetchAllReiteData()
  }, [])

  return {
    ...state
  }
}
