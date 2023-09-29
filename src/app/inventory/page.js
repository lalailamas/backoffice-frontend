'use client'
// import Image from 'next/image's
import { Inter } from 'next/font/google'
import InsideLayout from '@/components/admin/layouts/inside'
import useGetProducts from '@/hooks/useProducts'
import { useEffect, useRef, useState } from 'react'
import ProductsTable from '@/components/admin/tables/products'
// import Pager from '@/components/admin/common/pager'
import EditProductModal from '@/components/admin/modals/product/edit'
import useGetWarehouses from '@/hooks/useWarehouses'
import S from '@/lib/storage'
import { SearchField } from '@/components/admin/common/search'
import { findProductByEAN, getProduct, updateProductImage, updateProductStock, deleteProduct, createProduct, updateProduct } from '@/api/product'
import { useUserRole } from '@/hooks/useUserRole'

const inter = Inter({ subsets: ['latin'] }) //eslint-disable-line

export default function Inventory () {
  const { checkUserRole } = useUserRole()

  const [cachekey, setCachekey] = useState(0)

  const [searchKey, setSearchKey] = useState('')
  const [params, setParams] = useState({ limit: 10, page: 1, search: '' })
  const [warehouseParams] = useState({ limit: 10, page: 1 })
  const { products, meta } = useGetProducts(params, cachekey)
  const { warehouses, meta: metaW, error: errorW, loading: loadingW } = useGetWarehouses(warehouseParams, cachekey) //eslint-disable-line
  const [scanMode, setScanMode] = useState(false)
  const [currentEan, setCurrentEan] = useState('')

  const scanElement = useRef()

  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState('create')

  const [currentProduct, setCurrentProduct] = useState({})
  const [currentWarehouse, setCurrentWarehouse] = useState(0)
  const [currentQuantity, setCurrentQuantity] = useState(1)

  const [showTraining, setShowTraining] = useState(false)
  const [showMachines, setShowMachines] = useState(false)
  const [showExpiration, setShowExpiration] = useState(false)

  const handleNewProduct = () => {
    setCurrentProduct({})
    setAction('create')
    setShowModal(true)
  }

  const handleEditProduct = (forEdit) => {
    setCurrentProduct(forEdit)
    setAction('edit')
    setShowModal(true)
  }

  const handleNewProductWithEAN = (ean) => {
    setCurrentProduct({ ean })
    setAction('create')
    setShowModal(true)
  }

  const handleToggleModal = () => {
    setShowModal(!showModal)
  }

  useEffect(
    () => {
      checkUserRole()
      if (scanMode === true) {
        setCurrentQuantity(1)
      }
    },
    [scanMode]
  )

  // useEffect(
  //   () => {
  //     const t = S.get('showTraining')
  //     const e = S.get('showExpiration')
  //     const m = S.get('showMachines')
  //     const w = S.get('currentWarehouse')
  //     if (t === true) {
  //       setShowTraining(true)
  //     }
  //     if (e === true) {
  //       setShowExpiration(true)
  //     }
  //     if (m === true) {
  //       setShowMachines(true)
  //     }
  //     if (w) {
  //       setCurrentWarehouse(parseInt(w))
  //     }
  //   },
  //   []

  // )

  const handleScan = async (e) => {
    e.preventDefault()
    const ean = scanElement.current.value
    if (ean !== '') {
      setCurrentEan(ean)
      scanElement.current.value = ''

      const response = await findProductByEAN(ean)
      Promise.all([response])
      const foundProduct = response.data
      if (foundProduct && Object.keys(foundProduct).length > 0) {
        const responseGet = await getProduct(foundProduct.id)
        Promise.all([responseGet])
        const product = responseGet.data
        console.log(product)
        let newStock = currentQuantity

        if (product.warehouse_product && product.warehouse_product.length > 0) {
          const filtered = product.warehouse_product.filter(w => w.warehouse_id === currentWarehouse)[0]
          if (filtered) {
            newStock = parseInt(filtered.stock) + currentQuantity
          }
        }
        const update = await updateProductStock({ productId: product.id, warehouseId: currentWarehouse, stock: newStock })
        Promise.all([update])
        setCurrentQuantity(1)
        scanElement.current.focus()

        setCachekey(cachekey + 1)
      } else {
        handleNewProductWithEAN(ean)
        console.log('NO product')
      }
    }
  }
  const handleDelete = (id) => {
    deleteProduct(id).then(
      (response) => {
        setCachekey(cachekey + 1)
        setShowModal(false)
      }

    )
  }
  const handleSave = (data) => {
    if (action === 'create') {
      // data.expiration_date = data.expiration_date.split("T")[0];
      // data.manufacture_date = data.manufacture_date.split("T")[0];
      data.expiration_date = data.expiration_date.startDate
      data.manufacture_date = data.manufacture_date.startDate

      createProduct(data).then(
        (response) => {
          setCachekey(cachekey + 1)
          setShowModal(false)
        }
      )
    } else {
      const image = data.image
      // data.expiration_date = data.expiration_date.split("T")[0];
      // data.manufacture_date = data.manufacture_date.split("T")[0];
      data.expiration_date = data.expiration_date.startDate
      data.manufacture_date = data.manufacture_date.startDate
      // delete (data.image);
      updateProduct(data).then(
        () => {
          if (image) {
            updateProductImage(data.id, image).then(
              () => {
                setCachekey(cachekey + 1)
                setShowModal(false)
              }

            )
          } else {
            setCachekey(cachekey + 1)
            setShowModal(false)
          }
        }
      )
    }
  }
  // const setPage = (page) => {
  //   const clone = JSON.parse(JSON.stringify(params))
  //   clone.page = page
  //   setParams(clone)
  // }

  useEffect(
    () => {
      const clone = JSON.parse(JSON.stringify(params))
      clone.search = searchKey
      setParams(clone)
    },
    [searchKey]
  )

  useEffect(
    () => {
      if (scanMode) {
        scanElement.current.focus()
      }
    },
    [scanMode]
  )

  return (
    <>
      <InsideLayout />

      {/* <pre>{JSON.stringify(warehouses, null, 2)}</pre> */}
      {/* <div className="overflow-x-auto"><table className="table table-zebra w-full"><thead><tr><th>Id</th><th>Nombre</th><th>Precio</th><th>Precio oferta</th><th>Descripción</th><th>Activa</th><th>Acciones</th></tr></thead><tbody><tr><th>1</th><td>Mediana</td><td>14.000</td><td>14.000</td><td>Lorem ipsum dolor sit amet. Dolor sit amet.</td><td></td><td><button className="btn btn-sm btn-outline">Editar</button></td></tr><tr><th>2</th><td>Grande</td><td>14.000</td><td>14.000</td><td>Lorem ipsum dolor sit amet. Dolor sit amet.</td><td></td><td><button className="btn btn-sm btn-outline">Editar</button></td></tr><tr><th>3</th><td>Súper grande</td><td>14.000</td><td>14.000</td><td>Lorem ipsum dolor sit amet. Dolor sit amet.</td><td></td><td><button className="btn btn-sm btn-outline">Editar</button></td></tr><tr><th>4</th><td>Jumbo</td><td>14.000</td><td>14.000</td><td>Lorem ipsum dolor sit amet. Dolor sit amet.</td><td></td><td><button className="btn btn-sm btn-outline">Editar</button></td></tr></tbody></table></div> */}
      <div className='w-full p-8'>
        <div className='flex flex-col md:flex-row mt-4 gap-y-4 md:gap-y-0 md:gap-x-4 mb-4'>
          <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Productos</h2>
          <select value={currentWarehouse} onChange={(e) => { setCurrentWarehouse(e.target.value); S.set('currentWarehouse', e.target.value) }} className='select select-sm select-bordered  rounded-full w-full md:max-w-xs'>
            <option disabled value={0}>Bodega</option>
            {warehouses && warehouses.map(w =>
              <option key={w.id} value={w.id}>{w.name}</option>
            )}

          </select>
          <div className='rounded-full text-d-dark-dark-purple py-1'>
            <div className='form-control'>
              <label className='label p-0'>
                <span className='label-text pr-4 text-d-dark-dark-purple'>Mostrar Entrenamiento</span>
                <input type='checkbox' className='toggle  toggle-sm  toggle-primary' checked={showTraining} onChange={() => { S.set('showTraining', !showTraining); setShowTraining(!showTraining) }} />
              </label>
            </div>
          </div>

          <div className='rounded-full  text-d-dark-dark-purple py-1'>
            <div className='form-control'>
              <label className='label p-0'>
                <span className='label-text pr-4 text-d-dark-dark-purple'>Mostrar Expiración</span>
                <input type='checkbox' className='toggle toggle-sm toggle-primary' checked={showExpiration} onChange={() => { S.set('showExpiration', !showExpiration); setShowExpiration(!showExpiration) }} />
              </label>
            </div>
          </div>

        </div>
        <div className='divider' />
        <div className='flex flex-col md:flex-row mt-4 gap-y-4 md:gap-y-0 md:gap-x-4 mb-4'>

          <div className='join  w-full md:max-w-xs'>
            {/* value={currentEan} onChange={(e) => setCurrentEan(e.target.value)} */}

            <SearchField type='text' placeholder='Búsqueda' name='search' className='input input-sm input-bordered w-full  bg-d-white join-item rounded-full text-d-dark-dark-purple' onChange={(v) => setSearchKey(v)} />

            <button type='button ' onClick={() => setSearchKey('')} className='btn btn-sm join-item rounded-r-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>

              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>

            </button>
          </div>

          <button type='submit' onClick={() => handleNewProduct()} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
            Nuevo producto
          </button>

          {currentWarehouse &&
            <>

              <div type='button' className='btn btn-sm join-item rounded-full bg-d-soft-soft-purple text-d-dark-dark-purple'>
                <div className='form-control'>
                  <label className='label p-0'>
                    <span className='label-text pr-4 text-d-dark-dark-purple'>Modo escaneo</span>
                    <input type='checkbox' className='toggle toggle-sm toggle-primary' checked={scanMode} onChange={() => setScanMode(!scanMode)} />
                  </label>
                </div>
              </div>
              <div className='join'>
                {/* eslint-disable-next-line */}
                <button disabled={!scanMode} className='btn btn-sm join-item rounded-l-full' onClick={() => { if (true /* currentQuantity > 1 */) { setCurrentQuantity(currentQuantity - 1); scanElement.current.focus() } }}>-</button>
                <input disabled={!scanMode} className='input input-sm input-bordered w-full md:w-16 bg-d-white rounded-l-full text-d-dark-dark-purple  text-center join-item' type='text' value={currentQuantity} />
                <button disabled={!scanMode} className='btn  btn-sm join-item rounded-r-full' onClick={() => { setCurrentQuantity(currentQuantity + 1); scanElement.current.focus() }}>+</button>
              </div>
              <form onSubmit={(e) => handleScan(e)}>
                <div className='join  w-full'>
                  {/* value={currentEan} onChange={(e) => setCurrentEan(e.target.value)} */}
                  <input disabled={!scanMode} type='text' placeholder='EAN' name='ean' className='input input-sm input-bordered w-full bg-d-white join-item rounded-l-full text-d-dark-dark-purple' ref={scanElement} />
                  <button disabled={!scanMode} type='submit ' className='btn btn-sm join-item rounded-r-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
                    <svg viewBox='131 -131 512 512' xmlns='http://www.w3.org/2000/svg' fill='currentColor' strokeWidth={1} stroke='currentColor' className='w-6 h-6'>
                      <path id='XMLID_11_' d='M131-57.7v365.5h56.7V-57.7H131z M228.7-57.7v365.5h48.8V-57.7H228.7z M293.3-57.7v365.5h32.3V-57.7H293.3z M358.6-57.7v365.5h32.3V-57.7H358.6z M431.9-57.7v365.5h56.7V-57.7H431.9z M529.6-57.7v365.5H554V-57.7H529.6z M594.2-57.7v365.5 H643V-57.7H594.2z' />
                    </svg>
                  </button>
                </div>
              </form>

            </>}

          {currentEan !== '' &&
            <div className=' flex flex-row text-lg items-center pl-4'>
              <strong>Último EAN escaneado: </strong> {currentEan}
            </div>}
        </div>
        <div className='divider' />
        {/* <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 mb-4">

                </div> */}

        <ProductsTable products={products} edit={handleEditProduct} showTraining={showTraining} showMachines={showMachines} showExpiration={showExpiration} warehouses={warehouses} />
        {/* <pre>{JSON.stringify(products, null, 2)}</pre>
                <pre>{JSON.stringify(products, null, 2)}</pre> */}
        <div className='w-full flex flex-row mt-4'>
          {/* <Pager meta={meta} setPage={setPage} /> */}
        </div>
      </div>

      {showModal &&
        <EditProductModal show={showModal} toggleModal={handleToggleModal} action={action} product={currentProduct} save={handleSave} deleter={handleDelete} />}

    </>

  )
}

Inventory.getLayout = function getLayout (page) {
  return (
    <InsideLayout>{page}</InsideLayout>
  )
}
