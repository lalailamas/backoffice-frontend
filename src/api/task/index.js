import { getDataOnly, putData } from '@/app/api/fetchData'

export const listTasks = async (limit, page, search) => {
  const url = 'task' + `?limit=${limit}&page=${page}&search=${search}`
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

export const updateTasks = async (id) => {
  const response = await putData('', `task/${id}`, 'application/x-www-form-urlencoded')
  return response
}
