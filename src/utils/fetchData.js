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
  return axios.put(urlApi + url, data, { headers: { 'content-type': contentType } })
}

export const deleteData = (id, url, contentType) => {
  return axios.delete(urlApi + url, { data: { id }, headers: { 'content-type': contentType } })
}

export const getReiteData = (id, url, contentType) => {
  if (id !== '') {
    return axios.get(urlApiReite + url + `?storeId=${id}`, { headers: { 'content-type': contentType } })
  } else {
    return axios.get(urlApiReite + url + '?storeId=CNV_003', { headers: { 'content-type': contentType } })
  }
}
export const getReiteDataById = (id, url, contentType) => {
  return axios.get(urlApiReite + url + `/${id}`, { headers: { 'content-type': contentType } })
}
