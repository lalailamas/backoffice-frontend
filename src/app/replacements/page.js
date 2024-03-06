'use client'
import RepositionTable from './repositionTable/page'
import { getStockOperation } from '@/api/restock'
import { useState, useEffect } from 'react'
import DatePicker from '@/components/admin/common/datepicker/double'
import dayjs from 'dayjs'
import useGetStores2 from '@/hooks/useStores2'
import { swallInfo } from '@/utils/sweetAlerts'
import MainTitle from '@/components/admin/common/titles/MainTitle'

function Replacements () {
  const [restockData, setRestockData] = useState([])
  const { stores } = useGetStores2()
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(1, 'week').startOf('week'),
    endDate: dayjs().subtract(1, 'week').endOf('week')
  })

  useEffect(() => {
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      getStockOperation(dateRange)
        .then((response) => {
          console.log(response)
          if (response.length === 0) {
            swallInfo('No hay datos para el rango de fechas seleccionado')
            // setIsData(false)
          }
          setRestockData(response)
        })
        .catch((error) => {
          console.error('Error fetching restock data:', error)
        })
    }
  },
  [dateRange])

  const handleDateChange = (newDateRange) => {
    setRestockData([]) // Reset data
    setDateRange(newDateRange)
  }

  return (

    <div>
      <MainTitle>Reposiciones históricas</MainTitle>
      <div className='w-full px-10 mt-2'>
        <DatePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          handleDateChange={handleDateChange}
        />
      </div>

      <RepositionTable data={restockData} stores={stores} />
    </div>

  )
}

export default Replacements
