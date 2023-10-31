'use client'
import InsideLayout from '@/components/admin/layouts/inside'
// import { SearchField } from '@/components/admin/common/search'
import { getListClients } from '@/api/client'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import DatePicker from '@/components/admin/common/datepicker/double'
import Link from 'next/link'
import DspLoader from '@/components/admin/common/loader'

function TableClient () {
  // const [searchParams, setSearchParams] = useState('')
  // const [startDate, setStartDate] = useState(null)
  // const [endDate, setEndDate] = useState(null)
  const [clients, setClients] = useState([])
  const [expandedRows, setExpandedRows] = useState([])
  let date

  const [dateRange, setDateRange] = useState({
    startDate: dayjs('2022-01-01'),
    endDate: dayjs()
  })

  // // Modifica la función handleSearchChange para manejar búsqueda por texto
  // const handleSearchChange = (value) => {
  //   setSearchParams(value)
  // }

  // // Agrega una función para manejar el cambio en el rango de fechas
  // const handleDateChange = (newStartDate, newEndDate) => {
  //   setStartDate(newStartDate)
  //   setEndDate(newEndDate)
  // }

  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange)
  }

  useEffect(() => {
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      getListClients(dateRange)
        .then((response) => {
          console.log(response)
          setClients(response.data)
        })
        .catch((error) => {
          console.error('Error fetching restock data:', error)
        })
    }
  },
  [dateRange])

  if (!getListClients) {
    return (
      <div>
        <DspLoader />
      </div>
    )
  }
  return (
    <>
      <InsideLayout />
      <div className=''>
        <h1 className=' mt-10 text-d-dark-dark-purple text-2xl font-bold text-center'>Clientes</h1>
        <div className='flex'>
          {/* <div className='join w-full md:max-w-xs ml-5 mt-2 max-[431px]:hidden'> */}

          {/* <SearchField
              type='text' placeholder='Búsqueda' name='search' className='input input-sm input-bordered bg-d-white join-item rounded-full text-d-dark-dark-purple '
              onChange={(v) => handleSearchChange(v)}
            />

            <button type='button ' onClick={() => handleSearchChange('')} className='btn btn-sm join-item rounded-r-full  bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button> */}
          {/* </div> */}
          <div className='absolute w-full px-10 mt-4'>
            <DatePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              handleDateChange={handleDateChange}
            />
          </div>
        </div>
        <div className='overflow-x-auto p-10 mt-8'>
          {clients && (
            <table className='table  text-d-dark-dark-purple table-zebra max-[431px]:hidden'>
              <thead>
                <tr className='bg-d-dark-dark-purple text-d-white'>
                  <th />
                  <th>Nombre</th>
                  <th>Correo electrónico</th>
                  <th>Teléfono</th>
                  <th>Fecha Creación</th>
                  <th />

                </tr>
              </thead>
              <tbody>
                {clients.map((item) => {
                  date = new Date(item.creation.timestamp * 1000)
                  return (
                    <tr key={item.id}>
                      <td />
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone?.areaCode} {item.phone?.number || 'Sin información'}</td>
                      <td>{date.toLocaleString()} </td>
                      <td className='flex justify-center'>
                        <button className='mt-2'>
                          <Link href={`/client/table-client/details?clientId=${item.id}`}>
                            <span className='hover:underline'>Ver más</span>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  )
                })}

              </tbody>

            </table>
          )}

        </div>
        {/* MOBILE */}
        {/* <h1 className='mb-10 text-d-dark-dark-purple text-2xl font-bold text-center md:hidden'>Clientes</h1> */}
        {/* <div className='md:hidden join w-full m-2 mb-5'> */}

        {/* <SearchField
            type='text' placeholder='Búsqueda' name='search' className='input input-sm input-bordered bg-d-white join-item rounded-full text-d-dark-dark-purple '
            onChange={(v) => handleSearchChange(v)}
          /> */}
        {/*
          <button type='button ' onClick={() => handleSearchChange('')} className='btn btn-sm join-item rounded-r-full  bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button> */}
        {/* </div> */}

        <div className='md:hidden m-2'>
          {clients && clients.map((item) => (

            <div key={item.id} className='pb-2'>

              <div className='flex justify-between w-full md:hidden bg-d-soft-purple p-2 rounded-md'>
                <div className=''>
                  <h3>
                    <span className='mr-5 font-bold'>
                      Cliente
                    </span>
                    {item.name}

                  </h3>
                </div>
                <button
                  className='btn'
                  onClick={() => {
                    const newExpandedRows = [...expandedRows]
                    if (newExpandedRows.includes(item)) {
                      newExpandedRows.splice(newExpandedRows.indexOf(item), 1)
                    } else {
                      newExpandedRows.push(item)
                    }
                    setExpandedRows(newExpandedRows)
                  }}
                >
                  <svg width='19' height='8' viewBox='0 0 19 8' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <g id='&#240;&#159;&#166;&#134; icon &#34;arrow down 1&#34;'>
                      <path id='Vector' d='M9.24372 7.31144C8.52431 7.31144 7.8049 7.08182 7.26021 6.6311L0.559468 1.08641C0.261427 0.839788 0.261427 0.431587 0.559468 0.184966C0.857508 -0.0616553 1.35082 -0.0616553 1.64886 0.184966L8.3496 5.72966C8.84291 6.13786 9.64453 6.13786 10.1378 5.72966L16.8386 0.184966C17.1367 -0.0616553 17.63 -0.0616553 17.928 0.184966C18.226 0.431587 18.226 0.839788 17.928 1.08641L11.2272 6.6311C10.6825 7.08182 9.96313 7.31144 9.24372 7.31144Z' fill='#292D32' />
                    </g>
                  </svg>

                </button>

              </div>
              {/* Detalles colapsables */}
              {expandedRows.includes(item) && (
                <div className='mt-2 p-2'>
                  <div className='grid grid-cols-2 gap-4'>
                    <h2 className='font-semibold'>Email</h2>
                    <div>
                      <span>{item.email}</span>
                    </div>

                    <h2 className='font-semibold'>Teléfono</h2>
                    <span>{item.phone?.areaCode} {item.phone?.number || 'Sin información'}</span>

                    <h2 className='font-semibold'>Fecha creación</h2>
                    <span>{new Date(item.creation.timestamp * 1000).toLocaleString()}</span>

                  </div>
                  <div className='flex justify-center'>
                    <button className='btn mt-5'>
                      <Link href={`/client/table-client/details?clientId=${item.id}`}>
                        <span className='hover:underline'>Ver más</span>
                      </Link>
                    </button>
                  </div>
                </div>

              )}
            </div>
          ))}

        </div>
      </div>
    </>
  )
}

export default TableClient
