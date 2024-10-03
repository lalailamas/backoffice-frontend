import { useState, useEffect } from 'react'
import { listCategories } from '@/api/categories'

export function useCategorySelector () {
  const [allCategories, setAllCategories] = useState([])
  const [selectedFirstCategory, setSelectedFirstCategory] = useState('')
  const [selectedSecondCategory, setSelectedSecondCategory] = useState('')
  const [selectedThirdCategory, setSelectedThirdCategory] = useState('')

  // Fetch all categories (could be optimized with caching)
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await listCategories(100, 1)
        if (response) {
          setAllCategories(response.data.data)
        }
      } catch (error) {
        console.error('Error fetching categories:', error)
      }
    }
    fetchAllCategories()
  }, [])

  // Reset the categories
  const resetCategories = () => {
    setSelectedFirstCategory('')
    setSelectedSecondCategory('')
    setSelectedThirdCategory('')
  }

  // Get second categories based on the first category
  const getSecondCategoryOptions = () => {
    if (!selectedFirstCategory) return []
    const firstCategory = allCategories.find(cat => cat.id === parseInt(selectedFirstCategory))
    return firstCategory?.second_categories || []
  }

  // Get third categories based on the second category
  const getThirdCategoryOptions = () => {
    if (!selectedSecondCategory) return []
    const firstCategory = allCategories.find(cat => cat.id === parseInt(selectedFirstCategory))
    const secondCategory = firstCategory?.second_categories.find(secondCat => secondCat.id === parseInt(selectedSecondCategory))
    return secondCategory?.third_categories || []
  }

  return {
    allCategories,
    selectedFirstCategory,
    selectedSecondCategory,
    selectedThirdCategory,
    setSelectedFirstCategory,
    setSelectedSecondCategory,
    setSelectedThirdCategory,
    resetCategories,
    getSecondCategoryOptions,
    getThirdCategoryOptions
  }
}
