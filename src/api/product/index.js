import { putData, deleteData, getDataOnly, postProduct, getDataForPDF, patchData } from '@/app/api/fetchData'
// createProduct: (product) => {
//     const data = new FormData()
//     for (const key of Object.keys(product)) {
//       data.append(key, product[key])
//     }
//     return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/create', data, { headers: { 'content-type': 'multipart/form-data' } })
//   },
export const createProduct = async (product, image) => {
  const response = await postProduct(product, image, 'product/create', 'multipart/form-data') // credentials, url, contentType
  return response
}

export const listProducts = async (limit, page, search) => {
  let url = 'product/list' + `?limit=${limit}&page=${page}`
  if (search.length > 0) {
    url += `&search=${search}`
  }
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

export const findProductByEAN = async (ean) => {
  const url = 'product/find' + `?ean=${ean}`
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

export const getProduct = async (id) => {
  const url = 'product/' + `?id=${id}`
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

export const updateProduct = async (product) => {
  const response = await patchData(product, 'product/update', 'application/x-www-form-urlencoded')
  return response
}

export const updateProductStock = async (object) => {
  const response = await putData(object, 'product/stock', 'application/x-www-form-urlencoded')
  return response
}
export const updateProductImage = async (id, file) => {
  const data = new FormData()

  data.append('id', id)
  data.append('image', file)

  const response = await putData(data, 'product/update-image', 'multipart/form-data')
  return response
}
export const deleteProduct = async (id) => {
  const response = await deleteData(id, 'product/delete', 'application/x-www-form-urlencoded')
  return response
}

export const downloadTrapsPDF = async (id, style) => {
  const url = `product/${id}/generate-pdf?style=${style}`
  const response = await getDataForPDF(url)
  return response
}
