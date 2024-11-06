import { deleteData, getDataOnly, patchData, postData, putData } from '@/app/api/fetchData'
import dayjs from 'dayjs'

export const getLayout = async (id) => {
  const url = 'reite/layout' + `/${id}`
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response.data
}

export const getAllLayouts = async () => {
  const url = 'reite/layout/list'
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response.data
}

export const createLayout = async (data) => {
  const url = 'reite/layout'
  const response = await postData(data, url, 'application/json')
  return response.data
}

export const editLayout = async (data, id) => {
  const url = 'reite/layout' + `/${id}`
  const response = await putData(data, url, 'application/json')
  return response.data
}

export const deleteLayout = async (id) => {
  const url = 'reite/layout' + `/${id}`
  const response = await deleteData(id, url, 'application/x-www-form-urlencoded')
  return response.data
}

export const getTransitionData = async (storeId, layoutId) => {
  const url = `store/${storeId}/layouts/${layoutId}/transition`
  const response = await getDataOnly(url, 'application/json')
  return response
}

export const getLayoutHistory = async (storeId, startDate, endDate, page, limit) => {
  const contentType = 'application/x-www-form-urlencoded'
  const startDateFormat = dayjs(startDate).format('YYYY-MM-DD')
  const endDateFormat = dayjs(endDate).format('YYYY-MM-DD')
  const url = `layout/record/${storeId}?startTimestamp=${startDateFormat}&endTimestamp=${endDateFormat}&page=${page}&limit=${limit}`
  const response = await getDataOnly(url, contentType)
  return response
}

export const getLayoutHistoryById = async (storeId, layoutId) => {
  const contentType = 'application/x-www-form-urlencoded'
  const url = `layout/record/${storeId}/${layoutId}`
  const response = await getDataOnly(url, contentType)
  return response
}

export const updateLayoutHistory = async (data, storeId, layoutId) => {
  const contentType = 'application/json'
  const url = `layout/record/${storeId}/${layoutId}`
  const response = await patchData(data, url, contentType)
  return response
}

export const compareLayouts = async (oldLayoutId, actualLayoutId) => {
  const url = `layout/compare?oldLayoutId=${oldLayoutId}&actualLayoutId=${actualLayoutId}`
  const contentType = 'application/json'
  const response = await getDataOnly(url, contentType)
  return response
}
