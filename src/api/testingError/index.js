import { getDataOnly } from '@/app/api/fetchData'

export const testingError = async (error) => {
  const url = 'testing/error/' + error
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}
