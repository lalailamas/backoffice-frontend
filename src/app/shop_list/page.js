'use client'
import React, { useEffect, useState } from 'react'
import FileSaver from 'file-saver'
import { downloadShopList, downloadStoresStock, getRepositionByStore, getShopList } from '@/api/stock'
import useGetStores2 from '@/hooks/useStores2'
import { MultiSelect, MultiSelectItem } from '@tremor/react'
import ShopListTable from './shopListTable'
import DspLoader from '@/components/admin/common/loader'
import { swallError, Toast } from '@/utils/sweetAlerts'
import Swal from 'sweetalert2'
import TabsComponent from '@/components/admin/common/tabs'
import RequestedStockTable from './requestedStockTable'

function shopList () {
  const [ids, setIds] = useState([])
  const { stores } = useGetStores2()
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const [dataRequested, setDataRequested] = useState([])
  const [loadingRequested, setLoadingRequested] = useState(false)
  console.log(stores, 'stores')
  const handleStoreChange = (selectedIds) => {
    setIds(selectedIds)
  }

  const handleExcelDownload = async () => {
    Toast('Descargando archivo', 'espera unos segundos', 2000)
    try {
      const response = await downloadShopList(ids)
      // console.log(response.data, 'response')
      const { buffer, filename } = response.data

      const blob = new Blob([Buffer.from(buffer)], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })

      FileSaver.saveAs(blob, filename)
      Swal.close()
    } catch (error) {
      console.error('Error al descargar el archivo Excel:', error)
      Swal.close()
    }
  }
  const handleShopList = async () => {
    setLoading(true)

    if (ids.length === 0) {
      swallError('Selecciona una tienda', false)
      setLoading(false)
      return
    }
    try {
      const response = await getShopList(ids)
      handleShopListRequested()
      if (response.data.length === 0) {
        swallError('No hay datos para mostrar', false)
      } else {
        setLoading(false)
        setData(response.data)
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
  const handleShopListRequested = async () => {
    setLoadingRequested(true)
    try {
      const responseRequested = await getRepositionByStore(ids)
      console.log(responseRequested.data, 'response.data')
      if (responseRequested.data.length === 0) {
        swallError('No hay datos para mostrar', false)
      } else {
        setLoadingRequested(false)
        setDataRequested(responseRequested.data)
      }
    } catch (error) {
      swallError('Error al obtener los datos', false)
      setLoadingRequested(false)
      console.error('Error al obtener los datos', error)
    }
  }
  useEffect(() => {
    console.log(ids, 'ids')
  }, [ids])

  const tabs = [
    {
      id: 'shopList',
      name: 'Lista de compras',
      active: true,
      content: (
        <div className='justify-center'>
          {(loading)
            ? (
              <DspLoader />
              )
            : (
              <div className=''>
                <ShopListTable data={data} />
              </div>
              )}

          {/* <div><pre>{JSON.stringify(ids, null, 2)}</pre></div> */}
        </div>

      )
    },
    {
      id: 'RepositionByStore',
      name: 'Reposición por tienda',
      active: false,
      content: (
        <div className=''>

          {
        (loadingRequested)
          ? (<DspLoader />)
          : (
            <div>

              <div>
                <RequestedStockTable data={dataRequested} />
              </div>
            </div>
            )
  }
        </div>

      )

    }
  ]
  return (
    <div className='h-screen'>

      <h1 className='p-12 text-d-dark-dark-purple text-2xl font-bold text-center'>Gestión de abastecimiento</h1>

      <div className='flex justify-center gap-6 '>

        <MultiSelect
          placeholderSearch='Buscar'
          placeholder='Selecciona una(s) tienda(s)'
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

          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' dataSlot='icon' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='m19.5 8.25-7.5 7.5-7.5-7.5' />
          </svg>

        </button>
        {/* </div> */}
        {ids.length > 0 &&

          <div className='flex justify-end gap-4'>

            <div className=''>
              <button onClick={handleExcelDownloadRequested} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-2'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
                </svg>
                Descargar Reposición por tienda
              </button>
            </div>
            <div className=''>
              <button onClick={handleExcelDownload} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
                <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-2'>
                  <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
                </svg>
                Descargar Lista de compras
              </button>
            </div>
          </div>}
      </div>

      <div className='p-10'>
        <TabsComponent tabs={tabs} />
      </div>

    </div>

  )
}

export default shopList
