'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import React from 'react'
import FileSaver from 'file-saver'
import { downloadShopList, downloadStoresStock } from '@/api/stock'

function requestedByStore () {
  const handleExcelDownload = async () => {
    // const ids = ['DEV_CNV_001', 'DEV_CNV_002']
    try {
      // const response = await downloadShopList(ids)
      const response = await downloadStoresStock()
      console.log(response, 'response')
      const blob = new Blob([response.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, 'reposicionportienda.xlsx')
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error)
    }
  }
  return (
    <div>
      <InsideLayout />
      <div className='flex justify-center mt-4 mb-4 p-4'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center md:text-left'>Solicitado por tienda</h2>
      </div>
      <div className='p-2 pb-8 pr-10'>
        <button onClick={handleExcelDownload} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-2'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
          </svg>
          Descargar
        </button>
      </div>
    </div>
  )
}

export default requestedByStore
