import axios from 'axios'
//   createUser: (user) => {
//     return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'app-user/signup', user, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   },
//   loginUser: (credentials) => {
//     return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'app-user/login', credentials, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   }

//     return axios.post(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/create', data, { headers: { 'content-type': 'multipart/form-data' } })
const urlApi = process.env.NEXT_PUBLIC_DSP_API_BASE
export const postData = (credentials, url, contentType) => {
  return axios.post(urlApi + url, credentials, { headers: { 'content-type': contentType } })
}
// listProducts: (limit, page, search) => {
//     if (search !== '') {
//       return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/list?limit=${limit}&page=${page}&search=${search}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//     } else {
//       return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/list?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//     }
//   },
// findProductByEAN: (ean) => {
//     return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/find?ean=${ean}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   },
// getProduct: (id) => {
//     return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `product/?id=${id}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   },
// listWarehouses: (limit, page) => {
//     return axios.get(process.env.NEXT_PUBLIC_DSP_API_BASE + `warehouse/list?limit=${limit}&page=${page}`, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   }
export const getData = (limit, page, search, ean, id, url, contentType) => {
  if (search !== '') {
    return axios.get(urlApi + url + `?limit=${limit}&page=${page}&search=${search}`, { headers: { 'content-type': contentType } })
  } else if (ean !== '') {
    return axios.get(urlApi + url + `?ean=${ean}`, { headers: { 'content-type': contentType } })
  } else if (id !== '') {
    return axios.get(urlApi + url + `?id=${id}`, { headers: { 'content-type': contentType } })
  } else {
    return axios.get(urlApi + url + `?limit=${limit}&page=${page}`, { headers: { 'content-type': contentType } })
  }
}
// updateProductImage: (id, file) => {
//     const data = new FormData()

//     data.append('id', id)
//     data.append('image', file)

//     return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/update-image', data, { headers: { 'content-type': 'multipart/form-data' } })
//   }
// updateProduct: (product) => {
//     return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/update', product, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   },

// updateProductStock: (object) => {
//     return axios.put(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/stock', object, { headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   },

export const putData = (data, url, contentType) => {
  return axios.put(urlApi + url, data, { headers: { 'content-type': contentType } })
}

// deleteProduct: (id) => {
//     return axios.delete(process.env.NEXT_PUBLIC_DSP_API_BASE + 'product/delete', { data: { id }, headers: { 'content-type': 'application/x-www-form-urlencoded' } })
//   }
export const deleteData = (id, url, contentType) => {
  return axios.delete(urlApi + url, { data: { id }, headers: { 'content-type': contentType } })
}
