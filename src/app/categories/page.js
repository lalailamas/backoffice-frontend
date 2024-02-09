'use client'
import { createCategory, listCategories } from '@/api/categories'
import React, { useState, useEffect } from 'react'
import CategoriesTable from './table'
import Pager from '@/components/admin/common/pager'
import { swallInfo, swallError } from '@/utils/sweetAlerts'

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
      // console.log(response, 'lista categorias')
      // setCategories(response.data)
      // setMeta(response.meta)
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
      const response = await createCategory({ name: categoryName })
      console.log(response, 'respuesta createCategory')
      swallInfo('Categoría creada exitosamente')
      closeModal()
    } catch (error) {
      swallError('Error al crear la categoría', false)
      console.error('Error al crear la categoría. Por favor, inténtelo de nuevo', error)
    }
  }

  return (
    <>
      <div className='flex justify-center mt-4 mb-4 p-4'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center md:text-left'>Categorías</h2>
      </div>
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
                  <div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
                    <button
                      onClick={() => onSubmit()}
                      className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-d-dark-dark-purple font-medium hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple text-white sm:ml-3 sm:w-auto sm:text-sm'
                    >
                      Crear
                    </button>
                    <button
                      onClick={closeModal}
                      className='mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:w-auto sm:text-sm'
                    >
                      Cancelar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
          <button onClick={openModal} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>Crear Categoría</button>
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
