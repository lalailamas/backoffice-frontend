import { getDataOnly, postData, deleteData, patchData } from '@/app/api/fetchData'

export const listCategories = async (limit, page) => {
  const url = `categories/tree?limit=${limit}&page=${page}`
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

// export const createCategory = async (category) => {
//   const response = await postData(category, 'category/create', 'application/x-www-form-urlencoded')
//   return response
// }

export const createCategory = async (category, level) => {
  let url
  switch (level) {
    case 'first':
      url = 'first-categories/create'
      break
    case 'second':
      url = 'second-categories/create'
      break
    case 'third':
      url = 'third-categories/create'
      break
    default:
      throw new Error('Invalid level')
  }
  const response = await postData(category, url, 'application/x-www-form-urlencoded')
  // console.log(response, 'response createCategory')
  return response
}

// export const editCategory = async (categoryId, category) => {
//   const url = `category/update/${categoryId}`
//   const response = await putData(category, url, 'application/x-www-form-urlencoded')
//   return response
// }
export const editCategory = async (categoryId, categoryData, level) => {
  console.log(categoryData, 'categoryData')
  let url
  switch (level) {
    case 'first':
      url = `first-categories/update/${categoryId}`
      break
    case 'second':
      url = `second-categories/update/${categoryId}`
      break
    case 'third':
      url = `third-categories/update/${categoryId}`
      break
    default:
      throw new Error('Invalid level')
  }
  const response = await patchData(categoryData, url, 'application/x-www-form-urlencoded')
  // console.log(response, 'response editCategory')
  return response
}

// export const getCategory = async (categoryId) => {
//   const url = `category/${categoryId}`
//   const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
//   return response
// }

// export const getCategory = async (categoryId) => {
//   const url = `first-categories/${categoryId}`
//   const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
//   return response
// }

export const getCategory = async (categoryId, categoryType) => {
  let url

  switch (categoryType) {
    case 'first':
      url = `first-categories/${categoryId}`
      break
    case 'second':
      url = `second-categories/${categoryId}`
      break
    case 'third':
      url = `third-categories/${categoryId}`
      break
    default:
      throw new Error('Tipo de categoría no válido')
  }

  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

export const deleteCategory = async (id) => {
  const url = `category/delete/${id}`
  const response = await deleteData(id, url, 'application/x-www-form-urlencoded')
  return response
}
