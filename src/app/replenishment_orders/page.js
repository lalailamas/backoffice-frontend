import Image from 'next/image'
import { Inter } from 'next/font/google'
import InsideLayout from '@/components/admin/layouts/inside'
import useGetROrders from '@/hooks/useROrders'
import { useEffect, useRef, useState } from 'react'
import ROrdersTable from '@/components/admin/tables/replenishment-orders'
import Pager from '@/components/admin/common/pager'
import DspApi from '@/lib/api'
import EditROrderModal from '@/components/admin/modals/replenishment-orders/edit'
import useGetWarehouses from '@/hooks/useWarehouses'
import S from '@/lib/storage'
import { SearchField } from '@/components/admin/common/search'
import Datepicker from 'react-tailwindcss-datepicker'

const inter = Inter({ subsets: ['latin'] })

export default function Inventory () {
  const [cachekey, setCachekey] = useState(0)

  const [searchKey, setSearchKey] = useState('')
  const [searchDate, setSearchDate] = useState('')

  const [params, setParams] = useState({ limit: 10, page: 1, search: '' })
  const [warehouseParams, setWarehouseParams] = useState({ limit: 10, page: 1 })
  const { rorders, meta, error, loading } = useGetROrders(params, cachekey)
  const { warehouses, meta: metaW, error: errorW, loading: loadingW } = useGetWarehouses(warehouseParams, cachekey)
  const [scanMode, setScanMode] = useState(false)
  const [currentEan, setCurrentEan] = useState('')

  const scanElement = useRef()

  const [showModal, setShowModal] = useState(false)
  const [action, setAction] = useState('create')

  const [currentROrder, setCurrentROrder] = useState({})
  const [currentWarehouse, setCurrentWarehouse] = useState(0)
  const [currentQuantity, setCurrentQuantity] = useState(1)

  const [showTraining, setShowTraining] = useState(false)
  const [showMachines, setShowMachines] = useState(false)
  const [showExpiration, setShowExpiration] = useState(false)

  const handleNewROrder = () => {
    setCurrentROrder({})
    setAction('create')
    setShowModal(true)
  }

  const handleEditROrder = (forEdit) => {
    DspApi.getReplenishmentOrder(forEdit.id).then((response) => {
      setCurrentROrder(response.data)
      setAction('edit')
      setShowModal(true)
    }).catch(
      (error) => {
        console.log(error.message)
      }
    )
  }

  const handleNewROrderWithEAN = (ean) => {
    setCurrentROrder({ ean })
    setAction('create')
    setShowModal(true)
  }

  const handleToggleModal = () => {
    setShowModal(!showModal)
  }

  // useEffect(
  //     () => {
  //         if (scanMode === true) {
  //             setCurrentQuantity(1);
  //         }
  //     },
  //     [scanMode]
  // )

  // useEffect(
  //     () => {
  //         const t = S.get('showTraining');
  //         const e = S.get('showExpiration');
  //         const m = S.get('showMachines');
  //         const w = S.get('currentWarehouse');
  //         if (t === true) {
  //             setShowTraining(true);
  //         }
  //         if (e === true) {
  //             setShowExpiration(true);
  //         }
  //         if (m === true) {
  //             setShowMachines(true);
  //         }
  //         if (w) {
  //             setCurrentWarehouse(parseInt(w));
  //         }
  //     },
  //     []

  // )

  const handleScan = async (e) => {
    e.preventDefault()
    const ean = scanElement.current.value
    if (ean != '') {
      setCurrentEan(ean)
      scanElement.current.value = ''

      const response = await DspApi.findROrderByEAN(ean)
      Promise.all([response])
      const foundROrder = response.data
      if (foundROrder && Object.keys(foundROrder).length > 0) {
        const responseGet = await DspApi.getROrder(foundROrder.id)
        Promise.all([responseGet])
        const rorder = responseGet.data
        console.log(rorder)
        let newStock = currentQuantity

        if (rorder.warehouse_rorder && rorder.warehouse_rorder.length > 0) {
          const filtered = rorder.warehouse_rorder.filter(w => w.warehouse_id == currentWarehouse)[0]
          if (filtered) {
            newStock = parseInt(filtered.stock) + currentQuantity
          }
        }
        const update = await DspApi.updateROrderStock({ rorderId: rorder.id, warehouseId: currentWarehouse, stock: newStock })
        Promise.all([update])
        setCurrentQuantity(1)
        scanElement.current.focus()

        setCachekey(cachekey + 1)
      } else {
        handleNewROrderWithEAN(ean)
        console.log('NO rorder')
      }
    }
  }
  const handleDelete = (id) => {
    DspApi.deleteReplenishmentOrder(id).then(
      (response) => {
        setCachekey(cachekey + 1)
        setShowModal(false)
      }

    )
  }
  const handleSave = () => {
    setCachekey(cachekey + 1)
    setShowModal(false)
  }
  const setPage = (page) => {
    const clone = JSON.parse(JSON.stringify(params))
    clone.page = page
    setParams(clone)
  }

  // useEffect(
  //     () => {
  //         var clone = JSON.parse(JSON.stringify(params));
  //         clone.search = searchKey;
  //         setParams(clone);
  //     },
  //     [searchKey]
  // )

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
      {/* <pre>{JSON.stringify(warehouses, null, 2)}</pre> */}
      {/* <div className="overflow-x-auto"><table className="table table-zebra w-full"><thead><tr><th>Id</th><th>Nombre</th><th>Precio</th><th>Precio oferta</th><th>Descripción</th><th>Activa</th><th>Acciones</th></tr></thead><tbody><tr><th>1</th><td>Mediana</td><td>14.000</td><td>14.000</td><td>Lorem ipsum dolor sit amet. Dolor sit amet.</td><td></td><td><button className="btn btn-sm btn-outline">Editar</button></td></tr><tr><th>2</th><td>Grande</td><td>14.000</td><td>14.000</td><td>Lorem ipsum dolor sit amet. Dolor sit amet.</td><td></td><td><button className="btn btn-sm btn-outline">Editar</button></td></tr><tr><th>3</th><td>Súper grande</td><td>14.000</td><td>14.000</td><td>Lorem ipsum dolor sit amet. Dolor sit amet.</td><td></td><td><button className="btn btn-sm btn-outline">Editar</button></td></tr><tr><th>4</th><td>Jumbo</td><td>14.000</td><td>14.000</td><td>Lorem ipsum dolor sit amet. Dolor sit amet.</td><td></td><td><button className="btn btn-sm btn-outline">Editar</button></td></tr></tbody></table></div> */}
      <div className='w-full p-8'>
        {/* <div className="flex flex-col md:flex-row mt-4 gap-y-4 md:gap-y-0 md:gap-x-4 mb-4">
                    <h2 className="text-d-dark-dark-purple text-2xl font-bold">Inventario</h2>
                    <select value={currentWarehouse} onChange={(e) => { setCurrentWarehouse(e.target.value); S.set('currentWarehouse', e.target.value) }} className="select select-sm select-bordered  rounded-full w-full md:max-w-xs">
                        <option disabled value={0}>Bodega</option>
                        {warehouses && warehouses.map(w =>
                            <option key={w.id} value={w.id}>{w.name}</option>
                        )
                        }

                    </select>
                    <div className="rounded-full text-d-dark-dark-purple py-1">
                        <div className="form-control">
                            <label className="label p-0">
                                <span className="label-text pr-4 text-d-dark-dark-purple">Mostrar Entrenamiento</span>
                                <input type="checkbox" className="toggle  toggle-sm  toggle-primary" checked={showTraining} onChange={() => { S.set('showTraining', !showTraining); setShowTraining(!showTraining); }} />
                            </label>
                        </div>
                    </div>

                    <div className="rounded-full  text-d-dark-dark-purple py-1">
                        <div className="form-control">
                            <label className="label p-0">
                                <span className="label-text pr-4 text-d-dark-dark-purple">Mostrar Expiración</span>
                                <input type="checkbox" className="toggle toggle-sm toggle-primary" checked={showExpiration} onChange={() => { S.set('showExpiration', !showExpiration); setShowExpiration(!showExpiration); }} />
                            </label>
                        </div>
                    </div>

                </div> */}
        {/* <div className='divider'></div> */}
        <div className='flex flex-col md:flex-row mt-4 gap-y-4 md:gap-y-0 md:gap-x-4 mb-4'>

          <div className='join  w-full md:max-w-md'>
            {/* value={currentEan} onChange={(e) => setCurrentEan(e.target.value)} */}

            <div className='col-span-12 md:col-span-3 form-control w-full' id='search_date_id'>
              {/* <label className="label">
                                <span className="label-text">Fecha de expiración</span>

                            </label> */}
              <Datepicker
                displayFormat='DD/MM/YYYY'
                inputClassName='input input-sm input-bordered w-full  bg-d-white join-item rounded-full text-d-dark-dark-purple'
                popoverDirection='down'
                value={searchDate}
                onChange={(v) => setSearchDate(v)}
                useRange={false}
                asSingle
              />
              {/* <input type="date" lang="es" placeholder="dd-mm-yyyy" value={editROrder.expiration_date && editROrder.expiration_date.split("T")[0]} onChange={(e) => handleChange('expiration_date', (new Date(e.target.value)).toISOString())} className="input input-bordered w-full" /> */}
              {/* <label className="label">
              <span className="label-text-alt">Bottom Left label</span>
              <span className="label-text-alt">Bottom Right label</span>
            </label> */}
            </div>

            <SearchField type='text' placeholder='Búsqueda' name='search' className='input input-sm input-bordered w-full  bg-d-white join-item rounded-full text-d-dark-dark-purple' onChange={(v) => setSearchKey(v)} />

            <button type='button ' onClick={() => setSearchKey('')} className='btn btn-sm join-item rounded-r-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>

              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>

            </button>

          </div>

          <button type='submit' onClick={() => handleNewROrder()} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
            Nueva orden de reabastecimiento
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

          {currentEan != '' &&
            <div className=' flex flex-row text-lg items-center pl-4'>
              <strong>Último EAN escaneado: </strong> {currentEan}
            </div>}
        </div>
        <div className='divider' />
        {/* <div className="flex flex-col md:flex-row gap-y-4 md:gap-y-0 md:gap-x-4 mb-4">

                </div> */}

        <ROrdersTable
          rorders={rorders} edit={handleEditROrder}
        />
        {/* <pre>{JSON.stringify(rorders, null, 2)}</pre>
                <pre>{JSON.stringify(rorders, null, 2)}</pre> */}
        <div className='w-full flex flex-row mt-4'>
          <Pager meta={meta} setPage={setPage} />
        </div>
      </div>

      {showModal &&
        <EditROrderModal show={showModal} toggleModal={handleToggleModal} action={action} rorder={currentROrder} save={handleSave} deleter={handleDelete} />}

    </>

  )
}

Inventory.getLayout = function getLayout (page) {
  return (
    <InsideLayout>{page}</InsideLayout>
  )
}
