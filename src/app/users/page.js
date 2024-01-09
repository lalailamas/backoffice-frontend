'use client'
import React, { useEffect, useState } from 'react'
// import InsideLayout from '@/components/admin/layouts/inside'
import Link from 'next/link'
import { listUsers, downloadExcel } from '../../api/user'
import UsersTable from './list'
import FileSaver from 'file-saver'
import { swallError, Toast } from '@/utils/sweetAlerts'
import Swal from 'sweetalert2'

function Users () {
  const [users, setUsers] = useState([])

  const fetchUsers = async () => {
    try {
      const response = await listUsers()
      console.log(response, 'list usuarios')
      setUsers(response.data)
    } catch (error) {
      console.error('Error fetching users', error)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [])

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
    <>
      {/* <InsideLayout /> */}
      <div className='flex justify-center mt-4 mb-4 p-4'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center md:text-left'>Usuarios</h2>
      </div>
      <div className='flex flex-row md:flex-row gap-y-2 md:gap-y-0 md:gap-x-2 justify-end'>
        <Link href='/users/create'>
          <div className='p-2 pb-8 pr-10'>
            <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>Crear Usuario</button>
          </div>
        </Link>

        <div className='p-2 pb-8 pr-10'>
          <button onClick={handleExcelDownload} className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>
            <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6 mr-2'>
              <path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3' />
            </svg>
            Descargar
          </button>
        </div>
      </div>
      <div className='px-8 mb-11'>
        <UsersTable
          data={users} updateUsers={fetchUsers}
        />
      </div>
    </>
  )
}

export default Users
