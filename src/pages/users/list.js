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
          <table className='table text-d-dark-dark-purple table-zebra'>
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

    </>
  )
}
