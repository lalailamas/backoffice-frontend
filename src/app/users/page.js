import React from 'react'
// import InsideLayout from '@/components/admin/layouts/inside'
import Link from 'next/link'
import { listUsers } from '../../api/user'
import UsersTable from './list'

import ButtonDownload from './buttonDownload'

async function Users () {
  const users = await listUsers()

  return (
    <>
      <div className='flex justify-center mt-4 mb-4 p-4'>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center md:text-left'>Usuarios</h2>
      </div>
      <div className='flex flex-row md:flex-row gap-y-2 md:gap-y-0 md:gap-x-2 justify-end'>
        <Link href='/users/create'>
          <div className='p-2 pb-8 pr-10'>
            <button className='btn btn-sm join-item rounded-full bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple'>Crear Usuario</button>
          </div>
        </Link>
        <ButtonDownload users={users} />

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
