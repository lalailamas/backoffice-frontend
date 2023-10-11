import { getReiteData, getReiteDataById, postReiteDataByStore } from '@/utils/fetchData'

export const getAllReiteData = async () => {
  const response = await getReiteData('', 'product/list', 'multipart/form-data')
  return response.data
}

export const getReiteProdData = async (id) => {
  const response = await getReiteDataById(id, 'product', 'multipart/form-data')
  return response.data
}

export const getReiteProdByStore = async (storeId) => {
  const response = await postReiteDataByStore(storeId, 'stores/', '/open', 'multipart/form-data')
  return response.data
}
