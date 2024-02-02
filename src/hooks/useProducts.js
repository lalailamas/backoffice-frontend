import { useState, useEffect } from 'react'
import { listProducts } from '@/api/product'

const useGetProducts = (params, cachekey) => {
  const [products, setProducts] = useState(null)
  const [meta, setMeta] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const fetchData = () => {
    setLoading(true)
    listProducts(params.limit, params.page, params.search).then(
      (response) => {
        // console.log(response, 'response')
        setProducts(response.data)
        setMeta(response.meta)
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
  return { products, meta, error, loading }
}

export default useGetProducts
