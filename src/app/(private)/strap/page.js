'use client'
import React, { useState } from 'react'
import useGetStores2 from '@/hooks/useStores2'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import { Toast, swallError } from '@/utils/sweetAlerts'
import FileSaver from 'file-saver'
import Swal from 'sweetalert2'
import { downloadTrapsPDF } from '@/api/product'
import { SearchField } from '@/components/admin/common/search'

function Strap () {
  const { stores } = useGetStores2(false)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredStores = stores
    ? stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }

  const handlePDFDownload = async (storeId, style) => {
    try {
      Toast('Descargando archivo', 'Espera unos segundos')
      const response = await downloadTrapsPDF(storeId, style)
      const pdfBlob = new Blob([response.data], { type: 'application/pdf' })

      // Definir el nombre del archivo
      const date = new Date()
      const day = date.getDate().toString().padStart(2, '0')
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const year = date.getFullYear()
      const filename = `${year}${month}${day}_${storeId}_${style}.pdf`

      FileSaver.saveAs(pdfBlob, filename)
      Swal.close()
    } catch (error) {
      swallError('Error al descargar el archivo PDF:', false)
      console.error('Error al descargar el archivo PDF:', error)
    }
  }

  return (
    <>
      <MainTitle>Descarga de flejes por tienda</MainTitle>
      <div className='p-6 flex justify-center'>
        <SearchField
          placeholder='Busca una tienda...'
          onChange={handleSearchChange}
        />
      </div>
      <div className='flex flex-col justify-center items-center gap-8 p-4 m-4'>
        <table className='table text-d-dark-dark-purple table-zebra max-[431px]:hidden w-2/4'>
          <thead>
            <tr className='bg-d-dark-dark-purple text-d-white text-center'>
              <th />
              <th>Tienda</th>
              <th>PDF Oscuro</th>
              <th>PDF Claro</th>
            </tr>
          </thead>
          <tbody>
            {stores && filteredStores.map((store) => (
              <tr key={store.name}>
                <td />
                <td>{store.name}</td>
                <td className='p-4 w-auto'>
                  <ButtonPrimary text='PDF Oscuro' onClick={() => handlePDFDownload(store.storeId, 'dark')} type='download' />
                </td>
                <td>
                  <ButtonPrimary text='PDF Claro' onClick={() => handlePDFDownload(store.storeId, 'light')} type='download' />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

    </>
  )
}

export default Strap
