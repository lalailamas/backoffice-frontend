import { getReiteData, getReiteDataById, getReiteProductsByStore } from '@/utils/fetchData'

export const getAllReiteData = async () => {
  const response = await getReiteData('', 'product/list', 'multipart/form-data')
  return response.data
}

export const getReiteProdData = async (id) => {
  const response = await getReiteDataById(id, 'product', 'multipart/form-data')
  return response.data
}

export const getReiteProdByStore = async (storeId) => {
  const response = await getReiteProductsByStore(storeId, 'stores/', 'multipart/form-data')
  return response.data
}
