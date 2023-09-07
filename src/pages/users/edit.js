import React from 'react'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
import InsideLayout from '@/components/admin/layouts/inside'

export default function EditUserForm () {
  const router = useRouter()
  const { id } = router.query // Obtener el ID del usuario de la URL
  const { register, handleSubmit } = useForm()

  const onSubmit = (editedUserData) => {
    console.log(editedUserData)
    router.push('/users')
  }

  return (
    <div>
      <InsideLayout />

      <h2>Editar Usuario</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='hidden' {...register('id')} value={id} />
        <input
          type='text'
          {...register('fullname')}
          placeholder='Nombre'
        />
        <input
          type='text'
          {...register('role')}
          placeholder='Rol'
        />
        <button type='submit'>Guardar</button>
        <button
          type='button'
          onClick={() => {
            router.push('/users')
          }}
        >
          Cancelar
        </button>
      </form>
    </div>
  )
}
