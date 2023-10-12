import { getInventoryByStore } from '@/api/store'
import { useEffect, useState } from 'react'

export default function useGetInventory (storeId) {
  const [state, setState] = useState({
    inventory: [],
    inventoryLoad: true,
    error: null
  })
  const fetchInventoryByStore = async (storeId) => {
    try {
      const inventoryResponse = await getInventoryByStore(storeId)
      if (inventoryResponse.data) {
        setState({
          inventory: inventoryResponse.data,
          inventoryLoad: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        inventory: [],
        inventoryLoad: false,
        error: error.message
      })
    }
  }

  useEffect(() => {
    if (storeId) {
      fetchInventoryByStore(storeId)
    }
  }, [storeId])

  return {
    ...state
  }
}
