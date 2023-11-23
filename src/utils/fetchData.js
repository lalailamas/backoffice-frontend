/* eslint-disable camelcase */
import axios from 'axios'

const urlApi = process.env.NEXT_PUBLIC_DSP_API_BASE
const urlApiReite = process.env.NEXT_PUBLIC_DSP_API_BASE + 'reite/'

export const postData = (credentials, url, contentType) => {
  return axios.post(urlApi + url, credentials, { headers: { 'content-type': contentType } })
}
export const putImageData = async (snapshot, url, contentType) => {
  const formData = new FormData()
  const snapshotBlob = base64toBlob(snapshot, 'image/png')
  const fileName = `image_${Date.now()}.png`
  formData.append('image', snapshotBlob, fileName)
  try {
    const response = await axios.put(urlApi + url, formData, {
      headers: {
        'content-type': contentType
      }
    })

    console.log(response.data, 'response de postDataByStore')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const putImageUpdate = async (snapshot, url, contentType, comment) => {
  const formData = new FormData()
  formData.append('comments', comment)
  if (snapshot !== null) {
    const snapshotBlob = base64toBlob(snapshot, 'image/png')
    const fileName = `image_${Date.now()}.png`
    formData.append('image', snapshotBlob, fileName)
  }
  try {
    const response = await axios.put(urlApi + url, formData, {
      headers: {
        'content-type': contentType
      }
    })

    console.log(response.data, 'response de putImageUpdate')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const postDataByStore = async (storeId, snapshot, url, contentType) => {
  const formData = new FormData()

  // Adjunta los datos adicionales al objeto FormData
  formData.append('userClientId', '9kzL7vO1m8Ug35cAmD29JbvHkWH2')
  formData.append('openStoreType', 'RESTOCK')
  formData.append('store_id', storeId)
  if (snapshot !== null) {
    const snapshotBlob = base64toBlob(snapshot, 'image/png')
    const fileName = `image_${Date.now()}.png`
    formData.append('image', snapshotBlob, fileName)
  }
  try {
    const response = await axios.post(urlApi + url, formData, {
      headers: {
        'content-type': contentType
      }
    })
    console.log(response.data, 'response de postDataByStore')
    return response.data
  } catch (error) {
    console.error(error)
    throw error
  }
}
export const getDataByQuery = (url, contentType, query) => {
  return axios.get(urlApi + url + query, { headers: { 'content-type': contentType } })
}

export const getData = (order, limit, page, search, ean, id, url, contentType) => {
  if (search !== '') {
    return axios.get(urlApi + url + `?limit=${limit}&page=${page}&search=${search}`, { headers: { 'content-type': contentType } })
  } else if (ean !== '') {
    return axios.get(urlApi + url + `?ean=${ean}`, { headers: { 'content-type': contentType } })
  } else if (id !== '') {
    return axios.get(urlApi + url + `?id=${id}`, { headers: { 'content-type': contentType } })
  } else if (order !== '') {
    return axios.get(urlApi + url + `?page=${page}&limit=${limit}`, { headers: { 'content-type': contentType } })
  } else {
    return axios.get(urlApi + url + `?limit=${limit}&page=${page}`, { headers: { 'content-type': contentType } })
  }
}
export const getStockRequestData = (id, url, contentType) => {
  return axios.get(urlApi + url + `${id}`, { headers: { 'content-type': contentType } })
}

export const getLimitTimeStampData = (url, contentType, limit, startDate, endDate) => {
  return axios.get(urlApi + url + '?' + `limit=${limit}` + `&startTimestamp=${startDate}` + `&endTimestamp=${endDate}`, { headers: { 'content-type': contentType } })
}
export const getTimeStampData = (url, contentType, startDate, endDate) => {
  return axios.get(urlApiReite + url + `?startTimestamp=${startDate}` + `&endTimestamp=${endDate}`, { headers: { 'content-type': contentType } })
}
// api/reite/restock?startTimestamp=2022-03-30&endTimestamp=2023-08-30
export const putData = (data, url, contentType) => {
  if (data !== '') {
    return axios.put(urlApi + url, data, { headers: { 'content-type': contentType } })
  } else {
    return axios.put(urlApi + url, { headers: { 'content-type': contentType } })
  }
}

export const deleteData = (id, url, contentType) => {
  return axios.delete(urlApi + url, { data: { id }, headers: { 'content-type': contentType } })
}

export const getReiteData = (id, url, contentType, active) => {
  if (id !== '') {
    return axios.get(urlApiReite + url + `?storeId=${id}`, { headers: { 'content-type': contentType } })
  } else {
    if (active !== '') {
      return axios.get(urlApiReite + url + '?active=true', { headers: { 'content-type': contentType } })
    } else {
      return axios.get(urlApiReite + url, { headers: { 'content-type': contentType } })
    }
  }
}
export const getReiteDataById = (id, url, contentType) => {
  return axios.get(urlApiReite + url + `/${id}`, { headers: { 'content-type': contentType } })
}

export const getDataStock = (url, contentType) => {
  return axios.get(urlApiReite + url, { headers: { 'content-type': contentType } })
}

export const DspApi = {

  listReplenishmentOrders: (limit, page, search) => {
    console.log('entré')
    if (search !== '') {
      return axios.get(urlApi + `replenishment-order/?limit=${limit}&page=${page}&search=${search}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
    } else {
      return axios.get(urlApi + `replenishment-order/?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
    }
  },
  createReplenishmentOrder: (ro) => {
    return axios.post(urlApi + 'replenishment-order/create', ro)
  },

  updateReplenishmentOrder: (data) => {
    return axios.put(urlApi + `replenishment-order/${data.id}`, data)
  },

  createPickingOperation: (ro_id, po) => {
    // var data = new FormData();
    // for (var key of Object.keys(po)) {
    //   data.append(key, po[key]);
    // }
    return axios.post(urlApi + `replenishment-order/${ro_id}/picking-operation`, po)
  },

  deletePickingOperation: (po) => {
    return axios.delete(urlApi + `replenishment-order/${po.replenishment_order_id}/picking-operation/${po.id}`)
  },
  updatePickingOperation: (ro_id, po_id, data) => {
    return axios.put(urlApi + `replenishment-order/${ro_id}/picking-operation/${po_id}`, data)
  },
  getReplenishmentOrder: (ro_id) => {
    return axios.get(urlApi + `replenishment-order/${ro_id}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
  },
  deleteReplenishmentOrder: (ro_id) => {
    return axios.delete(urlApi + `replenishment-order/${ro_id}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
  }

}

export const getReiteDataByStore = async (storeId, url, url2, contentType) => {
  return axios.get(urlApiReite + url + storeId + url2, { headers: { 'content-type': contentType } })
}
export const postReiteDataByStore = async (storeId, url, contentType) => {
  return axios.post(urlApiReite + url, { userClientId: '9kzL7vO1m8Ug35cAmD29JbvHkWH2', openStoreType: 'RESTOCK', store_id: storeId },
    { headers: { 'content-type': contentType } })
}

export const putReiteInventoryData = async (url, stockData, contentType) => {
  return axios.put(urlApiReite + url, stockData, { headers: { 'content-type': contentType } })
}
export const patchReiteInventoryData = async (transactionId, url, url2, stockData, contentType) => {
  return axios.patch(urlApiReite + url + transactionId + url2, stockData, { headers: { 'content-type': contentType } })
}

function base64toBlob (base64, type) {
  const binary = atob(base64)
  const array = []
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i))
  }
  return new Blob([new Uint8Array(array)], { type })
}
