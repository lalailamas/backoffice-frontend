'use client'
import InsideLayout from '@/components/admin/layouts/inside'
import { SearchField } from '@/components/admin/common/search'
import { getListClients } from '@/api/client'
import { useEffect, useState } from 'react'

function TableClient () {
  const [searchKey, setSearchKey] = useState('')
  const [clients, setClients] = useState([])
  const [params, setParams] = useState({ limit: 10, page: 1, search: '' })

  useEffect(() => {
    getListClients()
      .then((response) => {
        setClients(response.data.data)
      })
      .catch((error) => {
        console.error('Error fetching clients:', error)
      })
  }, [params])

  useEffect(() => {
    const clone = { ...params, search: searchKey }
    setParams(clone)
  }, [searchKey])

  return (
    <>
      <InsideLayout />
      <div className='join w-full md:max-w-xs mt-5 ml-5 '>
        <SearchField
          type='text' placeholder='Búsqueda' name='search' className='input input-sm input-bordered bg-d-white join-item rounded-full text-d-dark-dark-purple'
          onChange={(v) => setSearchKey(v)}
        />

        <button type='button ' onClick={() => setSearchKey('')} className='btn btn-sm join-item rounded-r-full  bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>

          <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
            <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
          </svg>

        </button>
      </div>
      <div className='overflow-x-auto p-4'>
        {clients && (
          <table className='table  text-d-dark-dark-purple table-zebra'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th />
                <th>Nombre</th>
                <th>Correo electrónico</th>
                <th>Teléfono</th>
                <th>Fecha Creación</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((item) => {
                const date = new Date(item.creation.timestamp * 1000)
                return (
                  <tr key={item.id}>
                    <td />
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>{item.phone ? `${item.phone.areaCode} ${item.phone.number}` : 'N/A'}</td>
                    <td>{date.toLocaleString()} </td>
                  </tr>
                )
              })}

            </tbody>

          </table>
        )}

      </div>

    </>
  )
}

export default TableClient
