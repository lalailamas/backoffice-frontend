'use client'
import RepositionTable from './repositionTable/page'
import { getRestockProducts } from '@/api/restock'
import { useState, useEffect } from 'react'
import InsideLayout from '@/components/admin/layouts/inside'
import DatePicker from '@/components/admin/common/datepicker/double'
import dayjs from 'dayjs'
import { useUserRole } from '@/hooks/useUserRole'

function Replacements () {
  const [restockData, setRestockData] = useState([])
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(1, 'month'),
    endDate: dayjs()
  })
  const { checkUserRole } = useUserRole()

  useEffect(() => {
    checkUserRole()
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      getRestockProducts(dateRange)
        .then((response) => {
          setRestockData(response.data)
        })
        .catch((error) => {
          console.error('Error fetching restock data:', error)
        })
    }
  },
  [dateRange])

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange)
  }

  return (
    <>

      <InsideLayout />
      <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center p-4 '>Reposiciones históricas</h2>
      <div className='z-50 p-8 w-full'>
        <DatePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          handleDateChange={handleDateChange}
        />
      </div>

      <div className='px-8 mb-11 overflow-auto'>
        <RepositionTable data={restockData} />
      </div>

    </>
  )
}

export default Replacements
