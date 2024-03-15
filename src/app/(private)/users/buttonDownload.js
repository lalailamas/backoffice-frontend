'use client'
import { downloadExcel } from '@/api/user'
import { Toast, swallError } from '@/utils/sweetAlerts'
import FileSaver from 'file-saver'
import React from 'react'
import Swal from 'sweetalert2'

export default function ButtonDownload ({ users }) {
  const handleExcelDownload = async () => {
    if (!users || users.length === 0) {
      return
    }

    try {
      Toast('Descargando archivo', 'Espera unos segundos')
      const response = await downloadExcel()
      const { buffer, filename } = response.data
      const blob = new Blob([Buffer.from(buffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, filename)
      Swal.close()
    } catch (error) {
      swallError('Error al descargar el archivo Excel:', false)
      console.error('Error al descargar el archivo Excel:', error)
    }
  }
  return (
    <div className='p-2 pb-8 pr-10'>
      <button onClick={handleExcelDownload} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
        <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-2'>
          <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
        </svg>
        Descargar
      </button>
    </div>
  )
}
