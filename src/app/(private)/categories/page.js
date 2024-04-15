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
  const [showModal, setShowModal] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [limit] = useState(10)
  const [page, setPage] = useState(1)
  const [search] = useState('')
  const [meta, setMeta] = useState(null)

  const fetchCategories = async () => {
    try {
      const response = await listCategories(limit, page, search)
      if (response) {
        setCategories(response.data)
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
      console.error('Error fetching categories', error)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [limit, page, search])

  const openModal = () => {
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setCategoryName('')
  }

  const onSubmit = async () => {
    try {
      await createCategory({ name: categoryName })
      swallInfo('Categoría creada exitosamente')
      closeModal()
    } catch (error) {
      swallError('Error al crear la categoría', false)
      console.error('Error al crear la categoría. Por favor, inténtelo de nuevo', error)
    }
  }

  return (
    <>
      <MainTitle>Categorías</MainTitle>
      <div className='flex flex-row md:flex-row gap-y-2 md:gap-y-0 md:gap-x-2 justify-end'>
        <div className='p-2 pb-8 pr-10'>
          {showModal && (
            <div className='fixed z-50 inset-0 overflow-y-auto'>
              <div className='flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
                <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
                  <div className='absolute inset-0 bg-gray-500 opacity-75' />
                </div>
                <span className='hidden sm:inline-block sm:align-middle sm:h-screen' aria-hidden='true'>&#8203;</span>
                <div className='inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6'>
                  <div className='mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left'>
                    <h3 className='text-lg leading-6 font-medium text-gray-900' id='modal-headline'>
                      Crear Categoría
                    </h3>
                    <div className='mt-2'>
                      <input
                        type='text'
                        value={categoryName}
                        onChange={(e) => setCategoryName(e.target.value)}
                        className='border border-gray-300 p-2 rounded-md w-full'
                        placeholder='Nombre de la categoría'
                      />
                    </div>
                  </div>
                  <div className='flex items-center mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-4'>
                    <ButtonPrimary text='Crear' onClick={() => onSubmit()} />
                    <ButtonCancel onClick={closeModal} />
                  </div>
                </div>
              </div>
            </div>
          )}
          <ButtonPrimary text='Crear Categoría' onClick={openModal} />
        </div>
      </div>
      <div className='px-8 mb-11'>
        <CategoriesTable data={categories} updateCategories={fetchCategories} />
        <div className='w-full flex flex-row mt-4 justify-center'>
          <Pager meta={meta} setPage={setPage} />
        </div>
      </div>

    </>
  )
}

export default Categories
