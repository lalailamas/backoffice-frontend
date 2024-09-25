'use client'
import { createCategory, listCategories } from '@/api/categories'
import React, { useState, useEffect } from 'react'
import CategoriesTable from './table'
import Pager from '@/components/admin/common/pager'
import { swallInfo, swallError } from '@/utils/sweetAlerts'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import ButtonCancel from '@/components/admin/common/buttons/ButtonCancel'
import MainTitle from '@/components/admin/common/titles/MainTitle'

function Categories () {
  const [categories, setCategories] = useState([])
  const [allCategories, setAllCategories] = useState([])
  // console.log(allCategories, 'allCategories')
  const [showModal, setShowModal] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [categoryLevel, setCategoryLevel] = useState('first')
  const [firstCategory, setFirstCategory] = useState('')
  const [secondCategory, setSecondCategory] = useState('')
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [meta, setMeta] = useState(null)

  // Fetch categories desde la API
  const fetchCategories = async () => {
    try {
      const response = await listCategories(limit, page)
      if (response) {
        setCategories(response.data.data)
        setMeta({
          pagination: {
            page: parseInt(response.data.meta.pagination.page),
            pages: response.data.meta.pagination.pages,
            total: response.data.meta.pagination.total,
            limit: parseInt(response.data.meta.pagination.limit)
          }
        })
      }
    } catch (error) {
      console.error('Error fetching categories', error)
    }
  }

  const fetchAllCategories = async () => {
    try {
      const response = await listCategories(100, 1)
      if (response) {
        setAllCategories(response.data.data)
      }
    } catch (error) {
      console.error('Error fetching categories', error)
    }
  }
  useEffect(() => {
    fetchCategories()
    fetchAllCategories()
  }, [limit, page, categoryName])

  const openModal = (level) => {
    setCategoryLevel(level)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setCategoryName('')
    setFirstCategory('')
    setSecondCategory('')
    // setThirdCategories([])
  }

  // Función para manejar la selección de la segunda categoría
  const handleSecondCategoryChange = (e) => {
    const selectedSecondCategoryId = e.target.value
    setSecondCategory(selectedSecondCategoryId)

    // Encontrar la segunda categoría seleccionada y mapear sus terceras categorías
    // const selectedSecondCategory = categories
    //   .flatMap(cat => cat.second_categories || [])
    //   .find(secondCat => secondCat.id === parseInt(selectedSecondCategoryId))

    // if (selectedSecondCategory) {
    //   setThirdCategories(selectedSecondCategory.third_categories || [])
    // } else {
    //   setThirdCategories([]) // Si no hay terceras categorías, limpiamos el array
    // }
  }

  const onSubmit = async () => {
    try {
      let categoryData = { name: categoryName }

      if (categoryLevel === 'second') {
        if (!firstCategory) {
          swallError('Por favor, selecciona una primera categoría', false)
          return
        }
        categoryData = {
          ...categoryData,
          first_category_id: firstCategory
        }
      }

      if (categoryLevel === 'third') {
        if (!firstCategory || !secondCategory) {
          swallError('Por favor, selecciona una primera y segunda categoría', false)
          return
        }
        categoryData = {
          ...categoryData,
          second_category_id: secondCategory
        }
      }

      const response = await createCategory(categoryData, categoryLevel)
      if (response) {
        setCategoryName('')
      }
      swallInfo('Categoría creada exitosamente')

      closeModal()
    } catch (error) {
      swallError('Error al crear la categoría. Por favor, inténtelo de nuevo', false)
      console.error('Error al crear la categoría:', error)
    }
  }

  return (
    <>
      <MainTitle>Categorías</MainTitle>
      <div className='flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-2 justify-end px-8'>
        <div className='flex flex-col md:flex-row gap-4 justify-end pb-4'>
          <ButtonPrimary text='Nuevo título' onClick={() => openModal('first')} />
          <ButtonPrimary text='Nueva categoría' onClick={() => openModal('second')} />
          <ButtonPrimary text='Nueva subcategoría' onClick={() => openModal('third')} />
        </div>

        {/* Modal */}
        {showModal && (
          <div className='fixed z-50 inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50'>
            <div className='bg-white p-6 rounded-lg shadow-lg max-w-md w-full'>
              <h3>{`Crear nueva ${categoryLevel === 'first' ? 'título' : categoryLevel === 'second' ? 'categoría' : 'subcategoria'} `}</h3>

              <input
                type='text'
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                placeholder='Nombre de la subcategoría'
                className='border p-2 w-full mt-2'
              />

              {categoryLevel === 'second' && (
                <select
                  value={firstCategory}
                  onChange={(e) => setFirstCategory(e.target.value)}
                  className='border p-2 w-full mt-2'
                >
                  <option value=''>Selecciona primera categoría</option>
                  {allCategories?.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              )}

              {categoryLevel === 'third' && (
                <>
                  <select
                    value={firstCategory}
                    onChange={(e) => setFirstCategory(e.target.value)}
                    className='border p-2 w-full mt-2'
                  >
                    <option value=''>Selecciona título</option>
                    {allCategories?.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.name}</option>
                    ))}
                  </select>

                  <select
                    value={secondCategory}
                    onChange={handleSecondCategoryChange}
                    className='border p-2 w-full mt-2'
                    disabled={!firstCategory}
                  >
                    <option value=''>Selecciona categoría</option>
                    {firstCategory && allCategories
                      .find(cat => cat.id === parseInt(firstCategory))?.second_categories.map(subcat => (
                        <option key={subcat.id} value={subcat.id}>{subcat.name}</option>
                      ))}
                  </select>
                </>
              )}

              <div className='py-4 mt-6 gap-4 flex justify-center'>
                <ButtonPrimary text='Guardar' onClick={onSubmit} />
                <ButtonCancel text='Cancelar' onClick={closeModal} />
              </div>

            </div>
          </div>
        )}
      </div>

      <div className='px-8 mb-11 '>
        <CategoriesTable data={categories} updateCategories={fetchCategories} />
        <div className='w-full flex flex-row mt-4 justify-center'>
          <Pager meta={meta} setPage={setPage} />
        </div>
      </div>
    </>
  )
}

export default Categories
