import { getDataOnly, patchData } from '@/app/api/fetchData'

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

export const patchReitePrices = async (data, productId) => {
  const url = `reite/product/${productId}`
  const response = await patchData(data, url, 'application/x-www-form-urlencoded')
  return response.data
}

export const findReiteProductByEAN = async (ean) => {
  const url = `reite/product/list?eans=${ean}`
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response.data
}
