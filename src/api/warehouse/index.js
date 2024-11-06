import { getDataOnly } from '@/app/api/fetchData'

export const listWarehouses = async (limit, page) => {
  const url = 'warehouse/list' + `?limit=${limit}&page=${page}`
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}
