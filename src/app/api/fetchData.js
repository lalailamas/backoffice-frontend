import axios from 'axios'
import { getSession } from 'next-auth/react'

const baseUrl = process.env.NEXT_PUBLIC_DSP_API_BASE

const authenticatedRequest = async (method, url, data = null, contentType) => {
  const session = await getSession() // Obtener sesión en el lado del cliente
  const token = session?.user.accessToken // Asumir que el accessToken está almacenado en la sesión
  if (!session) throw new Error('No session found')

  const headers = {
    'content-type': contentType,
    Authorization: `Bearer ${token}`
  }

  return await makeRequest(method, url, data, headers)
}

const simpleRequest = async (method, url, data = null, contentType) => {
  const headers = {
    'content-type': contentType
  }

  return await makeRequest(method, url, data, headers)
}
const makeRequest = async (method, url, data, headers) => {
  const config = {
    method,
    url: baseUrl + url,
    headers,
    data
  }

  try {
    const response = await axios(config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Ejemplos de uso
export const postLoginData = (data, url, contentType) => simpleRequest('post', url, data, contentType)
export const postData = (data, url, contentType) => authenticatedRequest('post', url, data, contentType)
export const putData = (data, url, contentType) => authenticatedRequest('put', url, data, contentType)
export const patchData = (data, url, contentType) => authenticatedRequest('patch', url, data, contentType)
export const deleteData = (id, url, contentType) => authenticatedRequest('delete', url, { id }, contentType)
export const getDataOnly = (url, contentType) => authenticatedRequest('get', url, null, contentType)
export const deleteDataUsers = (id, email, url, contentType) => authenticatedRequest('delete', url, { id, email }, contentType)

const createFormData = async ({ snapshot, comment, storeId }, contentType, method, url, useAuth = true) => {
  const formData = new FormData()

  if (comment) {
    formData.append('comments', comment)
  }

  if (storeId) {
    formData.append('userClientId', '9kzL7vO1m8Ug35cAmD29JbvHkWH2')
    formData.append('openStoreType', 'RESTOCK')
    formData.append('store_id', storeId)
  }

  if (snapshot !== null) {
    const snapshotBlob = base64toBlob(snapshot, 'image/png')
    const fileName = `image_${Date.now()}.png`
    formData.append('image', snapshotBlob, fileName)
  }

  const requestFunction = useAuth ? authenticatedRequest : simpleRequest
  return await requestFunction(method, url, formData, contentType)
}
function base64toBlob (base64, type) {
  const binary = atob(base64)
  const array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type })
}

// Uso de la función
export const putImageData = async (snapshot, url, contentType) => {
  try {
    const response = await createFormData({ snapshot }, contentType, 'put', url, true)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const putImageUpdate = async (snapshot, url, contentType, comment) => {
  try {
    const response = await createFormData({ snapshot, comment }, contentType, 'put', url, true)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postDataByStore = async (storeId, snapshot, url, contentType) => {
  try {
    const response = await createFormData({ snapshot, storeId }, contentType, 'post', url, true)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getDataForExcel = (relativeUrl) => {
  return authenticatedRequest('get', relativeUrl, null, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
}

export const getDataForPDF = (relativeUrl, contentType) => {
  const options = {
    responseType: 'blob' // Necesario para manejar la respuesta como un archivo binario
  }
  return authenticatedRequest('get', relativeUrl, null, contentType, options)
  // const fullUrl = baseUrl + relativeUrl
  // return axios.get(fullUrl, { responseType: 'blob' })
}

export const postProduct = async (product, image, url, contentType) => {
  const data = new FormData()
  for (const key of Object.keys(product)) {
    data.append(key, product[key])
  }
  if (image) {
    const fileName = `image_${product.ean}.png`
    data.append('primary_image', image, fileName)
  }
  return authenticatedRequest('post', url, data, contentType)
}
