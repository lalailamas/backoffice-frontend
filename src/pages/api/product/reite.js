import { getReiteData } from '@/utils/fetchData'
// export const getReiteData = async (id) => {
//   const response = await getReiteDataById(id, 'product', 'multipart/form-data')
//   return response.data
// }

export const getAllReiteData = async () => {
  const response = await getReiteData('', 'product/list', 'multipart/form-data')
  return response.data
}
