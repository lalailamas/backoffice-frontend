import { putImageUpdate, getDataForExcel, getDataOnly, putData } from '@/app/api/fetchData'

export const getStockRequest = async (id) => {
  const contentType = 'application/x-www-form-urlencoded'
  const url = `stock/store/${id}`
  const response = await getDataOnly(url, contentType)
  return response
}

export const putStockImageUpdate = async (transactionId, snapshot, comment) => {
  const contentType = 'multipart/form-data'
  const url = `stock-operation/update/${transactionId}`
  return await putImageUpdate(snapshot, url, contentType, comment)
}
export const putStockInventory = async (storeId, stockData) => {
  const contentType = 'application/json'
  const url = `reite/stores/${storeId}/inventory`
  return await putData(stockData, url, contentType)
}

export const downloadShopList = async (ids) => {
  if (!Array.isArray(ids)) {
    console.error('ids debe ser un array')
    return // o lanza una excepción, según tus necesidades
  }

  const url = 'stock/stores/shopping-list/download'

  const finalUrl = `${url}?id=${ids.join('%26')}`

  const response = await getDataForExcel(finalUrl)

  return response
}

export const downloadStoresStock = async (ids) => {
  if (!Array.isArray(ids)) {
    console.error('ids debe ser un array')
    return // o lanza una excepción, según tus necesidades
  }
  const url = 'stock/stores/download'
  const finalUrl = `${url}?id=${ids.join('%26')}`
  const response = await getDataForExcel(finalUrl)
  return response
}

export const getShopList = async (ids) => {
  if (!Array.isArray(ids)) {
    console.error('ids debe ser un array')
    return // o lanza una excepción, según tus necesidades
  }
  const contentType = 'application/x-www-form-urlencoded'

  const url = 'stock/stores/shopping-list'

  const finalUrl = `${url}?id=${ids.join('%26')}`

  const response = await getDataOnly(finalUrl, contentType)

  return response
}

export const getRepositionByStore = async (ids) => {
  if (!Array.isArray(ids)) {
    console.error('ids debe ser un array')
    return // o lanza una excepción, según tus necesidades
  }
  const contentType = 'application/x-www-form-urlencoded'
  const url = 'stock/stores'
  const finalUrl = `${url}?id=${ids.join('%26')}`
  const response = await getDataOnly(finalUrl, contentType)
  return response
}
