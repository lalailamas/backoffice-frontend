import { useState, useEffect } from 'react'
import { listWarehouses } from '@/pages/api/warehouse'

const useGetWarehouses = (params, cachekey) => {
  const [warehouses, setWarehouses] = useState(null)
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    listWarehouses(params.limit, params.page).then(
      (response) => {
        setWarehouses(response.data.data)
        setMeta(response.data.meta)
      }
    ).catch((err) => {
      setError(err)
    }).finally(() => {
      setLoading(false)
    })
  }

  useEffect(() => {
    fetchData()
  }, [params, cachekey])

  // custom hook returns value
  return { warehouses, meta, error, loading }
}

export default useGetWarehouses
