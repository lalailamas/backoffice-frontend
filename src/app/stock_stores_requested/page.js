'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import React, { useEffect, useState } from 'react'
import FileSaver from 'file-saver'
import { downloadStoresStock, getRepositionByStore } from '@/api/stock'
import RequestedStockTable from './requestedStockTable'
import { swallError, Toast } from '@/utils/sweetAlerts'
import DspLoader from '@/components/admin/common/loader'
import Swal from 'sweetalert2'

function requestedByStore () {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)

  const handleExcelDownload = async () => {
    Toast('Descargando archivo', 'espera unos segundos')

    try {
      const response = await downloadStoresStock()
      console.log(response, 'response')
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, 'reposicionportienda.xlsx')
      Swal.close()
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error)
      Swal.close()
    }
  }
  const handleShopList = async () => {
    setLoading(true)
    try {
      const response = await getRepositionByStore()
      console.log(response.data, 'response.data')
      if (response.data.length === 0) {
        swallError('No hay datos para mostrar', false)
      } else {
        setLoading(false)
        setData(response.data)
      }
    } catch (error) {
      swallError('Error al obtener los datos', false)
      setLoading(false)
      console.error('Error al obtener los datos', error)
    }
  }
  useEffect(() => {
    handleShopList()
  }, [])

  return (
    <div>
      <InsideLayout />
      <div className='flex justify-center mt-4 mb-4 p-4'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center md:text-left'>Solicitado por tienda</h2>
      </div>
      {
      (loading)
        ? (<DspLoader />)
        : (
          <div>
            <div className='flex justify-end items-start p-5'>
              <div className='p-2 pb-8 pr-10'>
                <button onClick={handleExcelDownload} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-2'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
                  </svg>
                  Descargar
                </button>
              </div>
            </div>
            <div>
              <RequestedStockTable data={data} />
            </div>
          </div>
          )
}
    </div>
  )
}

export default requestedByStore
