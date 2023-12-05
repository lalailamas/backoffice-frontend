'use client'
// import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import InsideLayout from '@/components/admin/layouts/inside'
import { editUser, getUserById } from '@/api/user'
import { useEffect, useState } from 'react'

export default function EditUserForm () {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()
  const { handleSubmit } = useForm()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await getUserById(id)
        console.log(response.data, 'respuesta')
        setUser(response.data)
      } catch (error) {
        console.error('error')
      }
    }
    fetchId()
  }, [])

  const onSubmit = async () => {
    const newUser = {
      id: 'user.id',
      email: user.email,
      role: user.role,
      first_name: user.first_name,
      // middle_name: user.middle_name,
      first_lastname: user.first_lastname,
      second_lastname: user.second_lastname
    }
    try {
      await editUser(newUser)
      router.push('/users')
    } catch (error) {
      console.error('Error al editar el usuario:', error)
    }
  }

  return (
    <div>
      <InsideLayout />
      <h2>Editar Usuario</h2>
      {user && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input type='text' defaultValue={user.id} placeholder='id' />
          <input type='text' defaultValue={user.email} placeholder='Email' />
          <input type='text' defaultValue={user.role} placeholder='Rol' />
          <input type='text' defaultValue={user.first_name} placeholder='Primer nombre' />
          <input type='text' defaultValue={user.middle_name} placeholder='Segundo nombre' />
          <input type='text' defaultValue={user.first_lastname} placeholder='Primero apellido' />
          <input type='text' defaultValue={user.second_lastname} placeholder='Segundo apellido' />

          <button type='submit'>Guardar</button>
          <button type='button' onClick={() => router.push('/users')}>Cancelar</button>
        </form>
      )}
    </div>
  )
}
