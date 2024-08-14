import axios from 'axios'
import { getSession } from 'next-auth/react'

const baseUrl = process.env.NEXT_PUBLIC_DSP_API_BASE

/**
 * Makes an authenticated request with JWT token from the user's session.
 *
 * @param {string} method - HTTP method (e.g., 'get', 'post').
 * @param {string} url - The endpoint URL.
 * @param {object} [data=null] - Request payload.
 * @param {string} contentType - The content type of the request.
 * @returns {Promise<object>} - The response data.
 * @throws {Error} - If no session is found or the request fails.
 */
const authenticatedRequest = async (method, url, data = null, contentType) => {
  const session = await getSession()
  const token = session?.user.accessToken
  if (!session) throw new Error('No session found')

  const headers = {
    'content-type': contentType,
    Authorization: `Bearer ${token}`
  }

  return await makeRequest(method, url, data, headers)
}

/**
 * Makes an authenticated request and expects a blob response.
 *
 * @param {string} method - HTTP method (e.g., 'get', 'post').
 * @param {string} url - The endpoint URL.
 * @param {object} [data=null] - Request payload.
 * @param {string} contentType - The content type of the request.
 * @returns {Promise<object>} - The response.
 * @throws {Error} - If no session is found or the request fails.
 */
const authenticatedRequestWithBlob = async (method, url, data = null, contentType = 'application/pdf') => {
  const session = await getSession()
  const token = session?.user?.accessToken
  if (!session) throw new Error('No session found')

  const headers = {
    'Content-Type': contentType,
    Authorization: `Bearer ${token}`
  }

  const config = {
    method,
    url: baseUrl + url,
    headers,
    data,
    responseType: 'blob'
  }

  try {
    const response = await axios(config)
    return response
  } catch (error) {
    console.error('Error in authenticatedRequestWithBlob:', error.response)
    throw error
  }
}

/**
 * Makes a simple HTTP request without authentication.
 *
 * @param {string} method - HTTP method (e.g., 'get', 'post').
 * @param {string} url - The endpoint URL.
 * @param {object} [data=null] - Request payload.
 * @param {string} contentType - The content type of the request.
 * @returns {Promise<object>} - The response data.
 */
const simpleRequest = async (method, url, data = null, contentType) => {
  const headers = {
    'content-type': contentType
  }

  return await makeRequest(method, url, data, headers)
}

/**
 * Make an API request with the provided configuration.
 * @param {string} method - HTTP method (e.g., 'get', 'post').
 * @param {string} url - API endpoint.
 * @param {object} data - Request payload.
 * @param {object} headers - Request headers.
 * @returns {Promise<object>} - API response.
 */

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
    console.error(error.response)
    throw error
  }
}

// Exported API functions
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
    responseType: 'blob'
  }
  return authenticatedRequestWithBlob('get', relativeUrl, null, contentType, options)
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
