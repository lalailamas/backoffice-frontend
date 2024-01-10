import { getLayout } from '@/api/layout'
import { useEffect, useState } from 'react'

export default function useGetLayout (layoutId) {
  const [state, setState] = useState({
    layout: [],
    layoutLoad: true,
    error: null
  })
  const fetchLayout = async (layoutId) => {
    try {
      const layoutResponse = await getLayout(layoutId)
      if (layoutResponse) {
        setState({
          layout: layoutResponse,
          layoutLoad: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        layout: [],
        layoutLoad: false,
        error: error.message
      })
    }
  }
  useEffect(() => {
    if (layoutId) {
      fetchLayout(layoutId)
    }
  }, [layoutId])

  return {
    ...state
  }
}
