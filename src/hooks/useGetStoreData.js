import { getStores } from '@/api/store'
import { useEffect, useState } from 'react'

function useGetStoreData (storeId) {
  const [state, setState] = useState({
    store: [],
    storeLoad: true,
    error: null
  })
  const fetchStoreById = async () => {
    try {
      const storesResponse = await getStores()
      console.log(storesResponse, '--------------storeResponse-------------')
      if (storesResponse) {
        const storeResponse = storesResponse.data.filter((store) => store.storeId === storeId)
        setState({
          store: storeResponse,
          storeLoad: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        store: [],
        storeLoad: false,
        error: error.message
      })
    }
  }

  useEffect(() => {
    if (storeId) {
      fetchStoreById(storeId)
    }
  }, [storeId])

  return {
    ...state
  }
}

export default useGetStoreData
