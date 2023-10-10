/* eslint-disable camelcase */
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

export const getReiteDataByStore = async (storeId) => {
  return axios.get('https://business-integration-api-dev-sgoh5wvv3a-uc.a.run.app/stores/' + storeId + '/products', { headers: { 'content-type': 'application/json', Authorization: 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjlhNTE5MDc0NmU5M2JhZTI0OWIyYWE3YzJhYTRlMzA2M2UzNDFlYzciLCJ0eXAiOiJKV1QifQ.eyJyb2xlIjoiUkVBREVSIiwiY2xpZW50SWQiOiJXRTg2MlQ1Q0J4Vmt1enlJOUduVCIsInN0b3Jlc0lkcyI6WyJDTlZfMDAxIiwiQ05WXzAwMiIsIkNOVl8wMDMiLCJDTlZfMDA0IiwiQ05WXzAwNSJdLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc21hcnQtc3RvcmVzLWRldiIsImF1ZCI6InNtYXJ0LXN0b3Jlcy1kZXYiLCJhdXRoX3RpbWUiOjE2OTY1OTc4NjEsInVzZXJfaWQiOiJKaElCWVRrMGU1aFBHVFlYMjdpQUVTY2xGbjIzIiwic3ViIjoiSmhJQllUazBlNWhQR1RZWDI3aUFFU2NsRm4yMyIsImlhdCI6MTY5NjU5Nzg2MSwiZXhwIjoxNjk2NjAxNDYxLCJlbWFpbCI6InNlcnZpY2VzQGRlc3Buc2EyNDcuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2VydmljZXNAZGVzcG5zYTI0Ny5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.xxSr6oKWtaCjyq-1V35ASN-nnShdsE_SbZL0q090hhhOVkzrlCaamoXmF0s7HjCk70R07p6sn300Za-64q5JrYBlK47D33D8D1nWQgYVGGv7pXlK9MSU976DUoSMtthFJpYZE5L-9BODpGiH5hd2Eq2OXk-4dnZLya_THPy1ABrjsxqT6Osuu-7c8KKkDLIrgfY2ZJGxJfa42RpQd7sE34ykqPVe91Pf4J-a1HlWU0JlriYX2EkgqssXnx3VFI-DaFoGO9gyHlqHS8zuAGPDgdtCxy_eIgxf-cXGu2enB3MKSAo67uZi2MEcFlHXgJdGSl5rdNp6fXGV3Lnm5t5OHQ' } })
}
