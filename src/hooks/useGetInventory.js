import { getInventoryByStore } from '@/api/store'
import { useEffect, useState } from 'react'

export default function useGetInventory (storeId) {
  // console.log('entré al useGetAll')
  console.log(storeId, 'storeId')
  //   console.log(layoutId, 'layoutId')
  const [state, setState] = useState({
    inventory: [],
    loading: true,
    error: null
  })
  const fetchInventoryByStore = async (storeId) => {
    // console.log('entré al fetchInventoryByStore', storeId)
    try {
      const inventoryResponse = await getInventoryByStore(storeId)
      // console.log('la respuesta del coso', inventoryResponse.data)
      if (inventoryResponse.data) {
        setState({
          inventory: inventoryResponse.data,
          loading: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        inventory: [],
        loading: false,
        error: error.message
      })
    }
  }

  useEffect(() => {
    // console.log('this is el useEffect del useGetAll')
    if (storeId) {
      fetchInventoryByStore(storeId)
    //   fetchLayout(layoutId)
    //   fetchAllReiteData()
    }
  }, [storeId])

  return {
    ...state
  }
}
