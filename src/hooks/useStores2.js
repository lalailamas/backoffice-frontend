import { useState, useEffect } from 'react'
import { getStores } from '@/api/store'

const useGetStores2 = () => {
  const [stores, setStores] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStores = () => {
      setLoading(true)
      getStores().then(
        (response) => {
          setStores(response.data)
        }
      ).catch((err) => {
        setError(err)
      })
    }
    fetchStores()
  }, [])

  // custom hook returns value
  return { stores, error, loading }
}

export default useGetStores2
