import { getTransitionData } from '@/api/layout'
import { useEffect, useState } from 'react'

export default function useGetTransitionLayout (storeId, layoutId) {
  const [state, setState] = useState({
    layout: null,
    layoutLoad: true,
    error: null
  })

  const fetchTransitionLayout = async (storeId, layoutId) => {
    try {
      const layout = await getTransitionData(storeId, layoutId)
      if (layout) {
        setState({
          layout,
          layoutLoad: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        layout: null,
        layoutLoad: false,
        error: error.message
      })
    }
  }
  useEffect(() => {
    if (storeId && layoutId) {
      fetchTransitionLayout(storeId, layoutId)
    }
  }, [storeId, layoutId])
  return {
    ...state
  }
}
