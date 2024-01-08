import { getDataOnly } from '@/utils/fetchData'

export const getAllReiteData = async () => {
  const url = 'reite/product/list'
  const response = await getDataOnly(url, 'multipart/form-data')
  return response.data
}

export const getReiteProdData = async (id) => {
  const url = 'reite/product/' + id
  const response = await getDataOnly(url, 'multipart/form-data')
  return response.data
}

export const getReiteProdByStore = async (storeId) => {
  const url = 'reite/stores/' + storeId + '/products'
  const response = await getDataOnly(url, 'multipart/form-data')
  return response.data
}
