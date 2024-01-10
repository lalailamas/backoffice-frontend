/* eslint-disable camelcase */
import axios from 'axios'

const urlApi = process.env.NEXT_PUBLIC_DSP_API_BASE
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
