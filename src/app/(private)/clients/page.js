/* eslint-disable multiline-ternary */
'use client'

import { getListClients, downloadClientsExcel } from '@/api/client'
import { useEffect, useState } from 'react'
import dayjs from 'dayjs'
import DatePicker from '@/components/admin/common/datepicker/double'
import Link from 'next/link'
import DspLoader from '@/components/admin/common/loader'
import FileSaver from 'file-saver'
import Swal from 'sweetalert2'
import { swallError, Toast } from '@/utils/sweetAlerts'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import MainTitle from '@/components/admin/common/titles/MainTitle'

function TableClient () {
  const [clients, setClients] = useState([])
  const [expandedRows, setExpandedRows] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  // Filtro por 3 meses hacia atrás hasta el día actual
  const [dateRange, setDateRange] = useState({
    startDate: dayjs().subtract(3, 'months').startOf('month'),
    endDate: dayjs()
  })
  const handleDateChange = (newDateRange) => {
    setDateRange(newDateRange)
  }

  useEffect(() => {
    if (dateRange.startDate !== null && dateRange.endDate !== null) {
      getListClients(dateRange, searchTerm)
        .then((response) => {
          setClients(response)
        })
        .catch((error) => {
          console.error('Error fetching restock data:', error)
        })
    }
  }, [dateRange, searchTerm])

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }

  const clearSearch = () => {
    setSearchTerm('')
  }
  if (!getListClients) {
    return (
      <div>
        <DspLoader />
      </div>
    )
  }

  /**
   * Formats a timestamp to a readable date string.
   *
   * @param {number} timestamp - The timestamp to format.
   * @returns {string} The formatted date string.
   */
  function formatTimestampToDate (timestamp) {
    const milliseconds = timestamp * 1000

    const date = new Date(milliseconds)

    const formatOptions = {
      // weekday: 'long',
      day: 'numeric',
      month: 'short',
      year: 'numeric'
      // hour: 'numeric',
      // minute: 'numeric'
    }

    const dateFormatter = new Intl.DateTimeFormat('es-ES', formatOptions)
    const formattedDate = dateFormatter.format(date)

    return formattedDate
  }

  const handleExcelDownload = async () => {
    try {
      Toast('Descargando archivo', 'Espera unos segundos')
      const response = await downloadClientsExcel(dateRange, searchTerm)
      const { buffer, filename } = response
      const blob = new Blob([Buffer.from(buffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, filename)
      Swal.close()
    } catch (error) {
      swallError('Error al descargar el archivo Excel:', false)
      console.error('Error al descargar el archivo Excel:', error)
    }
  }

  return (
    <>
      <div className='h-screen'>
        <MainTitle>Clientes</MainTitle>
        <div className='flex items-center gap-4 px-8 mt-4 max-[431px]:flex-col'>
          <div className='join'>
            <input
              type='text'
              placeholder='Búsqueda'
              name='search'
              className='input input-sm input-bordered bg-d-white join-item rounded-full text-d-dark-dark-purple '
              onChange={(e) => handleSearchChange(e.target.value)}
              value={searchTerm}
            />

            <button
              type='button'
              onClick={clearSearch}
              className='btn btn-sm join-item rounded-r-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'
            >
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </button>
          </div>

          <div className='w-[300px]'>
            <DatePicker
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              handleDateChange={handleDateChange}
            />
          </div>

          <ButtonPrimary
            text='Descargar'
            onClick={handleExcelDownload}
            type='download'
          />
        </div>

        <div className='overflow-x-auto p-5'>
          {clients.length > 0
            ? (
              <table className='table  text-d-dark-dark-purple table-zebra mt-8 p-8 max-[431px]:hidden'>
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
                  {clients.map((item) => (
                    <tr key={item.id}>
                      <td />
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone?.areaCode} {item.phone?.number || 'Sin información'}</td>
                      <td>{formatTimestampToDate(item.creation.timestamp)}</td>
                      <td className='flex justify-center'>
                        <button className='mt-2'>
                          <Link href={`/clients/table-client/details?clientId=${item.id}`}>
                            <span className='hover:underline'>Ver más</span>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              )
            : (
              <p className='pt-10 text-center text-d-dark-dark-purple'>No hay clientes en el rango de fechas seleccionado</p>
              )}
        </div>

        {/* MOBILE */}
        <div className='md:hidden m-2'>
          {clients.length > 0 ? clients.map((item) => (
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
                      <Link href={`/clients/table-client/details?clientId=${item.id}`}>
                        <span className='hover:underline'>Ver más</span>
                      </Link>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )) : (
            <p className='max-[431px]:hidden text-center text-d-dark-dark-purple'>No hay clientes en el rango de fechas seleccionado</p>
          )}
        </div>
      </div>
    </>
  )
}

export default TableClient
