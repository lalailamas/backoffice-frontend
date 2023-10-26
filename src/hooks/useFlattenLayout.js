import { getLayout } from '@/api/layout'
import { useEffect, useState } from 'react'

function flattenLayoutData (layoutData) {
  const result = []

  layoutData.trays.forEach(tray => {
    tray.columns.forEach(column => {
      result.push(column.productId)
    })
  })

  return result
}
function findDuplicates (array) {
  const counts = {}
  const duplicates = []

  array.forEach(productId => {
    counts[productId] = (counts[productId] || 0) + 1
    if (counts[productId] === 2) {
      duplicates.push(productId)
    }
  })

  return duplicates
}

// Hook personalizado para obtener y aplanar el diseño
export default function useFlattenLayout (layoutId) {
  const [state, setState] = useState({
    flattenedLayout: [],
    flattenLoading: true,
    error: null
  })

  const fetchLayout = async (layoutId) => {
    try {
      const layoutResponse = await getLayout(layoutId)

      if (layoutResponse.data) {
        const flattenedLayout = flattenLayoutData(layoutResponse.data)
        if (flattenedLayout.length !== 0) {
          const duplicateProducts = findDuplicates(flattenedLayout)
          if (duplicateProducts.length !== 0) {
            setState({
              flattenedLayout: duplicateProducts,
              flattenLoading: false,
              error: null
            })
          }
        }
      }
    } catch (error) {
      setState({
        flattenedLayout: [],
        flattenLoading: false,
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
