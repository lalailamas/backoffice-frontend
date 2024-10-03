'use client'
import { useEffect, useState } from 'react'
import ProductsTable from '@/components/admin/tables/products'
import { SearchField } from '@/components/admin/common/search'
import { listProducts } from '@/api/product'
import Pager from '@/components/admin/common/pager'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import { getAllReiteData } from '@/api/product/reite'
import DspLoader from '@/components/admin/common/loader'

export default function Inventory () {
  const [searchKey, setSearchKey] = useState('')
  const [page, setPage] = useState(1)
  const [params, setParams] = useState({ limit: 10, search: '' })
  const [products, setProducts] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const response = await listProducts(params.limit, page, params.search)
      // console.log(response, 'response listProducts')
      if (response) {
        const reiteData = await getAllReiteData()
        const reiteDataMap = reiteData.reduce((map, product) => {
          map[product.metadata.EAN] = product.metadata.imageUrl
          return map
        }, {})
        // console.log(reiteDataMap, 'reiteDataMap')
        // Merge listProducts products with reiteData images
        const productsWithImages = response.data.map((product) => ({
          ...product,
          imageUrl: reiteDataMap[product.ean] || null
        }))
        setLoading(false)
        setProducts(productsWithImages)
        setMeta({
          pagination: {
            page: parseInt(response.meta.pagination.page),
            pages: response.meta.pagination.pages,
            total: response.meta.pagination.total,
            limit: parseInt(response.meta.pagination.limit)
          }
        })
      }
    } catch (error) {
      console.error('Error fetching products with images', error)
    }
  }
  useEffect(() => {
    fetchProducts()
  }, [page, params])

  /**
 * Updates the search parameters and resets the page to the first one
 * whenever the search term changes.
 */
  useEffect(
    () => {
      // Create a deep copy of the 'params' object
      const clone = JSON.parse(JSON.stringify(params))
      clone.search = searchKey
      setPage(1)
      setParams(clone)
    },
    [searchKey]
  )

  // useEffect(
  //   () => {
  //     if (scanMode) {
  //       scanElement.current.focus()
  //     }
  //   },
  //   [scanMode]
  // )

  return (
    <>
      {loading
        ? <DspLoader />
        : (
          <>
            <MainTitle>Productos</MainTitle>
            <div className='w-full p-8'>
              <div className='flex flex-col md:flex-row mt-4 gap-y-4 md:gap-y-0 md:gap-x-4 mb-4 min-[430px]:text-center ' />
              <div className='divider min-[430px]:hidden md:block ' />
              <div className='flex flex-col md:flex-row mt-4 gap-y-4 md:gap-y-0 md:gap-x-4 mb-4 min-[430px]:flex-wrap'>
                <div className='join w-full md:max-w-xs '>
                  <SearchField
                    type='text'
                    placeholder='Búsqueda'
                    name='search'
                    className='input input-sm input-bordered w-full  bg-d-white join-item rounded-full text-d-dark-dark-purple'
                    onChange={(v) => setSearchKey(v)}
                  />
                </div>
                <div className='flex min-w-[430px]:flex-row justify-center' />
              </div>
              <div className='divider' />
              {products && products.length > 0 && (
                <ProductsTable products={products} />
              )}
              <div className='w-full flex flex-row mt-4' />
              <div className='w-full flex flex-row mt-4 justify-center'>
                <Pager meta={meta} setPage={setPage} />
              </div>
            </div>
          </>
          )}
    </>
  )
}
