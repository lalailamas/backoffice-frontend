'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { listCategories, editCategory } from '@/api/categories' // Suponemos que listCategories trae todas las categorías
import { swallError, swallInfo } from '@/utils/sweetAlerts'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import ButtonCancel from '@/components/admin/common/buttons/ButtonCancel'
import SwitchButton from '@/components/admin/common/switch_button'
import DspLoader from '@/components/admin/common/loader'

// TreeView component for displaying categories and subcategories in a tree structure
const TreeView = ({ selectedSecondCategory, handleSecondCategoryNameChange, handleThirdCategoryNameChange, handleSwitchChange }) => {
  return (
    <div className=' w-full'>
      <h3 className='font-bold py-3'>Categorías y SubCategorías</h3>
      <form>
        {selectedSecondCategory.map((secondCat, index) => (
          <div key={secondCat.id} className='mb-4 w-full'>
            <div className='flex items-center w-full'>
              <span className=''>
                <svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5 mr-2' viewBox='0 0 20 20' fill='currentColor'>
                  <path fillRule='evenodd' d='M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z' clipRule='evenodd' />
                </svg>
              </span>
              <input
                id={`second-category-${secondCat.id}`}
                type='text'
                value={secondCat.name}
                onChange={(e) => handleSecondCategoryNameChange(e, index)}
                className='input input-bordered border-d-dark-dark-purple w-full bg-purple-100 rounded-full text-d-dark-dark-purple'
              />
              <div className=''>
                <SwitchButton
                  label='Activar'
                  checked={secondCat.active}
                  onCheck={() => handleSwitchChange('second', index)}
                />
              </div>
            </div>

            {/* Mostrar subcategorías */}
            {secondCat.third_categories && secondCat.third_categories.length > 0 && (
              <div className='ml-6 mt-2'>
                {secondCat.third_categories.map((thirdCat, thirdIndex) => (
                  <div key={thirdCat.id} className='flex items-center w-full'>
                    {/* Input de la tercera categoría */}
                    <input
                      id={`third-category-${thirdCat.id}`}
                      type='text'
                      value={thirdCat.name}
                      onChange={(e) => handleThirdCategoryNameChange(e, index, thirdIndex)}
                      className='input input-bordered w-full bg-purple-50 rounded-full text-d-dark-dark-purple mt-2 mr-2'
                    />

                    {/* SwitchButton de la tercera categoría */}
                    <div className=' flex items-center'>
                      <SwitchButton
                        label='Activar'
                        checked={thirdCat.active}
                        onCheck={() => handleSwitchChange('third', index, thirdIndex)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </form>
    </div>
  )
}

// Main EditCategory component
function EditCategory () {
  const searchParams = useSearchParams()
  const firstCategoryId = searchParams.get('firstCategoryId')
  const [category, setCategory] = useState({})
  const [categoryName, setCategoryName] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [selectedSecondCategory, setSelectedSecondCategory] = useState('')
  const [initialCategories, setInitialCategories] = useState([]) // Est
  const [loading, setLoading] = useState(true) // Estado de carga

  const router = useRouter()

  /**
   * Fetches all categories and the current category to edit from the API and updates the state.
   */
  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        setLoading(true) // Activa el loader
        const categoriesResponse = await listCategories(100, 1) // Listamos todas las categorías
        const allCategories = categoriesResponse.data.data
        setInitialCategories(JSON.parse(JSON.stringify(allCategories)))

        const firstCategory = allCategories.find(cat => cat.id === parseInt(firstCategoryId))
        if (firstCategory || firstCategory.active !== undefined) {
          setCategory(firstCategory)
          setCategoryName(firstCategory.name)
          setIsActive(firstCategory.active)

          if (firstCategory.second_categories && firstCategory.second_categories.length > 0) {
            setSelectedSecondCategory(firstCategory.second_categories)
          }
        } else {
          console.error('First category not found')
        }
      } catch (error) {
        console.error('Error fetching categories or category details', error)
        swallError('Error al cargar las categorías.')
      } finally {
        setLoading(false) // Desactiva el loader cuando la data esté lista
      }
    }

    if (firstCategoryId) {
      fetchCategoryData()
    }
  }, [firstCategoryId])

  // Función para manejar el cambio en la selección de la primera categoría
  const handleFirstCategoryChange = (e) => {
    setCategoryName(e.target.value)
  }

  // Función para manejar el cambio en la selección de la segunda categoría
  const handleSecondCategoryNameChange = (e, index) => {
    const updatedCategories = [...selectedSecondCategory]
    updatedCategories[index].name = e.target.value // Actualiza el nombre de la segunda categoría correspondiente
    setSelectedSecondCategory(updatedCategories) // Guarda los cambios en el estado
  }

  // Función para manejar el cambio en la tercera categoría
  const handleThirdCategoryNameChange = (e, secondIndex, thirdIndex) => {
    const updatedSecondCategories = [...selectedSecondCategory]

    // Accedemos a la segunda categoría por su índice
    const secondCategory = updatedSecondCategories[secondIndex]

    // Accedemos a la tercera categoría y actualizamos su nombre
    if (secondCategory.third_categories && secondCategory.third_categories[thirdIndex]) {
      secondCategory.third_categories[thirdIndex].name = e.target.value
    }

    setSelectedSecondCategory(updatedSecondCategories) // Guardamos los cambios en el estado
  }

  // const handleActiveChange = () => {
  //   setIsActive(prevIsActive => !prevIsActive)
  // }

  const handleSave = async () => {
    try {
      const updatePromises = []

      if (categoryName !== category.name || isActive !== category.active) {
        const updateFirstCategory = {
          name: categoryName,
          active: isActive
        }
        console.log('Saving first category:', updateFirstCategory)
        updatePromises.push(editCategory(category.id, updateFirstCategory, 'first'))
      }

      selectedSecondCategory.forEach((secondCat, index) => {
        if (secondCat.name !== initialCategories[index]?.second_categories[index]?.name || secondCat.active !== initialCategories[index]?.second_categories[index]?.active) {
          const updateSecondCategory = {
            name: secondCat.name,
            active: secondCat.active,
            first_category_id: category.id
          }
          console.log('Saving second category:', updateSecondCategory)
          updatePromises.push(editCategory(secondCat.id, updateSecondCategory, 'second'))
        }

        secondCat.third_categories?.forEach((thirdCat, thirdIndex) => {
          const initialThirdCategory = initialCategories[index]?.second_categories[index]?.third_categories[thirdIndex]
          if (thirdCat.name !== initialThirdCategory?.name || thirdCat.active !== initialThirdCategory?.active) {
            const updateThirdCategory = {
              name: thirdCat.name,
              active: thirdCat.active,
              second_category_id: secondCat.id
            }
            console.log('Saving third category:', updateThirdCategory)
            updatePromises.push(editCategory(thirdCat.id, updateThirdCategory, 'third'))
          }
        })
      })

      console.log('All update promises:', updatePromises)
      await Promise.all(updatePromises)

      swallInfo('Categorías actualizadas exitosamente')
      router.push('/categories')
    } catch (error) {
      console.error('Error saving categories:', error)
      swallError('Error al actualizar las categorías')
    }
  }

  // Maneja el cambio de estado activo/desactivo para la primera, segunda y tercera categoría
  const handleSwitchChange = (categoryType, index, thirdIndex) => {
    const updatedCategories = [...selectedSecondCategory]

    if (categoryType === 'first') {
      setIsActive(prevIsActive => !prevIsActive)
    } else if (categoryType === 'second') {
      updatedCategories[index].active = !updatedCategories[index].active // Cambia el estado local de la segunda categoría
      // Si la segunda categoría ha sido desactivada, desactivar todas las terceras categorías dentro de ella
      if (!updatedCategories[index].active) {
        updatedCategories[index].third_categories.forEach(thirdCat => {
          thirdCat.active = false // Desactivar visualmente todas las terceras categorías
        })
      }
      setSelectedSecondCategory(updatedCategories)
    } else if (categoryType === 'third') {
      updatedCategories[index].third_categories[thirdIndex].active = !updatedCategories[index].third_categories[thirdIndex].active
      setSelectedSecondCategory(updatedCategories)
    }
  }

  return (
    <>
      <MainTitle>Editar Categoría</MainTitle>

      {loading
        ? (
          <DspLoader />
          )
        : (
          <div className='container w-full px-16  flex-1 flex flex-col justify-center'>
            <h3 className='font-bold '>Título</h3>
            <div className='flex items-center justify-end '>
              <input
                type='text'
                value={categoryName}
                onChange={handleFirstCategoryChange}
                className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                placeholder='Nombre de categoría'
              />
              <SwitchButton
                label='Activar'
                checked={isActive}
                onCheck={() => handleSwitchChange('first')}
              />
            </div>

            {selectedSecondCategory && selectedSecondCategory.length > 0 && (
              <TreeView
                selectedSecondCategory={selectedSecondCategory}
                handleSecondCategoryNameChange={handleSecondCategoryNameChange}
                handleThirdCategoryNameChange={handleThirdCategoryNameChange}
                handleSwitchChange={handleSwitchChange}
              />
            )}

            <div className='flex justify-center gap-3 p-5'>
              <ButtonCancel text='Cancelar' onClick={() => router.push('/categories')} />
              <ButtonPrimary text='Guardar cambios' onClick={handleSave} />
            </div>
          </div>
          )}
    </>
  )
}
export default EditCategory
