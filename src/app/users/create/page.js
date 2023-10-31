'use client'
import { useState } from 'react'
import InsideLayout from '@/components/admin/layouts/inside'
import { useForm, Controller } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import { createUser } from '@/api/user'

function CreateUserForm () {
  const { control, handleSubmit, setError, formState, watch } = useForm({
    defaultValues: {
      email: '',
      password: '',
      first_name: '',
      first_lastname: '',
      second_lastname: '',
      role: 'restock'
    }
  })
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const onSubmit = handleSubmit((data) => {
    createUser(data)
      .then((response) => {
        console.log(response, 'respuesta de create user')
        setSuccessMessage('Usuario creado exitosamente')
        setTimeout(() => {
          router.push('/users')
        }, 2000)
      })
      .catch((error) => {
        setError('Error al crear la cuenta. Por favor, inténtelo de nuevo', error)
      })
  })

  const handleCancel = () => {
    router.push('/users')
  }

  return (
    <>
      <InsideLayout />
      <div className='flex flex-col p-8 mb-8'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center'>
          <div className='bg-white px-6 py-3'>
            <h1 className='text-d-dark-dark-purple text-2xl font-bold pb-4'>Crear usuario</h1>
            <form onSubmit={onSubmit}>
              <div className='pb-4'>
                <label className='label'>Tipo de perfil</label>
                <Controller
                  name='role'
                  control={control}
                  defaultValue='restock'
                  rules={{ required: 'Seleccione un tipo de perfil' }}
                  render={({ field }) => (
                    <select
                      {...field}
                      className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
                    >
                      <option value='admin'>Admin</option>
                      <option value='restock'>Reponedor</option>
                      <option value='read'>Lector</option>
                    </select>
                  )}
                />
                {formState.errors.role && (
                  <p className='text-error'>{formState.errors.role.message}</p>
                )}
              </div>
              <div className='pb-4'>
                <label className='label'>Nombre</label>
                <Controller
                  name='first_name'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'El nombre es requerido'
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type='text'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                        placeholder='Nombre'
                      />
                      {formState.errors.first_name && (
                        <p className='text-error'>{formState.errors.first_name.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='pb-4'>
                <label className='label'>Apellido Paterno</label>
                <Controller
                  name='first_lastname'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'El apellido paterno es requerido'
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type='text'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                        placeholder='Apellido Paterno'
                      />
                      {formState.errors.first_lastname && (
                        <p className='text-error'>{formState.errors.first_lastname.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='pb-4'>
                <label className='label'>Apellido Materno</label>
                <Controller
                  name='second_lastname'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'El apellido materno es requerido'
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type='text'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                        placeholder='Apellido Materno'
                      />
                      {formState.errors.second_lastname && (
                        <p className='text-error'>{formState.errors.second_lastname.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='pb-4'>
                <label className='label'>Email</label>
                <Controller
                  name='email'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'El email es requerido',
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message: 'Email inválido'
                    }
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type='text'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                        placeholder='Email'
                      />
                      {formState.errors.email && (
                        <p className='text-error'>{formState.errors.email.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='pb-4'>
                <label className='label'>Confirmar Email</label>
                <Controller
                  name='confirmEmail'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'La confirmación de email es requerida',
                    validate: (value) => value === watch('email') || 'Los emails no coinciden'
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type='text'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                        placeholder='Confirmar Email'
                      />
                      {formState.errors.confirmEmail && (
                        <p className='text-error'>{formState.errors.confirmEmail.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='pb-4'>
                <label className='label'>Contraseña</label>
                <Controller
                  name='password'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type='password'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                        placeholder='Contraseña'
                      />
                      {formState.errors.password && (
                        <p className='text-error'>{formState.errors.password.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='pb-4'>
                <label className='label'>Confirmar Contraseña</label>
                <Controller
                  name='confirmPassword'
                  control={control}
                  defaultValue=''
                  rules={{
                    required: 'La confirmación de contraseña es requerida',
                    validate: (value) =>
                      value === watch('password') || 'Las contraseñas no coinciden'
                  }}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        type='password'
                        className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
                        placeholder='Confirmar Contraseña'
                      />
                      {formState.errors.confirmPassword && (
                        <p className='text-error'>{formState.errors.confirmPassword.message}</p>
                      )}
                    </>
                  )}
                />
              </div>
              <div className='flex gap-4'>
                <button
                  type='submit'
                  className='btn border-none mt-4 rounded-2xl bg-d-dark-dark-purple text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple disabled:text-d-white'
                >
                  Crear usuario
                </button>
                <button
                  type='button'
                  onClick={handleCancel}
                  className='btn border-none mt-4 rounded-2xl bg-d-soft-soft-purple text-d-dark-dark-purple hover:bg-d-dark-dark-purple hover:text-d-white'
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
          <div>
            {successMessage &&
              <p className='p-2 my-4'>{successMessage}</p>}
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateUserForm
