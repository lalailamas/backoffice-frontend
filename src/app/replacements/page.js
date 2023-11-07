'use client'
import RepositionTable from './repositionTable/page'
import { getStockOperation } from '@/api/restock'
import { useState, useEffect } from 'react'
import InsideLayout from '@/components/admin/layouts/inside'
import DatePicker from '@/components/admin/common/datepicker/double'
import dayjs from 'dayjs'

function Replacements () {
  const [restockData, setRestockData] = useState([])
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(1, 'month'),
    endDate: dayjs()
  })

  useEffect(() => {
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      getStockOperation(dateRange)
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
      <div className='absolute w-full px-10 mt-4'>
        <DatePicker
          startDate={dateRange.startDate}
          endDate={dateRange.endDate}
          handleDateChange={handleDateChange}
        />
      </div>
      {/* <div><pre>{JSON.stringify(restockData, null, 2)}</pre></div> */}

      <div className='overflow-x-auto p-10 mt-8'>
        <RepositionTable data={restockData} />
      </div>

    </>
  )
}

export default Replacements
