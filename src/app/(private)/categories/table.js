/* eslint-disable multiline-ternary */
// import React, { useState } from 'react'
import Link from 'next/link'
import DspLoader from '@/components/admin/common/loader'
// import ConfirmationModal from '@/components/admin/modals/confirmationModal'
// import { swallError, swallInfo } from '@/utils/sweetAlerts'
// import { deleteCategory } from '@/api/categories'

/**
 * CategoriesTable component for displaying and managing a list of categories.
 *
 * @param {Object} props - The component props.
 * @param {Array} props.data - The list of categories.
 * @param {Function} props.updateCategories - Function to refresh the categories list.
 * @returns {JSX.Element} The CategoriesTable component.
 */
export default function CategoriesTable ({ data, updateCategories }) {
  // const [showModal, setShowModal] = useState(false)
  // const [selectedCategory, setSelectedCategory] = useState(null)
  // const [checkedStates, setCheckedStates] = useState({})

  /**
   * Handles the click event to delete a category.
   *
   * @param {Event} e - The click event.
   * @param {number} id - The ID of the category to delete.
   */
  // const handleDeleteClick = async (e, id) => {
  //   e.preventDefault()
  //   try {
  //     const category = { id }
  //     setSelectedCategory(category)
  //     setShowModal(true)
  //   } catch (error) {
  //     swallError('Error al eliminar categoría:', false)
  //     console.error('Error al eliminar categoría:', error)
  //   }
  // }

  // Función para manejar la selección de la categoría y mostrar el modal

  /**
   * Handles the confirmation to delete a category.
   *
   * @param {number} id - The ID of the category to delete.
   */
  // const handleDeleteConfirmation = async (id) => {
  //   try {
  //     const response = await deleteCategory(id)
  //     if (response.successful) {
  //       setShowModal(false)
  //       swallInfo('Categoría eliminada exitosamente')
  //       updateCategories() // Actualizamos las categorías después de eliminar
  //     }
  //   } catch (error) {
  //     swallError('Error al eliminar la categoría. Inténtelo de nuevo.', false)
  //     console.error('Error al eliminar la categoría:', error)
  //   }
  // }

  if (!data || data.length === 0) {
    return <DspLoader />
  }

  /**
   * Toggles the visibility of the confirmation modal.
   */
  // const handleConfirmationModal = () => {
  //   setShowModal(!showModal)
  // }

  const capitalizeWords = (str) => {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ')
  }

  return (
    <>
      <form>
        <div className='overflow-x-auto flex justify-center'>
          <table className='table table-zebra text-d-dark-dark-purple max-[431px]:hidden w-full border border-b'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th />
                <th>ID</th>
                <th>Título</th>
                <th>Categoría</th>
                <th>Subcategoría</th>
                {/* <th>Status</th> */}
                <th>Editar</th>
              </tr>
            </thead>
            <tbody>
              {data && data.length > 0 && data.map((category) => (
                category?.id && (
                  <tr key={category.id}>
                    <td />
                    <td>{category.id}</td>
                    {/* Primera categoría */}
                    <td className={`font-semibold ${!category.active ? 'line-through text-gray-400' : ''}`}>
                      {(category.name).toUpperCase()}
                    </td>

                    {/* Columna de las segundas categorías */}
                    {/* Segunda categoría */}
                    <td>
                      {category.second_categories && category.second_categories.length > 0 ? (
                        <ul className='list-disc'>
                          {category.second_categories.map((secondCategory, index) => (
                            <li key={secondCategory.id} className={`second-category second-category-${index}`}>
                              <span className={`${!secondCategory.active ? 'line-through text-gray-400' : ''}`}>
                                {capitalizeWords(secondCategory.name)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span>Sin subcategorías</span>
                      )}
                    </td>

                    {/* Nueva columna para las terceras categorías */}
                    <td>
                      {category.second_categories && category.second_categories.length > 0 ? (
                        <ul>
                          {category.second_categories.map((secondCategory) => (
                            <li key={secondCategory.id}>
                              {secondCategory.third_categories && secondCategory.third_categories.length > 0 ? (
                                <ul>
                                  {secondCategory.third_categories.map((thirdCategory) => (
                                    <li key={thirdCategory.id} className='border-b ml-6 text-d-soft-purple'>
                                      <span className={`text-xs text-gray-600 ${!thirdCategory.active ? 'line-through text-gray-400' : ''}`}>
                                        {capitalizeWords(thirdCategory.name) || 'Sin nombre'}
                                      </span>
                                    </li>
                                  ))}
                                </ul>
                              ) : null}
                            </li>
                          ))}
                        </ul>
                      ) : 'Sin nombre'}
                    </td>

                    {/* <td>
                      <div className='flex items-center justify-center'>
                        <input
                          type='checkbox'
                          name={`checkbox-${category.id}`}
                          id={`checkbox-${category.id}`}
                          className='hidden'
                          checked={checkedStates[category.id] || false}
                          onChange={() => handleChange(category.id)}
                        />
                        <label htmlFor={`checkbox-${category.id}`} className={switchClasses(category.active)}>
                          <div className={knobClasses(category.active)} />
                        </label>
                      </div>
                    </td> */}

                    <td>
                      <Link href={`/categories/edit?firstCategoryId=${category?.id}`}>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          fill='none'
                          viewBox='0 0 24 24'
                          strokeWidth='1.5'
                          stroke='currentColor'
                          className='w-6 h-6 inline-block text-d-dark-dark-purple hover:text-d-soft-soft-purple transition duration-300 ease-in-out align-middle'
                        >
                          <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                        </svg>
                      </Link>
                    </td>
                  </tr>
                )
              ))}
            </tbody>
          </table>

          {/* {showModal && (
            <ConfirmationModal
              title='Confirmación'
              message='¿Estás seguro de eliminar esta categoría?'
              cancelButtonText='Cancelar'
              handleOperationConfirmation={() => handleDeleteConfirmation(selectedCategory.id)}
              handleConfirmationModal={handleConfirmationModal}
              confirmButtonText='Eliminar categoría'
            />
          )} */}
        </div>
      </form>

      {/* MOBILE */}
      <form className='min-[431px]:hidden'>
        <div className='overflow-x-auto'>
          {data.map((category) => (
            <div key={category.id} className='pb-2 w-screen'>
              <div className='flex flex-col md:hidden bg-d-soft-purple rounded-md'>
                <div className='flex justify-end mr-16 mt-2 gap-4'>
                  <Link href={`/categories/edit?firstCategoryId=${category?.id}`}>
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10' />
                    </svg>
                  </Link>
                  {/* <button onClick={(e) => handleDeleteClick(e, category.id)}>
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                      strokeWidth={1.5}
                      stroke='currentColor'
                      className='w-6 h-6 inline-block text-d-dark-dark-purple hover:text-d-soft-soft-purple transition duration-300 ease-in-out align-middle'
                    >
                      <path strokeLinecap='round' strokeLinejoin='round' d='M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0' />
                    </svg>
                  </button> */}
                </div>
                <div className='flex flex-col'>
                  <h2>
                    <span className='mr-20 font-bold'>ID</span> {category.id}
                  </h2>
                  <h3 className={`${!category.active ? 'line-through text-gray-400' : ''}`}>
                    <span className='mr-7 font-bold'>Título</span> {(category.name).toUpperCase()}
                  </h3>

                  {/* <h3>
                    <span className='mr-9 font-bold'>Status</span>
                    <input
                      type='checkbox'
                      name={`checkbox-${category.id}`}
                      id={`checkbox-${category.id}`}
                      className='hidden'
                      checked={checkedStates[category.id] || false}
                      onChange={() => handleChange(category.id)}
                    />
                    <label htmlFor={`checkbox-${category.id}`} className={switchClasses(category.active)}>
                      <div className={knobClasses(category.active)} />
                    </label>
                  </h3> */}

                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </>
  )
}
