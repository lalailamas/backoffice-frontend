import { postDataByStore, getDataForExcel, getDataOnly, postData } from '@/app/api/fetchData'

export const getStores = async (active) => {
  // const response = await getData('ASC', 10, 1, '', '', '', 'store', 'application/x-www-form-urlencoded')
  //   console.log(response)
  let url = 'reite/stores/list'
  if (active) {
    // console.log(active, 'active')
    url = url + `?active=${active}`
  }
  // console.log(url, 'url')
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  if (response.data) return response.data
  return response
}

// get inventory by store
export const getInventoryByStore = async (id) => {
  const url = 'reite/stores/inventory' + `?storeId=${id}`
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  // console.log(response)
  return response
}

export const OpenStore = async (id, snapshot) => {
  const response = await postDataByStore(id, snapshot, 'stock-operation/open', 'multipart/form-data')
  // console.log(response, 'response')
  return response
}
export const getStore = async (id) => {
  const url = 'reite/stores/' + id
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response.data
}

export const downloadInventoryExcel = async (selectedStore) => {
  const url = 'store/download-adjustment?storeId=' + selectedStore
  const response = await getDataForExcel(url)
  return response
}

// export const updateLayout = async (storeId, selectedLayout, prices, layoutId) => {
//   const url = `reite/stores/${storeId}/layouts/${selectedLayout}`
//   const data = { prices, layoutId }
//   const response = await patchData(data, url, 'application/json')
//   return response
// }

export const updateLayout = async (storeId, selectedLayout, prices, layoutId) => {
  const url = `store/${storeId}/layouts/${selectedLayout}`
  const data = { prices, oldLayout: layoutId }
  const response = await postData(data, url, 'application/json')
  return response
}

export const saveLayout = async (storeId, layoutId, selectedLayout, prices) => {
  const url = 'store/' + storeId + '/save-layouts/' + selectedLayout
  const response = await postData({ prices, oldLayout: layoutId }, url, 'application/json')
  return response
}

export const getStoreTransitionLayout = async (storeId, layoutId) => {
  const url = `store/${storeId}/layouts/${layoutId}/transition`
  const response = await getDataOnly(url, 'application/json')
  return response
}
