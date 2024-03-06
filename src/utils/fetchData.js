import axios from 'axios'

const baseUrl = process.env.NEXT_PUBLIC_DSP_API_BASE

// Luego, utiliza apiConfig.baseUrl y apiConfig.reiteUrl en lugar de repetir las URL en cada función.
const sendData = async (method, url, data, contentType, options = {}) => {
  try {
    const config = {
      method,
      url: baseUrl + url,
      headers: { 'content-type': contentType },
      ...options
    }

    if (data !== null) {
      config.data = data
    }

    const response = await axios(config)
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}

// Ejemplos de uso
export const postData = (data, url, contentType) => sendData('post', url, data, contentType)
export const putData = (data, url, contentType) => sendData('put', url, data, contentType)
export const patchData = (data, url, contentType) => sendData('patch', url, data, contentType)
export const deleteData = (id, url, contentType) => sendData('delete', url, { id }, contentType)
export const getDataOnly = (url, contentType) => sendData('get', url, null, contentType)
export const deleteDataUsers = (id, email, url, contentType) => sendData('delete', url, { id, email }, contentType)

const createFormData = async ({ snapshot, comment, storeId }, contentType, method, url) => {
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

  try {
    const response = await axios({
      method,
      url: baseUrl + url,
      data: formData,
      headers: {
        'content-type': contentType
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
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
    const response = await createFormData({ snapshot }, contentType, 'put', url)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const putImageUpdate = async (snapshot, url, contentType, comment) => {
  try {
    const response = await createFormData({ snapshot, comment }, contentType, 'put', url)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const postDataByStore = async (storeId, snapshot, url, contentType) => {
  try {
    const response = await createFormData({ snapshot, storeId }, contentType, 'post', url)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export const getDataForExcel = (relativeUrl) => {
  const fullUrl = baseUrl + relativeUrl
  return axios.get(fullUrl)
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
  try {
    const response = await axios({
      method: 'post',
      url: baseUrl + url,
      data,
      headers: {
        'content-type': contentType
      }
    })

    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
