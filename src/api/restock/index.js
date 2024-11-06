import { getDataOnly, postData, putData } from '@/app/api/fetchData'
import dayjs from 'dayjs'

export const getRestockProducts = async ({ startDate, endDate }) => {
  const contentType = 'application/x-www-form-urlencoded'
  const startDateFormat = dayjs(startDate).format('YYYY-MM-DD')
  const endDateFormat = dayjs(endDate).format('YYYY-MM-DD')
  const url = 'reite/restock-products?startTimestamp=' + startDateFormat + '&endTimestamp=' + endDateFormat
  const response = await getDataOnly(url, contentType)
  return response
}

export const postRestockInventory = async (storeId, transactionId, stockData) => {
  const contentType = 'application/json'
  const url = `stock-operation/${storeId}/${transactionId}/inventory`
  const response = await postData(stockData, url, contentType)
  return response
}
export const putRestockInventory = async (storeId, stockData) => {
  const contentType = 'application/json'
  const url = `stores/${storeId}/inventory`
  const response = await postData(stockData, url, contentType)
  return response
}
export const putRestockResult = async (externaltransactionId, stockData) => {
  const contentType = 'application/json'
  const url = `stock-operation/${externaltransactionId}/results`
  const response = await putData(stockData, url, contentType)
  return response
}

// localhost:3500/api/stock-operation?limit=100000&startTimestamp=2023-08-30&endTimestamp=2023-11-06

export const getStockOperation = async ({ startDate, endDate }) => {
  const contentType = 'application/x-www-form-urlencoded'
  const startDateFormat = dayjs(startDate).format('YYYY-MM-DD')
  const endDateFormat = dayjs(endDate).format('YYYY-MM-DD')
  const limit = 1000
  const url = 'stock-operation?limit=' + limit + '&startTimestamp=' + startDateFormat + '&endTimestamp=' + endDateFormat
  const response = await getDataOnly(url, contentType)
  return response
}

export const getStockOperationById = async (id, externalTransactionId) => {
  const contentType = 'application/x-www-form-urlencoded'
  const query = externalTransactionId ? `?external_transactionId=${externalTransactionId}` : ''
  const response = await getDataOnly(`stock-operation/${id}` + query, contentType)
  return response
}

export const closeStore = async (storeId, transactionId, snapshot) => {
  const contentType = 'multipart/form-data'
  const url = `stock-operation/update/${transactionId}`
  const response = await postData(snapshot, url, contentType)
  return response
}
