'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { listUsers, downloadExcel } from '../../api/user'
import UsersTable from './list'
import FileSaver from 'file-saver'
import { swallError, Toast } from '@/utils/sweetAlerts'
import Swal from 'sweetalert2'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'

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
      <div className='flex justify-center mt-4 mb-4 p-4'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center md:text-left'>Usuarios</h2>
      </div>
      <div className='flex flex-row md:flex-row gap-y-2 md:gap-y-0 md:gap-x-2 justify-end'>
        <Link href='/users/create'>
          <div className='p-2 pb-8 pr-10'>
            <ButtonPrimary text='Crear Usuario' type='create' />
          </div>
        </Link>

        <div className='p-2 pb-8 pr-10'>
          <ButtonPrimary text='Descargar' onClick={handleExcelDownload} type='download' />
        </div>
      </div>
      <div className='px-8 mb-11'>
        <UsersTable
          data={users}
        />
      </div>
    </>
  )
}
export default Users
