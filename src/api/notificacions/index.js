import { putData } from '@/app/api/fetchData'

export const markAsRead = async (userId, notificationId) => {
  const url = `notification/read/${notificationId}?userId=${userId}`
  const response = await putData('', url, 'application/x-www-form-urlencoded')
  return response
}
