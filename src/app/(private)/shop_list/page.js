'use client'
import React, { useEffect, useState } from 'react'
import FileSaver from 'file-saver'
import { downloadStoresStock, getRepositionByStore } from '@/api/stock'
import useGetStores2 from '@/hooks/useStores2'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import { swallError, Toast } from '@/utils/sweetAlerts'
import Swal from 'sweetalert2'
import RequestedStockTable from './requestedStockTable'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import DspLoader from '@/components/admin/common/loader'

function shopList () {
  const [ids, setIds] = useState([])
  const { stores } = useGetStores2(false)
  const [loading, setLoading] = useState(false)
  const [dataRequested, setDataRequested] = useState([])
  // console.log(stores, 'stores')
  const handleStoreChange = (selectedIds) => {
    setIds(selectedIds)
  }

  const handleShopList = async () => {
    setLoading(true)

    if (ids.length === 0) {
      swallError('Selecciona una tienda', false)
      setLoading(false)
      return
    }
    try {
      const response = await getRepositionByStore(ids)
      if (response.length === 0) {
        swallError('No hay datos para mostrar', false)
      } else {
        setLoading(false)
        setDataRequested(response)
      }
    } catch (error) {
      swallError('Error al obtener los datos', false)
      console.error('Error al obtener los datos', error)
    }
  }
  const handleExcelDownloadRequested = async () => {
    Toast('Descargando archivo', 'espera unos segundos')

    try {
      const response = await downloadStoresStock(ids)

      const { buffer, filename } = response.data

      const blob = new Blob([Buffer.from(buffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
      FileSaver.saveAs(blob, filename)
      Swal.close()
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error)
      Swal.close()
    }
  }
  useEffect(() => {
    console.log(ids, 'ids')
  }, [ids])

  return (
    <div>
      <MainTitle>Gestión de abastecimiento</MainTitle>
      <div className='flex justify-center gap-6 '>
        <MultiSelect
          placeholderSearch='Buscar'
          value={ids}
          onValueChange={handleStoreChange}
          className='data-te-select-init multiple w-1/2'
        >
          {stores?.map((store) => (
            store.layoutId
              ? (
                <MultiSelectItem key={store.storeId} value={store.storeId}>
                  {store.name}
                </MultiSelectItem>
                )
              : null
          ))}
        </MultiSelect>
        {/* <div className='pl-3'> */}
        <button
          type='button'
          onClick={() => {
            handleShopList()
          }}
          className=' items-center px-3 py-2 text-sm font-medium text-center text-white bg-d-dark-dark-purple rounded-lg hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple focus:ring-4 focus:outline-none '
        >

          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' dataslot='icon' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>

        </button>
        {/* </div> */}
        {ids.length > 0 &&

          <div className='flex justify-end gap-4'>

            <div className=''>
              <ButtonPrimary text='Descargar Reposición por tienda' onClick={handleExcelDownloadRequested} type='download' />
            </div>
          </div>}
      </div>
      {loading
        ? <DspLoader />
        : (
          <div className='p-10'>
            <RequestedStockTable data={dataRequested} />
          </div>
          )}
    </div>

  )
}

export default shopList
