import { getLayout } from '@/api/layout'
import { useEffect, useState } from 'react'

export default function useGetLayout (layoutId) {
  const [state, setState] = useState({
    layout: [],
    loading: true,
    error: null
  })
  const fetchLayout = async (layoutId) => {
    try {
      const layoutResponse = await getLayout(layoutId)
      if (layoutResponse.data) {
        setState({
          layout: layoutResponse.data,
          loading: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        layout: [],
        loading: false,
        error: error.message
      })
    }
  }
  useEffect(() => {
    // console.log('this is el useEffect del useGetAll')
    if (layoutId) {
      fetchLayout(layoutId)
    }
  }, [layoutId])

  return {
    ...state
  }
}
