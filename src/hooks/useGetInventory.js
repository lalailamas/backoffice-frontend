import { getInventoryByStore } from '@/api/store'
import { useEffect, useState } from 'react'

export default function useGetInventory (storeId) {
  console.log('entré al useGetAll')
  //   console.log(storeId, 'storeId')
  //   console.log(layoutId, 'layoutId')
  const [state, setState] = useState({
    inventory: [],
    error: null
  })
  const fetchInventoryByStore = async (storeId) => {
    console.log('entré al fetchInventoryByStore', storeId)
    try {
      const inventoryResponse = await getInventoryByStore(storeId)
      console.log('la respuesta del coso', inventoryResponse.data)
      if (inventoryResponse.data) {
        setState({
          ...state,
          inventory: inventoryResponse.data
        })
      }
    } catch (error) {
      setState({
        ...state,
        error
      })
    }
  }

  useEffect(() => {
    console.log('this is el useEffect del useGetAll')
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
