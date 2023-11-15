import React from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'

export default function UsersTable ({ data }) {
  const { handleSubmit } = useForm()

  const onSubmit = (editedUserData) => {
    console.log(editedUserData)
  }

  if (!data || data.length === 0) {
    return (
      <p className='text-center'>No hay datos disponibles</p>
    )
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='overflow-x-auto'>
          <table className='table text-d-dark-dark-purple table-zebra max-[431px]:hidden'>
            <thead>
              <tr className='bg-d-dark-dark-purple text-d-white'>
                <th />
                <th>ID</th>
                <th>Nombre</th>
                <th>Rol</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr key={user.fullname}>
                  <td />
                  <td>{user.id}</td>
                  <td>{user.fullname}</td>
                  <td>{user.role}</td>
                  <td>
                    <Link href='/users/edit/'>
                      <p>✎</p>
                    </Link>
                  </td>
                  <td>🗑</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </form>
      {/* MOBILE */}
      <form onSubmit={handleSubmit(onSubmit)} className='md:hidden'>
        <div className='overflow-x-auto'>
          {/* <tbody> */}
          {data.map((user) => (
            <div key={user.fullname} className='pb-2 w-screen'>
              <div className='flex flex-col md:hidden bg-d-soft-purple rounded-md'>
                <div className='flex justify-end mr-16 mt-2'>

                  <Link href='/users/edit/'>
                    <p className=''>Editar ✎</p>
                  </Link>

                  <p className=''>Eliminar 🗑️</p>

                </div>
                <div className=''>
                  <h2>
                    <span className='mr-20 font-bold'>
                      ID
                    </span>
                    {user.id}
                  </h2>

                  <h3>
                    <span className='mr-7 font-bold'>
                      Nombre
                    </span>
                    {user.fullname}
                  </h3>
                  <h3>
                    <span className='mr-16 font-bold'>
                      Rol
                    </span>
                    {user.role}
                  </h3>
                </div>
              </div>
            </div>

          ))}
          {/* </tbody> */}
        </div>
      </form>
    </>
  )
}
