'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { getCategory, editCategory } from '@/api/categories'
import DspLoader from '@/components/admin/common/loader'
import { swallError, swallInfo } from '@/utils/sweetAlerts'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import ButtonCancel from '@/components/admin/common/buttons/ButtonCancel'
/**
 * EditCategory component for editing an existing category.
 *
 * @returns {JSX.Element} The EditCategory component.
 */
function EditCategory () {
  const searchParams = useSearchParams()
  const categoryId = searchParams.get('id')
  const [category, setCategory] = useState({})
  const [categoryName, setCategoryName] = useState('')
  const [isActive, setIsActive] = useState(false)
  const router = useRouter()
  /**
   * Fetches the category details from the API and updates the state.
   */
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await getCategory(categoryId)
        setCategory(response)
        setCategoryName(response.name)
        setIsActive(response.active)
      } catch (error) {
        console.error('Error fetching category details', error)
      }
    }

    fetchCategory()
  }, [categoryId])
  /**
   * Handles the change event for the category name input.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleNameChange = (e) => {
    setCategoryName(e.target.value)
  }
  /**
   * Toggles the active state of the category.
   */
  const handleActiveChange = () => {
    setIsActive((prevIsActive) => !prevIsActive)
  }
  /**
   * Handles the save event for updating the category.
   * Sends the updated category data to the API and redirects to the categories page.
   */
  const handleSave = async () => {
    try {
      if (!categoryId) {
        console.error('El ID de la categoría es inválido.')
        return
      }

      const updatedCategory = {
        id: categoryId,
        name: categoryName,
        active: isActive
      }

      await editCategory(categoryId, updatedCategory)
      swallInfo('Categoría actualizada exitosamente')
      router.push('/categories')
    } catch (error) {
      swallError('Error al actualizar la categoría')
      console.error('Error al actualizar la categoría', error)
    }
  }

  if (!category || Object.keys(category).length === 0) {
    return <DspLoader />
  }

  return (
    <>
      <MainTitle>Editar Categoría</MainTitle>
      <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center'>
        <div className='bg-white px-6 py-3'>
          <div>
            <input
              type='text'
              value={categoryName}
              onChange={handleNameChange}
              className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
              placeholder='Nombre de categoría'
            />
          </div>
          <div className='p-4'>
            <label htmlFor='isActiveCheckbox'>
              <input
                type='checkbox'
                id='isActiveCheckbox'
                checked={isActive}
                onChange={handleActiveChange}
                className='mr-2 h-4 w-4'
              />
              Activar/Desactivar Categoría
            </label>
          </div>
          <div className='flex gap-3 p-5'>
            <ButtonCancel text='Cancelar' onClick={() => router.push('/categories')} />
            <ButtonPrimary text='Guardar cambios' onClick={handleSave} />

          </div>

        </div>
      </div>
    </>
  )
}

export default EditCategory