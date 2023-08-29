import { getReiteDataById } from '../../../lib/reite'
export const getReiteData = async (id) => {
  const response = await getReiteDataById(id, 'product', { headers: { 'content-type': contentType } })
  return response.data
}
