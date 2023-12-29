'use client'
// import RepositionTable from './repositionTable/page'
import { getStockOperation } from '@/api/restock'
import { useState, useEffect, useRef, Suspense } from 'react'
import DatePicker from '@/components/admin/common/datepicker/double'
import dayjs from 'dayjs'
import useGetStores2 from '@/hooks/useStores2'
// import DspLoader from '@/components/admin/common/loader'
import { swallInfo } from '@/utils/sweetAlerts'
import RepositionTableLoader from '../loading'
import dynamic from 'next/dynamic'

const DynamicRepositionTable = dynamic(() => import('./repositionTable/page'), {
  loading: () => <RepositionTableLoader />, // Componente de carga mientras se carga RepositionTable
  ssr: false // Indica que este componente no debe ser renderizado en el servidor
})

function Replacements () {
  const [restockData, setRestockData] = useState([])
  const { stores } = useGetStores2()
  const [isData, setIsData] = useState(true)
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(1, 'week').startOf('week'),
    endDate: dayjs().subtract(1, 'week').endOf('week')
  })
  const isInitialRender = useRef(true)

  useEffect(() => {
    // Skip the initial render
    if (isInitialRender.current) {
      isInitialRender.current = false
      return
    }

    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      getStockOperation(dateRange)
        .then((response) => {
          console.log(response.data)
          if (response.data.length === 0) {
            swallInfo('No hay datos para el rango de fechas seleccionado')
            setIsData(false)
          }
          setRestockData(response.data)
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
    <>

      <div className='h-screen'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center p-4 '>Reposiciones históricas</h2>
        <div className='w-full px-10 mt-2'>
          <DatePicker
            startDate={dateRange.startDate}
            endDate={dateRange.endDate}
            handleDateChange={handleDateChange}
          />
        </div>
        {/* <div><pre>{JSON.stringify(restockData, null, 2)}</pre></div> */}
        {/* {restockData.length > 0 || !isData
          ? ( */}

        <div className='overflow-x-auto p-10 '>
          <Suspense fallback={RepositionTableLoader}>
            <DynamicRepositionTable data={restockData} stores={stores} />
          </Suspense>
        </div>
        {/* )
          : (
            <DspLoader />
            )} */}
      </div>

    </>
  )
}

export default Replacements
