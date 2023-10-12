import { getLayout } from '@/api/layout'
import { useEffect, useState } from 'react'

export default function useGetLayout (layoutId) {
  console.log(layoutId, 'layoutId')
  const [state, setState] = useState({
    layout: [],
    layoutLoad: true,
    error: null
  })
  const fetchLayout = async (layoutId) => {
    try {
      const layoutResponse = await getLayout(layoutId)
      if (layoutResponse.data) {
        setState({
          layout: layoutResponse.data,
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
    // console.log('this is el useEffect del useGetAll')
    if (layoutId) {
      fetchLayout(layoutId)
    }
  }, [layoutId])

  return {
    ...state
  }
}
