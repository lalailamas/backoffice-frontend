import { useState, useEffect } from 'react'
import { getStores } from '@/api/store'

const useGetStores2 = (active) => {
  const [stores, setStores] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStores = () => {
      setLoading(true)
      getStores(active).then(
        (response) => {
          console.log(response, 'respuesta getStores2')
          setStores(response)
        }
      ).catch((err) => {
        setError(err)
      })
    }
    fetchStores()
  }, [])

  return { stores, error, loading }
}

export default useGetStores2
