import { getReiteDataById } from '@/utils/fetchData'
export const getReiteData = async (id) => {
  const response = await getReiteDataById(id, 'product', 'multipart/form-data')
  return response.data
}
