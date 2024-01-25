import { listCategories } from '@/api/categories'
import { useEffect, useState } from 'react'

export default function useGetCategories () {
  const [state, setState] = useState({
    categories: [],
    categoryLoad: true,
    error: null
  })
  const fetchCategories = async () => {
    try {
      const categoriesResponse = await listCategories()
      if (categoriesResponse) {
        setState({
          categories: categoriesResponse,
          categoryLoad: false,
          error: null
        })
      }
    } catch (error) {
      setState({
        categories: [],
        categoryLoad: false,
        error: error.message
      })
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  return {
    ...state
  }
}
