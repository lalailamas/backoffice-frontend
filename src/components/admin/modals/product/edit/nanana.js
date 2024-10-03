'use client'
import React, { useEffect, useRef, useState } from 'react'
import DeleteProductModal from '../delete'
import { useForm, Controller } from 'react-hook-form'
import { proxy_duration, measure_unit } from '@/lib/constants' // eslint-disable-line camelcase

export default function EditProductModal (props) {
  const { categories, product, show, toggleModal, action, save, deleter } = props
  const [editProduct, setEditProduct] = useState({})
  console.log(categories, 'categories')
  // console.log(product, 'product')

  const { handleSubmit, control, setValue, formState } = useForm()
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [isGeneratedEan, setIsGeneratedEan] = useState(false)
  const packVal = product?.pack ? product.pack : []
  const [packValues, setPackValues] = useState(packVal)
  // console.log(packValues, 'packValues')
  const [selectedImage, setSelectedImage] = useState(null)
  const [selectedFirstCategory, setSelectedFirstCategory] = useState(null)
  const [selectedSecondCategory, setSelectedSecondCategory] = useState(null)
  const [selectedThirdCategory, setSelectedThirdCategory] = useState(null)

  const handleAddPackValue = (value) => {
    if (!isNaN(value)) {
      // Si es un número, agregarlo al array
      setPackValues([...packValues, value])
    } else {
      formState.errors.pack = 'Debe contener solo números'
    }// Agregar un nuevo valor al array
  }
  const handleDeletePackValue = (value) => {
    setPackValues(packValues.filter((item) => item !== value)) // Eliminar un valor del array
  }
  const nameRef = useRef()
  const nameLongRef = useRef()
  const eanRef = useRef()
  const vtexRef = useRef()
  const sapRef = useRef()

  useEffect(() => {
    // console.log(product, 'product')
    if (product) {
      const newProduct = { ...product }

      Object.keys(newProduct).forEach((key) => {
        setValue(key, newProduct[key] || '')
      })

      if (product.ean && product.ean !== '') {
        nameRef.current.focus()
      } else {
        eanRef.current.focus()
      }
    }
  }, [product, setValue])

  useEffect(() => {
    if (product && product.category_id) {
      // Aquí puedes setear los valores de las categorías si editas un producto ya existente.
      // setSelectedFirstCategory(product.firstCategoryId)
      // setSelectedSecondCategory(product.secondCategoryId)
      // setSelectedThirdCategory(product.thirdCategoryId)
    }
  }, [product])

  // Función para obtener las opciones de la primera categoría
  const getFirstCategoryOptions = () => {
    return categories.map((category) => (
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ))
  }

  // Función para obtener las opciones de la segunda categoría en base a la primera categoría seleccionada
  const getSecondCategoryOptions = () => {
    const selectedCategory = categories.find((category) => category.id === selectedFirstCategory)
    return selectedCategory?.second_categories.map((secondCategory) => (
      <option key={secondCategory.id} value={secondCategory.id}>
        {secondCategory.name}
      </option>
    )) || []
  }

  // Función para obtener las opciones de la tercera categoría en base a la segunda categoría seleccionada
  const getThirdCategoryOptions = () => {
    const selectedCategory = categories.find((category) => category.id === selectedFirstCategory)
    const selectedSecondCat = selectedCategory?.second_categories.find((secondCategory) => secondCategory.id === selectedSecondCategory)
    return selectedSecondCat?.third_categories.map((thirdCategory) => (
      <option key={thirdCategory.id} value={thirdCategory.id}>
        {thirdCategory.name}
      </option>
    )) || []
  }

  const handleFirstCategoryChange = (value) => {
    setSelectedFirstCategory(value)
    setSelectedSecondCategory(null) // Resetear segunda y tercera categoría al cambiar la primera
    setSelectedThirdCategory(null)
  }

  const handleSecondCategoryChange = (value) => {
    setSelectedSecondCategory(value)
    setSelectedThirdCategory(null) // Resetear tercera categoría al cambiar la segunda
  }

  const handleThirdCategoryChange = (value) => {
    setSelectedThirdCategory(value)
  }
  const onSubmit = (data) => {
    const formData = {
      ...data,
      short_name: data.short_name || null,
      long_name: data.long_name || null,
      brand: data.brand,
      ean: parseInt(data.ean),
      sku_sap: parseInt(data.sku_sap) || null,
      sku_vtex: parseInt(data.sku_vtex) || null,
      measure_unit: data.measure_unit,
      content_detail: parseInt(data.content_detail),
      proxy_duration: data.proxy_duration || 'No Perecible',
      pack: packValues.length > 0 ? packValues : null,
      // aisle: data.aisle || null,
      generated_ean: isGeneratedEan,
      autoshoppable_available: !!(data.sku_sap && data.sku_vtex),
      category_id: parseInt(data.category)
    }
    if (action === 'edit') {
      formData.id = product.id
      formData.category_id = data.category_id
    }
    save(formData, selectedImage)
  }

  const handleDelete = () => {
    if (showDeleteModal) {
      setShowDeleteModal(false)
    } else {
      setShowDeleteModal(true)
    }
  }

  const confirmDelete = (id) => {
    setShowDeleteModal(false)
    deleter(id)
  }

  const handleChange = (key, value) => {
    const clone = { ...editProduct }

    if (key === 'image' && product?.image_url) {
      clone.image_url = value
      setEditProduct(clone)
    }
    if (key === 'image') {
      setSelectedImage(value)
    }
  }

  // const handleThirdCategoryChange = (value) => {
  //   setSelectedThirdCategory(value)

  // Encontrar la categoría secundaria (segunda) correspondiente a la tercera categoría seleccionada
  // const secondCategory = categories.find(category => category.id === value).parentId
  // setSelectedSecondCategory(secondCategory)

  // // Encontrar la categoría principal (primera) correspondiente a la segunda categoría
  // const firstCategory = categories.find(category => category.id === secondCategory).parentId
  // setSelectedFirstCategory(firstCategory)

  // // Establecer los valores en el formulario
  // setValue('second_category', secondCategory)
  // setValue('first_category', firstCategory)

  return (
    <>
      <input type='checkbox' id='product-modal' className='modal-toggle' checked={show} onChange={toggleModal} />
      <div className='modal'>
        <div className='flex items-center justify-center'>
          <div className='modal-box w-full lg:w-11/12 xl:max-w-3xl mx-auto max-w-screen-sm mt-4'>
            <h3 className='font-bold text-lg'>{action === 'create' ? 'Crear' : 'Editar'} producto</h3>
            <form onSubmit={handleSubmit(onSubmit)} onKeyDown={(e) => { e.key === 'Enter' && e.preventDefault() }}>
              <div className='grid grid-cols-12 gap-2'>
                <div className='col-span-12 md:col-span-4 form-control w-full'>
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
                        /^\d+$/.test(value) || 'EAN debe contener solo números'
                    }}
                    render={({ field }) => (
                      <input type='text' placeholder='EAN' {...field} className='input input-bordered w-full' ref={eanRef} />
                    )}
                  />
                  {formState.errors.ean && (
                    <p className='text-error'>{formState.errors.ean.message}</p>
                  )}
                </div>
                <div className='col-span-12 md:col-span-2 form-control w-full flex-column items-center'>
                  <div className='flex items-center pt-4 mt-4'>
                    <input
                      type='checkbox'
                      id='generatedEanCheckbox'
                      checked={isGeneratedEan}
                      onChange={(e) => setIsGeneratedEan(e.target.checked)}
                      className='mr-1 checkbox checkbox-lg'
                    />
                    <label className='label'>
                      <span className='label-text'>EAN <br /> generado</span>
                    </label>
                  </div>

                </div>
                <div className='col-span-12 md:col-span-3 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>SKU VTEX</span>
                  </label>
                  <Controller
                    name='sku_vtex'
                    control={control}
                    defaultValue=''
                    rules={{
                      validate: value => {
                        if (!value) return true // Si el campo está vacío, no realiza ninguna validación
                        return /^\d+$/.test(value) || 'Debe contener solo números'
                      }
                    }}
                    render={({ field }) => (
                      <input type='text' placeholder='SKU VTEX' {...field} className='input input-bordered w-full' ref={vtexRef} />
                    )}
                  />
                  {formState.errors.sku_vtex && (
                    <p className='text-error'>{formState.errors.sku_vtex.message}</p>
                  )}
                </div>
                <div className='col-span-12 md:col-span-3 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>SKU SAP</span>
                  </label>
                  <Controller
                    name='sku_sap'
                    control={control}
                    defaultValue=''
                    required={false}
                    rules={{
                      validate: value => {
                        if (!value) return true // Si el campo está vacío, no realiza ninguna validación
                        return /^\d+$/.test(value) || 'Debe contener solo números'
                      }
                    }}
                    render={({ field }) => (
                      <input type='text' required={false} placeholder='SKU SAP' {...field} className='input input-bordered w-full' ref={sapRef} />
                    )}
                  />
                  {formState.errors.sku_sap && (
                    <p className='text-error'>{formState.errors.sku_sap.message}</p>
                  )}
                </div>
                <div className='col-span-12 md:col-span-6 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Nombre corto</span>
                  </label>
                  <Controller
                    name='short_name'
                    control={control}
                    defaultValue=''
                    rules={{ required: 'Requerido' }}
                    render={({ field }) => (
                      <>
                        <input
                          type='text' placeholder='Nombre corto' {...field} className='input input-bordered w-full' ref={(e) => {
                            field.ref(e)
                            nameRef.current = e
                          }}
                        />
                        {formState.errors.short_name && (
                          <p className='text-error'>{formState.errors.short_name.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
                <div className='col-span-12 md:col-span-6 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Nombre largo</span>
                  </label>
                  <Controller
                    name='long_name'
                    control={control}
                    defaultValue=''
                    rules={{
                      validate: value => {
                        if (!value) return true
                        return /^[A-Za-z0-9\s]+$/.test(value) || 'Nombre largo debe contener solo letras, números y espacios'
                      }
                    }}
                    render={({ field }) => (
                      <>
                        <input
                          type='text' placeholder='Nombre largo' {...field} className='input input-bordered w-full' ref={(e) => {
                            field.ref(e)
                            nameLongRef.current = e
                          }}
                        />
                        {formState.errors.long_name && (
                          <p className='text-error'>{formState.errors.long_name.message}</p>
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
                {/* <div className='col-span-12 md:col-span-4 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Categoría Principal</span>
                  </label>
                  <Controller
                    name='first_category'
                    control={control}
                    defaultValue={selectedFirstCategory || ''}
                    render={({ field }) => (
                      <select className='select select-bordered' {...field} disabled>
                        <option value=''>Seleccione una categoría</option>
                        {categories.filter(category => !category.parentId).map(
                          (category) => <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                      </select>
                    )}
                  />
                </div> */}

                {/* <div className='col-span-12 md:col-span-4 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Categoría Secundaria</span>
                  </label>
                  <Controller
                    name='second_category'
                    control={control}
                    defaultValue={selectedSecondCategory || ''}
                    render={({ field }) => (
                      <select className='select select-bordered' {...field} disabled>
                        <option value=''>Seleccione una categoría</option>
                        {categories.filter(category => category.parentId === selectedFirstCategory).map(
                          (category) => <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                      </select>
                    )}
                  />
                </div> */}

                {/* <div className='col-span-12 md:col-span-4 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Categoría Terciaria</span>
                  </label>
                  <Controller
                    name='third_category'
                    control={control}
                    defaultValue={selectedThirdCategory || ''}
                    render={({ field }) => (
                      <select className='select select-bordered' {...field} onChange={(e) => handleThirdCategoryChange(e.target.value)}>
                        <option value=''>Seleccione una categoría</option>
                        {categories.filter(category => category.parentId === selectedSecondCategory).map(
                          (category) => <option key={category.id} value={category.id}>{category.name}</option>
                        )}
                      </select>
                    )}
                  />
                </div> */}
                {/* Select Primera Categoría */}
                <div className='form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Categoría Principal</span>
                  </label>
                  <select
                    className='select select-bordered'
                    value={selectedFirstCategory || ''}
                    onChange={(e) => handleFirstCategoryChange(parseInt(e.target.value))}
                  >
                    <option value=''>Seleccione una categoría</option>
                    {getFirstCategoryOptions()}
                  </select>
                </div>

                {/* Select Segunda Categoría */}
                {selectedFirstCategory && (
                  <div className='form-control w-full mt-4'>
                    <label className='label'>
                      <span className='label-text'>Categoría Secundaria</span>
                    </label>
                    <select
                      className='select select-bordered'
                      value={selectedSecondCategory || ''}
                      onChange={(e) => handleSecondCategoryChange(parseInt(e.target.value))}
                    >
                      <option value=''>Seleccione una categoría</option>
                      {getSecondCategoryOptions()}
                    </select>
                  </div>
                )}

                {/* Select Tercera Categoría */}
                {selectedSecondCategory && (
                  <div className='form-control w-full mt-4'>
                    <label className='label'>
                      <span className='label-text'>Categoría Terciaria</span>
                    </label>
                    <select
                      className='select select-bordered'
                      value={selectedThirdCategory || ''}
                      onChange={(e) => handleThirdCategoryChange(parseInt(e.target.value))}
                    >
                      <option value=''>Seleccione una categoría</option>
                      {getThirdCategoryOptions()}
                    </select>
                  </div>
                )}
                <div className='col-span-12 md:col-span-3 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Vida útil</span>
                  </label>
                  <Controller
                    name='proxy_duration'
                    control={control}
                    defaultValue='No Perecible'
                    render={({ field }) => (
                      <select className='select select-bordered' {...field}>
                        <option disabled defaultValue=''>Elija una</option>
                        {Object.keys(proxy_duration).map(
                          (key) => <option key={key} value={proxy_duration[key]}>{proxy_duration[key]}</option> // eslint-disable-line camelcase
                        )}
                      </select>
                    )}
                  />
                </div>

                <div className='col-span-12 md:col-span-3 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Pack</span>
                  </label>
                  <Controller
                    name='pack'
                    control={control}
                    defaultValue=''
                    rules={{
                      validate: value => {
                        if (!value) return true
                        return /^\d+$/.test(value) || 'Debe contener solo números'
                      }
                    }}
                    render={({ field }) => (
                      <div className='flex input input-bordered'>
                        <input
                          {...field}
                          type='text'
                          placeholder='Agregar pack'
                          className=' w-full mr-2'
                        />
                        <button
                          type='button'
                          onClick={() => {
                            if (typeof field.value === 'string' && field.value.trim() !== '') {
                              handleAddPackValue(parseInt(field.value.trim()))
                              field.onChange('')
                            }
                          }}
                        >
                          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                            <path strokeLinecap='round' strokeLinejoin='round' d='M12 4.5v15m7.5-7.5h-15' />
                          </svg>

                        </button>
                      </div>
                    )}
                  />
                  {packValues.length > 0 && packValues.map((value, index) => (
                    <span key={index} className='flex justify-between bg-gray-200 rounded px-2 py-1 m-1'>
                      {value}
                      <button
                        onClick={() => {
                          handleDeletePackValue(value)
                        }}
                        className='button flex flex-row justify-end'
                      >
                        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                          <path strokeLinecap='round' strokeLinejoin='round' d='m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z' />
                        </svg>
                      </button>
                    </span>
                  ))}
                  {formState.errors.pack && (
                    <p className='text-error'>{formState.errors.pack.message}</p>
                  )}
                </div>
                <div className='col-span-12 md:col-span-3 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Contenido neto</span>
                  </label>
                  <Controller
                    name='content_detail'
                    control={control}
                    defaultValue=''
                    rules={{ validate: value => /^\d+$/.test(value) || 'Debe contener solo números' }}
                    render={({ field }) => (
                      <>
                        <input type='text' placeholder='Contenido neto' {...field} className='input input-bordered w-full' />
                        {formState.errors.content_detail && (
                          <p className='text-error'>{formState.errors.content_detail.message}</p>
                        )}
                      </>
                    )}
                  />
                </div>
                {/* MEASURE */}
                <div className='col-span-12 md:col-span-3 form-control w-full'>
                  <label className='label'>
                    <span className='label-text'>Medida</span>
                  </label>
                  <Controller
                    name='measure_unit'
                    control={control}
                    rules={{ required: 'Seleccione una' }}
                    defaultValue=''
                    render={({ field }) => (
                      <select className='select select-bordered' {...field}>
                        <option disabled value=''>Elija una</option>
                        {Object.keys(measure_unit).map(
                          (key) => <option key={key} value={key}>{measure_unit[key]}</option> // eslint-disable-line camelcase
                        )}
                      </select>
                    )}
                  />
                  {formState.errors.measure_unit && (
                    <p className='text-error'>{formState.errors.measure_unit.message}</p>
                  )}
                </div>
                <div className='flex flex-row w-full col-span-12 gap-2 pt-1'>
                  {product.primary_image && (
                    <div className=' form-control w-32 flex-grow-0'>
                      <label className='label'>
                        <span className='label-text'>Imagen actual</span>
                      </label>
                      <div className='w-full h-auto p-0 m-0 rounded-xl border border-d-gray aspect-square flex-grow-0 overflow-hidden'>
                        {product.primary_image
                          ? (
                            <img className='m-0 p-0 object-contain w-full h-full ' src={product.primary_image} />
                            )
                          : (
                              ''
                            )}
                      </div>
                    </div>
                  )}

                  <div className='form-control w-full flex-grow'>
                    <label className='label'>
                      <span className='label-text'>{product.primary_image ? 'Sustituir imagen' : 'Imagen'}</span>
                    </label>
                    <input type='file' className='file-input file-input-bordered w-full' onChange={(e) => handleChange('image', e.target.files[0])} />
                  </div>
                </div>
              </div>

              <div className='divider' />
              <div className='modal-action flex flex-row'>
                {action !== 'create' && (
                  <div className='grow-0'>
                    <button type='button' className='btn rounded-full' onClick={handleDelete}>
                      Eliminar
                    </button>
                  </div>
                )}

                <div className='grow-0 flex gap-4 '>
                  {/* <ButtonCancel /> */}
                  <label htmlFor='product-modal' className='btn rounded-full'>
                    Cancelar
                  </label>
                  <button type='submit' className='btn rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
                    Guardar
                  </button>
                  {/* <ButtonPrimary text='Guardar' /> */}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showDeleteModal &&

        <DeleteProductModal product={product} showDeleteModal={showDeleteModal} confirm={confirmDelete} toggleDeleteModal={handleDelete} />}
    </>
  )
}
