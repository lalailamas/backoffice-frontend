import React, { useEffect, useRef, useState } from 'react'
import DeleteProductModal from '../../../tables'
import Datepicker from 'react-tailwindcss-datepicker'
import { useForm, Controller } from 'react-hook-form'
import { Categories, Seasons } from '@/lib/constants'

export default function EditProductModal (props) {
  const { product, show, toggleModal, action, save, deleter } = props

  const { handleSubmit, control, setValue, formState } = useForm()

  const [doneLoading, setDoneLoading] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const nameRef = useRef()
  const eanRef = useRef()

  useEffect(() => {
    if (product) {
      const newProduct = { ...product }

      if (product.perishable === true || product.perishable === 'true') {
        newProduct.perishable = true
      } else {
        newProduct.perishable = false
      }

      if (product.manufacture_date) {
        const mDate = product.manufacture_date.split('T')[0]
        newProduct.manufacture_date = { startDate: mDate, endDate: mDate }
      }
      if (product.expiration_date) {
        const eDate = product.expiration_date.split('T')[0]
        newProduct.expiration_date = { startDate: eDate, endDate: eDate }
      }

      Object.keys(newProduct).forEach((key) => {
        setValue(key, newProduct[key])
      })

      if (product.ean && product.ean !== '') {
        nameRef.current.focus()
      } else {
        eanRef.current.focus()
      }

      setDoneLoading(true)
    }
  }, [product, setValue])

  const onSubmit = (data) => {
    save(data)
  }

  const handleDelete = () => {
    setShowDeleteModal(true)
  }

  const confirmDelete = (id) => {
    setShowDeleteModal(false)
    deleter(id)
  }

  return (
    <>
      <input type='checkbox' id='edit-product-modal' className='modal-toggle' checked={show} onChange={toggleModal} />
      <div className='modal'>
        <div className='modal-box overflow-visible w-11/12 max-w-3xl'>
          <h3 className='font-bold text-lg'>{action === 'create' ? 'Crear' : 'Editar'} producto</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-12 gap-2'>
              <div className='col-span-12 md:col-span-6 form-control w-full'>
                <label className='label'>
                  <span className='label-text'>EAN</span>
                </label>
                <Controller
                  name='ean'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'EAN es requerido',
                    validate: value =>
                      /^\d+$/.test(value) || 'EAN debe contener solo dígitos'
                  }}
                  render={({ field }) => (
                    <input type='text' placeholder='EAN' {...field} className='input input-bordered w-full' ref={eanRef} />
                  )}
                />
                {formState.errors.ean && (
                  <p className='text-error'>{formState.errors.ean.message}</p>
                )}
              </div>
              <div className='col-span-12 md:col-span-6 form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Nombre</span>
                </label>
                <Controller
                  name='name'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Nombre es requerido' }}
                  render={({ field }) => (
                    <>
                      <input
                        type='text' placeholder='Nombre' {...field} className='input input-bordered w-full' ref={(e) => {
                          field.ref(e)
                          nameRef.current = e
                        }}
                      />
                      {formState.errors.name && (
                        <p className='text-error'>{formState.errors.name.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='col-span-12 md:col-span-6 form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Marca</span>
                </label>
                <Controller
                  name='brand'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Marca es requerida' }}
                  render={({ field }) => (
                    <>
                      <input type='text' placeholder='Marca' {...field} className='input input-bordered w-full' />
                      {formState.errors.brand && (
                        <p className='text-error'>{formState.errors.brand.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='col-span-12 md:col-span-3 form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Categoría</span>
                </label>
                <Controller
                  name='category'
                  control={control}
                  rules={{ required: 'Seleccione categoría' }}
                  render={({ field }) => (
                    <select className='select select-bordered' {...field}>
                      <option defaultValue=''>Elija una</option>
                      {Object.keys(Categories).map(
                        (key) => <option key={key} value={key}>{Categories[key]}</option>
                      )}
                    </select>
                  )}
                />
                {formState.errors.category && (
                  <p className='text-error'>{formState.errors.category.message}</p>
                )}
              </div>
              <div className='col-span-12 md:col-span-3 form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Temporada</span>
                </label>
                <Controller
                  name='season'
                  control={control}
                  rules={{ required: 'Seleccione temporada' }}
                  render={({ field }) => (
                    <select className='select select-bordered' {...field}>
                      <option defaultValue=''>Elija una</option>
                      {Object.keys(Seasons).map(
                        (key) => <option key={key} value={key}>{Seasons[key]}</option>
                      )}
                    </select>
                  )}
                />
                {formState.errors.season && (
                  <p className='text-error'>{formState.errors.season.message}</p>
                )}
              </div>
              <div className='col-span-12 md:col-span-6 form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Expiración</span>
                </label>
                <label className='label input input-bordered'>
                  <span className='label-text pr-4 text-d-dark-dark-purple'>Producto expirable</span>
                  {doneLoading && (
                    <Controller
                      name='perishable'
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <input type='checkbox' {...field} className='toggle toggle-primary' />
                      )}
                    />
                  )}
                </label>
              </div>
              <div className='col-span-12 md:col-span-3 form-control w-full' id='manufacture_date_id'>
                <label className='label'>
                  <span className='label-text'>Fecha de fabricación</span>
                </label>
                <Controller
                  name='manufacture_date'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Requerido' }}
                  render={({ field }) => (
                    <Datepicker
                      displayFormat='DD/MM/YYYY'
                      inputClassName='input input-bordered w-full bg-white'
                      popoverDirection='up'
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                      useRange={false}
                      asSingle
                    />

                  )}

                />
                {formState.errors.manufacture_date && (
                  <p className='text-error'>{formState.errors.manufacture_date.message}</p>
                )}
              </div>
              <div className='col-span-12 md:col-span-3 form-control w-full' id='expiration_date_id'>
                <label className='label'>
                  <span className='label-text'>Fecha de expiración</span>
                </label>
                <Controller
                  name='expiration_date'
                  control={control}
                  defaultValue=''
                  rules={{ required: 'Requerido' }}
                  render={({ field }) => (
                    <Datepicker
                      displayFormat='DD/MM/YYYY'
                      inputClassName='input input-bordered w-full'
                      popoverDirection='up'
                      value={field.value}
                      onChange={(v) => field.onChange(v)}
                      useRange={false}
                      asSingle
                    />
                  )}
                />
                {formState.errors.expiration_date && (
                  <p className='text-error'>{formState.errors.expiration_date.message}</p>
                )}
              </div>

            </div>
            <div className='divider' />
            <div className='modal-action flex flex-row'>
              {action !== 'create' && (
                <div className='grow-0'>
                  <button className='btn rounded-full' onClick={handleDelete}>
                    Eliminar
                  </button>
                </div>
              )}
              <div className='grow' />
              <div className='grow-0'>
                <label htmlFor='edit-product-modal' className='btn rounded-full'>
                  Cancelar
                </label>
                <button className='btn rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <DeleteProductModal product={product} showDeleteModal={showDeleteModal} confirm={confirmDelete} toggleDeleteModal={handleDelete} />
    </>
  )
}
