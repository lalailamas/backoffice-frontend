'use client'
import { useEffect, useRef, useState } from 'react'
import DeleteROrderModal from '../delete/page'
import Datepicker from 'react-tailwindcss-datepicker'
import useGetStores from '@/hooks/useStores'
import useGetWarehouses from '@/hooks/useWarehouses'
// import useGetProducts from '@/hooks/useProducts'
import { DspApi } from '@/utils/fetchData'

export default function EditROrderModal (props) {
  const { rorder, show, toggleModal, action, save, deleter } = props
  const [editROrder, setEditROrder] = useState({})
  const [params] = useState({ limit: 1000, page: 1 })
  const { stores } = useGetStores(params, 0)
  const { warehouses } = useGetWarehouses(params, 0)
  // const { products, meta: metaProducts, error: errorProducts, loading: loadingProducts } = useGetProducts(params, 0)

  const [pickingOperationsToDelete, setPickingOperationsToDelete] = useState([])

  const [warehousesProducts, setWarehousesProducts] = useState({})

  // const [tempProductId, setTempProductId] = useState([])
  // const [tempProduct, setTempProduct] = useState(null)
  // const [tempProductQuantity, setTempProductQuantity] = useState([])

  // const [doneLoading, setDoneLoading] = useState(false)
  const nameRef = useRef()

  const [showDeleteModal, setShowDeleteModal] = useState(false)

  // const [currentROrder, setCurrentROrder] = useState(null)

  const toggleDeleteModal = () => {
    setShowDeleteModal(!showDeleteModal)
  }

  const handleChange = (key, value) => {
    const clone = JSON.parse(JSON.stringify(editROrder))
    clone[key] = value
    setEditROrder(clone)
  }

  const confirmDelete = (id) => {
    setShowDeleteModal(false)
    deleter(id)
  }

  // const handleSave = () => {
  //   save(editROrder);
  // }

  const addPickingOperation = () => {
    const newPickingOperation =
    {
      start_date: null,
      end_date: null,
      status: 'initialized',
      replenishment_order_id: null,
      origin_warehouse_id: null
    }
    const clone = JSON.parse(JSON.stringify(editROrder))
    if (clone.picking_operation) {
      clone.picking_operation.push(newPickingOperation)
    } else {
      clone.picking_operation = [newPickingOperation]
    }
    setEditROrder(clone)
  }

  const removePickingOperation = (index) => {
    if (action === 'create') {
      const clone = JSON.parse(JSON.stringify(editROrder))
      clone.picking_operation.splice(index, 1)
      setEditROrder(clone)
    } else {
      const clone = JSON.parse(JSON.stringify(editROrder))
      const toDelete = clone.picking_operation.splice(index, 1)
      setPickingOperationsToDelete((c) => [...c, ...toDelete])
      setEditROrder(clone)
    }
  }

  const handleChangePickingOperation = (key, index, value) => {
    const clone = JSON.parse(JSON.stringify(editROrder))

    if (key === 'origin_warehouse_id') {
      if (warehousesProducts[value] === undefined) {
        DspApi.listWarehouseProducts(value).then((response) => {
          setWarehousesProducts(current => { return { ...current, ...{ [value]: response.data } } })
        })
          .catch(
            (error) => console.log(error.message)

          )
      }
    }
    clone.picking_operation[index][key] = value
    setEditROrder(clone)
  }

  const addProduct = (index) => {
    const clone = JSON.parse(JSON.stringify(editROrder))
    const newProduct = { id: null, requested_stock: 0 }
    if (clone.picking_operation[index].products) {
      clone.picking_operation[index].products.push(newProduct)
    } else {
      clone.picking_operation[index].products = [newProduct]
    }
    setEditROrder(clone)
  }
  const removeProduct = (index, subindex) => {
    const clone = JSON.parse(JSON.stringify(editROrder))
    clone.picking_operation[index].products.splice(subindex, 1)
    setEditROrder(clone)
  }

  const handleChangeProduct = (index, subindex, key, value) => {
    const clone = JSON.parse(JSON.stringify(editROrder))
    clone.picking_operation[index].products[subindex][key] = value
    setEditROrder(clone)
  }

  const handleSaveRO = async () => {
    const clone = JSON.parse(JSON.stringify(editROrder))
    const secondClone = JSON.parse(JSON.stringify(clone))
    // const thirdClone = JSON.parse(JSON.stringify(clone))
    const pos = JSON.parse(JSON.stringify(clone.picking_operation))
    delete (clone.picking_operation)
    const startDate = clone.start_date.startDate// + "T" + clone['start_hour'] + ":" + clone['start_minutes'] + ":00.000Z";
    const endDate = clone.end_date.startDate// + "T" + clone['end_hour'] + ":" + clone['end_minutes'] + ":00.000Z";
    delete (clone.start_date)
    delete (clone.end_date)
    delete (clone.start_hour)
    delete (clone.end_hour)
    delete (clone.start_minutes)
    delete (clone.end_minutes)
    clone.start_date = startDate
    clone.end_date = endDate

    if (action === 'create') {
      // try {
      const response = await DspApi.createReplenishmentOrder(clone)
      Promise.all([response])

      if (response) {
        const rro = response.data
        for (const po of pos) {
          const createResponse = await DspApi.createPickingOperation(rro.id, {
            startDate,
            origin_warehouse_id: po.origin_warehouse_id
          })
          Promise.all([createResponse])

          if (createResponse) {
            const rpo = createResponse.data
            const updateResponse = await DspApi.updatePickingOperation(rro.id, rpo.id, {
              products: po.products,
              origin_warehouse_id: po.origin_warehouse_id
            })
            Promise.all([updateResponse])
          }
        }
      }
      // }
      // catch (error) {
      //   console.log(error.message);
      // }

      // .then(
      //   (response) => {
      //     console.log("RESPNSE");
      //     console.log(response.data);

      //   }
      // ).catch(

      // );
    } else {
      // delete picking operations

      for (const po of pickingOperationsToDelete) {
        DspApi.deletePickingOperation(po)
      }
      for (const po of secondClone.picking_operation) {
        if (po.id === undefined) {
          const createResponse = await DspApi.createPickingOperation(clone.id, {
            startDate,
            origin_warehouse_id: po.origin_warehouse_id
          })
          Promise.all([createResponse])

          if (createResponse) {
            const rpo = createResponse.data
            const updateResponse = await DspApi.updatePickingOperation(clone.id, rpo.id, {
              products: po.products,
              origin_warehouse_id: po.origin_warehouse_id
            })
            Promise.all([updateResponse])
          }
        } else {
          DspApi.updatePickingOperation(po.replenishment_order_id, po.id, po)
        }
      }
      delete (clone.picking_operations)
      DspApi.updateReplenishmentOrder(clone)
    }

    save()
  }

  useEffect(
    () => {
      if (rorder && Object.keys(rorder).length > 0) {
        const clone = JSON.parse(JSON.stringify(rorder))
        const startDate = {
          startDate: clone.start_date.split('T')[0],
          endDate: clone.start_date.split('T')[0]
        }
        const endDate = {
          startDate: clone.end_date.split('T')[0],
          endDate: clone.end_date.split('T')[0]
        }

        clone.start_hour = clone.start_date.split('T')[1].split(':')[0]
        clone.start_minutes = clone.start_date.split('T')[1].split(':')[1]
        clone.end_hour = clone.end_date.split('T')[1].split(':')[0]
        clone.end_minutes = clone.end_date.split('T')[1].split(':')[1]

        clone.start_date = startDate
        clone.end_date = endDate

        clone.picking_operation = clone.picking_operation.map(
          (po) => {
            if (warehousesProducts[po.origin_warehouse_id] === undefined) {
              DspApi.listWarehouseProducts(po.origin_warehouse_id).then((response) => {
                setWarehousesProducts(current => { return { ...current, ...{ [po.origin_warehouse_id]: response.data } } })
              })
                .catch(
                  (error) => console.log(error.message)

                )
            }

            return {
              id: po.id,
              replenishment_order_id: po.replenishment_order_id,
              origin_warehouse_id: po.origin_warehouse_id,

              products: po.picking_operation_product.map(
                (pop) => {
                  return {

                    id: pop.warehouse_product.id,
                    requested_stock: pop.requested_stock

                  }
                }

              )
            }
          }
        )

        setEditROrder(clone)
      }
    },
    [rorder]
  )

  // const getWarehouseProducts = (products, editROrder, index) => {
  //   return products.filter(p => p.warehouse_product.findIndex(wp => wp.warehouse_id === editROrder.picking_operation[index].origin_warehouse_id) !== -1)
  // }

  // const getWarehouseIndex = (p, editROrder, index) => {
  //   return p.warehouse_product.findIndex(wp => wp.warehouse_id == editROrder.picking_operation[index].origin_warehouse_id)
  // }
  // const getWarehouseProductAux = (p, warehouse_index) => {
  //   return p.warehouse_product[warehouse_index]
  // }

  // const getWarehouseProduct = (p, editROrder, index) => {
  //   return getWarehouseProductAux(p, getWarehouseIndex(p, editROrder, index))
  // }

  return (

    <>

      <input type='checkbox' id='edit-rorder-modal' className='modal-toggle' checked={show} onChange={() => toggleModal()} />
      <div className='modal'>
        <div className='modal-box overflow-scroll w-11/12 max-w-3xl'>

          {/*
          <div className="w-full h-96 flex flex-row">

            <pre className="text-xs  overflow-scroll h-full w-1/2">{JSON.stringify(rorder, null, 2)}</pre>
            <pre className="text-xs  overflow-scroll h-full w-1/2">{JSON.stringify(editROrder, null, 2)}</pre>

          </div> */}

          <h3 className='font-bold text-lg'>{action === 'create' ? 'Crear' : 'Editar'} Orden de reabastecimiento</h3>
          <div className='grid grid-cols-12 gap-2'>
            <div className='col-span-12 md:col-span-6 form-control w-full'>
              <label className='label'>
                <span className='label-text'>Nombre</span>
              </label>
              <input type='text' placeholder='Nombre' value={editROrder.name} onChange={(e) => handleChange('name', e.target.value)} className='input input-bordered w-full' ref={nameRef} />
            </div>
            <div className='col-span-12 md:col-span-6 form-control w-full'>
              <label className='label'>
                <span className='label-text'>Gabinete de destino</span>
              </label>
              <select className='select select-bordered' value={editROrder.destination_store_id} onChange={(e) => handleChange('destination_store_id', parseInt(e.target.value))}>
                <option disabled selected className=''>Elija uno</option>
                {stores && stores.map(
                  (s) => <option key={s.id} value={s.id}>{s.name}</option>

                )}
              </select>
            </div>
            <div className='col-span-12 md:col-span-6 form-control w-full' id='start_date_id'>
              <label className='label'>
                <span className='label-text'>Fecha inicio</span>
              </label>
              <Datepicker
                displayFormat='DD/MM/YYYY'
                inputClassName='input input-bordered w-full'
                popoverDirection='down'
                value={editROrder.start_date}
                onChange={(v) => handleChange('start_date', v)}
                useRange={false}
                asSingle
              />
            </div>
            <div className='col-span-12 md:col-span-6 form-control w-full' id='end_date_id'>
              <label className='label'>
                <span className='label-text'>Fecha de entrega</span>
              </label>
              <Datepicker
                displayFormat='DD/MM/YYYY'
                inputClassName='input input-bordered w-full'
                popoverDirection='down'
                value={editROrder.end_date}
                onChange={(v) => handleChange('end_date', v)}
                useRange={false}
                asSingle
              />

            </div>

            <div className='col-span-12 md:col-span-6 form-control w-full join'>

              <label className='label'>
                <span className='label-text'>Hora inicio</span>
              </label>
              <div className='join w-full border border-d-gray overflow-hidden'>

                <select className='join-item w-1/2 select' value={editROrder.start_hour} onChange={(e) => handleChange('start_hour', e.target.value)}>
                  <option disabled selected className=''>HH</option>
                  {['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'].map(
                    (key) => <option key={key} value={key}>{key}</option>
                  )}

                </select>
                <div className='btn join-item cursor-default bg-d-white border-0'>:</div>
                <select className='join-item  w-1/2  select ' value={editROrder.start_minutes} onChange={(e) => handleChange('start_minutes', e.target.value)}>
                  <option disabled selected className=''>MM</option>
                  {['00', '10', '20', '30', '40', '50'].map(
                    (key) => <option key={key} value={key}>{key}</option>
                  )}

                </select>

              </div>

            </div>

            <div className='col-span-12 md:col-span-6 form-control w-full join'>

              <label className='label'>
                <span className='label-text'>Hora entrega</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
              <div className='join w-full border border-d-gray overflow-hidden'>

                <select className='join-item w-1/2 select rounded-full' value={editROrder.end_hour} onChange={(e) => handleChange('end_hour', e.target.value)}>
                  <option disabled selected className=''>HH</option>
                  {['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'].map(
                    (key) => <option key={key} value={key}>{key}</option>
                  )}

                </select>
                <div className='btn join-item cursor-default bg-d-white border-0'>:</div>
                <select className='join-item  w-1/2  select ' value={editROrder.end_minutes} onChange={(e) => handleChange('end_minutes', e.target.value)}>
                  <option disabled selected className=''>MM</option>
                  {['00', '10', '20', '30', '40', '50'].map(
                    (key) => <option key={key} value={key}>{key}</option>
                  )}

                </select>

              </div>

            </div>

            <div className='col-span-12 md:col-span-12 form-control w-full join'>

              <label className='label'>
                <span className='label-text'>Notas</span>
                {/* <span className="label-text-alt">Alt label</span> */}
              </label>
              <div className='w-full border border-d-gray overflow-hidden'>

                <textarea className='textarea w-full' placeholder='Notas' value={editROrder.notes ? editROrder.notes : ''} onChange={(e) => handleChange('notes', e.target.value)} />

              </div>

            </div>

            {/* <pre>{JSON.stringify(products,null,2)}</pre> */}
            <div className='col-span-12 md:col-span-12 form-control w-full mt-4'>
              <label className='label border-b border-d-soft-green '>
                <span className='label-text'><strong>Operaciones de picking</strong></span>
                <button className='btn btn-xs rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' disabled={!warehouses || (editROrder.picking_operation && editROrder.picking_operation.length === warehouses.length)} onClick={() => addPickingOperation()}>Agregar</button>
              </label>
            </div>
            {editROrder.picking_operation && editROrder.picking_operation.map(
              (po, index) =>
                <div key={index} className='col-span-12 md:col-span-12 shadow-lg p-4'>
                  <label className='label border-b border-d-soft-green'>
                    <span className='label-text'><strong>Operación #{index + 1}</strong></span>
                    <button className='btn btn-xs rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' disabled={false} onClick={() => removePickingOperation(index)}>Quitar</button>
                  </label>
                  <div className='grid md:divide-x md:divide-d-soft-green grid-cols-4  mt-4'>
                    <div className='col-span-4 md:col-span-1'>
                      <label className='label'>
                        <span className='label-text'>Bodega</span>
                      </label>
                      <select className='join-item select select-bordered' value={editROrder.picking_operation[index].origin_warehouse_id} onChange={(e) => handleChangePickingOperation('origin_warehouse_id', index, parseInt(e.target.value))}>
                        <option disabled selected className='' value=''>Elija una bodega</option>
                        {warehouses && warehouses.map(
                          (w) => <option key={w.id} value={w.id} disabled={editROrder.picking_operation.findIndex((p) => p.origin_warehouse_id === w.id) !== -1 && editROrder.picking_operation[index].origin_warehouse_id !== w.id}>{w.name}</option>
                        )}
                      </select>
                    </div>

                    <div className='col-span-4 md:col-span-3 md:pl-4'>
                      <div>
                        <label className='label border-b border-d-soft-green'>
                          <span className='label-text'>Productos</span>
                          <button className='btn btn-xs rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={() => addProduct(index)}>Agregar producto</button>

                        </label>
                        {/* <pre className="text-xs overflow-scroll">{editROrder['picking_operation'][index].origin_warehouse_id && JSON.stringify(warehousesProducts[""+editROrder['picking_operation'][index].origin_warehouse_id], null, 2)}</pre> */}
                        {editROrder.picking_operation[index].products && editROrder.picking_operation[index].products.map(

                          (pr, subindex) =>
                            <div key={subindex} className='join w-full mt-2'>
                              <select className='join-item select select-xs select-bordered' value={editROrder.picking_operation[index].products[subindex].id} onChange={(e) => handleChangeProduct(index, subindex, 'id', parseInt(e.target.value))}>
                                <option disabled selected className='' value=''>Elija un producto</option>

                                {warehousesProducts['' + editROrder.picking_operation[index].origin_warehouse_id] && warehousesProducts['' + editROrder.picking_operation[index].origin_warehouse_id].warehouse_product.map(
                                  (wp) =>
                                    <option
                                      disabled={wp.stock <= 0}
                                      key={wp.id}
                                      value={wp.id}
                                    >  {wp.product.name}
                                    </option>

                                )}

                                {/* {products && getWarehouseProducts(products, editROrder, index).map(
                                  (p) =>

                                    <option
                                      disabled={getWarehouseProduct(p, editROrder, index).stock <= 0}
                                      key={getWarehouseProduct(p, editROrder, index).product_id}
                                      value={getWarehouseProduct(p, editROrder, index).product_id}
                                    >
                                      {p.name}
                                    </option>

                                )} */}

                              </select>

                              <input
                                disabled={editROrder.picking_operation[index].products[subindex].id === '' || editROrder.picking_operation[index].products[subindex].id == null}
                                type='number'
                                min={1}
                                // max={ ((editROrder['picking_operation'][index]['products'][subindex]['id']) && warehousesProducts["" + editROrder['picking_operation'][index].origin_warehouse_id] )? warehousesProducts["" + editROrder['picking_operation'][index].origin_warehouse_id].warehouse_product.find(wp => wp.id == editROrder['picking_operation'][index]['products'][subindex]['id']).stock : 1}
                                placeholder='Cantidad'
                                value={editROrder.picking_operation[index].products[subindex].requested_stock} onChange={(e) => handleChangeProduct(index, subindex, 'requested_stock', parseInt(e.target.value))}
                                className='input input-xs join-item input-bordered w-full'
                              />
                              {/* <button disabled={true} className="join-item btn btn-xs disabled:text-d-white disabled:bg-d-soft-purple">
                                Stock: {editROrder['picking_operation'][index]['products'][subindex]['id'] && (warehousesProducts["" + editROrder['picking_operation'][index].origin_warehouse_id].warehouse_product.find(wp => wp.id == editROrder['picking_operation'][index]['products'][subindex]['id'])).stock}

                              </button> */}
                              <button className='join-item btn btn-xs rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={() => removeProduct(index, subindex)}>Quitar</button>
                            </div>
                        )}

                      </div>

                    </div>
                  </div>
                </div>

            )}

          </div>

          <div className='divider' />
          <div className='modal-action flex flex-row'>
            {action !== 'create' &&
              <div className='grow-0'>
                <button className='btn rounded-full' onClick={() => setShowDeleteModal(true)}>Eliminar</button>
              </div>}
            <div className='grow' />
            <div className='grow-0'>
              <label htmlFor='edit-rorder-modal' className='btn rounded-full'>Cancelar</label>
              <button className='btn rounded-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={() => handleSaveRO()}>Guardar</button>

            </div>

          </div>
        </div>
      </div>

      <DeleteROrderModal rorder={rorder} showDeleteModal={showDeleteModal} confirm={confirmDelete} toggleDeleteModal={toggleDeleteModal} />

    </>
  )
}
