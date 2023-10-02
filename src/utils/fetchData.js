import axios from 'axios'

const urlApi = process.env.NEXT_PUBLIC_DSP_API_BASE
const urlApiReite = process.env.NEXT_PUBLIC_DSP_API_BASE + 'reite/'

export const postData = (credentials, url, contentType) => {
  return axios.post(urlApi + url, credentials, { headers: { 'content-type': contentType } })
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

export const getReiteData = (id, url, contentType) => {
  if (id !== '') {
    return axios.get(urlApiReite + url + `?storeId=${id}`, { headers: { 'content-type': contentType } })
  } else {
    return axios.get(urlApiReite + url, { headers: { 'content-type': contentType } })
  }
}
export const getReiteDataById = (id, url, contentType) => {
  return axios.get(urlApiReite + url + `/${id}`, { headers: { 'content-type': contentType } })
}

export const getDataStock = (url, contentType) => {
  return axios.get(urlApiReite + url, { headers: { 'content-type': contentType } })
}

export const getStockRequestData = (id, url, contentType) => {
  return axios.get(urlApi + url + `${id}`, { headers: { 'content-type': contentType } })
}

export const DspApi = {

  listReplenishmentOrders: (limit, page, search) => {
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

// createUser: (user) => {
//   return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'app-user/signup', user, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },
// loginUser: (credentials) => {
//   return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'app-user/login', credentials, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },
// listProducts: (limit, page, search) => {
//   if (search != '' && search != undefined) {
//     return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/list?limit=${limit}&page=${page}&search=${search}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   } else {
//     return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/list?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   }
// },
// createProduct: (product) => {
//   const data = new FormData()
//   for (const key of Object.keys(product)) {
//     data.append(key, product[key])
//   }
//   return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/create', data, { headers: { 'content-type': 'multipart/form-data' } })
// },
// updateProduct: (product) => {
//   return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/update', product, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },
// updateProductStock: (object) => {
//   return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/stock', object, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },
// findProductByEAN: (ean) => {
//   return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/find?ean=${ean}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },

// getProduct: (id) => {
//   return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/?id=${id}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },
// deleteProduct: (id) => {
//   return axios.delete(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/delete', { data: { id }, headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },
// updateProductImage: (id, file) => {
//   const data = new FormData()

//   data.append('id', id)
//   data.append('image', file)

//   return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/update-image', data, { headers: { 'content-type': 'multipart/form-data' } })
// },
// listWarehouses: (limit, page) => {
//   return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `warehouse/list?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },
// listWarehouseProducts: (warehouse_id) => {
//   return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `warehouse/${warehouse_id}/product/list`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },

// listStores: (limit, page) => {
//   return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `store?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
// },
