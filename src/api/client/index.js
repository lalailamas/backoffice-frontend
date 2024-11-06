import { getDataForExcel, getDataOnly } from '@/app/api/fetchData'

import dayjs from 'dayjs'

export const getListClients = async ({ startDate, endDate }, searchTerm) => {
  const startDateFormat = dayjs(startDate).format('YYYY-MM-DD')
  const endDateFormat = dayjs(endDate).format('YYYY-MM-DD')
  const search = searchTerm || ''
  const url = 'reite/clients/list' + `?startTimestamp=${startDateFormat}` + `&endTimestamp=${endDateFormat}` + `&searchTerm=${search}`

  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

export const getDetailsClient = async (id) => {
  const url = 'reite/clients/' + id
  const response = await getDataOnly(url, 'application/x-www-form-urlencoded')
  return response
}

export const downloadClientsExcel = async (dateRange, searchTerm) => {
  const startDateFormat = dayjs(dateRange.startDate).format('YYYY-MM-DD')
  const endDateFormat = dayjs(dateRange.endDate).format('YYYY-MM-DD')
  const url = `reite/clients/list/download?startTimestamp=${startDateFormat}&endTimestamp=${endDateFormat}&searchTerm=${searchTerm}`
  const response = await getDataForExcel(url)
  return response
}
