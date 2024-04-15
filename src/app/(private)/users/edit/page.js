'use client'
import { useForm, Controller } from 'react-hook-form'
import { useRouter, useSearchParams } from 'next/navigation'
import { editUser, getUserById } from '@/api/user'
import { useEffect, useState } from 'react'
import { swallInfo, swallError } from '@/utils/sweetAlerts'

export default function EditUserForm () {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()
  const { handleSubmit, register, control, setValue, formState } = useForm()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const fetchId = async () => {
      try {
        const response = await getUserById(id)
        setUser(response)
      } catch (error) {
        console.error('error')
      }
    }
    fetchId()
  }, [id])

  useEffect(() => {
    if (user) {
      setValue('id', user.id)
      setValue('email', user.email)
      setValue('role', user.role)
      setValue('first_name', user.first_name)
      setValue('first_lastname', user.first_lastname)
      setValue('second_lastname', user.second_lastname)
    }
  }, [user, setValue])

  const onSubmit = async (formData) => {
    try {
      await editUser(formData)
      swallInfo('Usuario modificado exitosamente')
      router.push('/users')
    } catch (error) {
      swallError('Error al editar el usuario:', false)
      console.error('Error al editar el usuario:', error)
    }
  }

  return (
    <div>
      <div className='flex flex-col p-8 mb-8'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center'>
          <div className='bg-white px-6 py-3'>

            <h1 className='text-d-dark-dark-purple text-2xl font-bold pb-4'>Editar usuario</h1>

            {user && (
              <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                <Controller
                  name='email'
                  control={control}
                  defaultValue={user.email}
                  rules={{
                    required: 'El email es requerido',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Ingrese un correo electrónico válido'
                    }
                  }}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type='text'
                        placeholder='Email'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                      />
                      {formState.errors.email && (
                        <p className='text-error'>{formState.errors.email.message}</p>
                      )}
                    </div>
                  )}
                />
                <input
                  type='text'
                  {...register('role')}
                  placeholder='Rol'
                  className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                  readOnly
                />

                <Controller
                  name='first_name'
                  control={control}
                  defaultValue={user.first_name}
                  rules={{
                    required: 'Este campo es requerido',
                    pattern: {
                      value: /^[A-Za-z\u00C0-\u017F\s]+$/,
                      message: 'Use carácteres válidos'
                    }
                  }}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type='text'
                        placeholder='Nombre'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                      />
                      {formState.errors.first_name && (
                        <p className='text-error'>{formState.errors.first_name.message}</p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name='first_lastname'
                  control={control}
                  defaultValue={user.first_lastname}
                  rules={{
                    required: 'Este campo es requerido',
                    pattern: {
                      value: /^[A-Za-z\u00C0-\u017F\s]+$/,
                      message: 'Use caracteres válidos'
                    }
                  }}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type='text'
                        placeholder='Apellido'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                      />
                      {formState.errors.first_lastname && (
                        <p className='text-error'>{formState.errors.first_lastname.message}</p>
                      )}
                    </div>
                  )}
                />

                <Controller
                  name='second_lastname'
                  control={control}
                  defaultValue={user.second_lastname}
                  rules={{
                    required: 'Este campo es requerido',
                    pattern: {
                      value: /^[A-Za-z\u00C0-\u017F\s]+$/,
                      message: 'Use caracteres válidos'
                    }
                  }}
                  render={({ field }) => (
                    <div>
                      <input
                        {...field}
                        type='text'
                        placeholder='Segundo apellido'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                      />
                      {formState.errors.second_lastname && (
                        <p className='text-error'>{formState.errors.second_lastname.message}</p>
                      )}
                    </div>
                  )}
                />

                <div className='flex gap-4'>
                  <button type='button' className='btn border-none mt-4 rounded-2xl bg-d-soft-soft-purple text-d-dark-dark-purple hover:bg-d-dark-dark-purple hover:text-d-white' onClick={() => router.push('/users')}>Cancelar</button>
                  <button type='submit' className='btn border-none mt-4 rounded-2xl bg-d-dark-dark-purple text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple disabled:text-d-white'>Guardar cambios</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}
