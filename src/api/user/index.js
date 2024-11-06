import { postData, getDataForExcel, deleteDataUsers, getDataOnly, putData, postLoginData } from '@/app/api/fetchData'

export const createUser = async (user) => {
  const response = await postData(user, 'app-user/signup', 'application/x-www-form-urlencoded')
  return response
}

export const editUser = async (user) => {
  const url = 'app-user/update'
  const response = await putData(user, url, 'application/x-www-form-urlencoded')
  return response
}

export const deleteUser = async (id, email) => {
  const response = await deleteDataUsers(id, email, 'app-user/delete', 'application/x-www-form-urlencoded')
  return response
}

export const loginUser = async (credentials) => {
  const response = await postLoginData(credentials, 'app-user/login', 'application/x-www-form-urlencoded')
  return response
}

export const listUsers = async () => {
  const url = 'app-user'
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

export const downloadExcel = async () => {
  const response = await getDataForExcel('app-user/download/excel')
  return response
}

export const getUserById = async (userId) => {
  const response = await getDataOnly(`app-user/${userId}`, 'application/x-www-form-urlencoded')
  return response
}
