import { useState } from 'react'
import { createUser } from '../api/user'
import InsideLayout from '@/components/admin/layouts/inside'
import { useRouter } from 'next/router'

function CreateUserForm () {
  const [user, setUser] = useState({
    email: '',
    password: '',
    first_name: '',
    first_lastname: '',
    second_lastname: '',
    role: ''
  })

  const [error, setError] = useState(null)
  const [successMessage, setSuccessMessage] = useState('')
  const router = useRouter()

  const handleCreateAccount = () => {
    if (!user.email || !user.password || user.password.length < 6) {
      setError('Complete todos los campos correctamente')
      return
    }

    createUser(user)
      .then((response) => {
        console.log(response, 'respuesta de createUser')
        setSuccessMessage('Usuario creado exitosamente')
        setTimeout(() => {
          router.push('/users')
        }, 2000)
      })
      .catch((error) => {
        console.error('Error al crear la cuenta:', error)
      })
  }

  return (
    <>
      <InsideLayout />
      <div className='bg-grey-lighter min-h-screen flex flex-col'>
        <div className='container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center'>
          <div className='bg-white px-6 py-3 w-full'>
            <h1 className='text-d-dark-dark-purple text-2xl font-bold pb-4'>Crear cuenta</h1>
            <div className='pb-4'>
              <select
                defaultValue='read'
                className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
                onChange={(e) => setUser({ ...user, role: e.target.value })}
                required
              >
                <option value='Tipo de perfil'>Tipo de perfil</option>
                <option value='admin'>Admin</option>
                <option value='restock'>Reponedor</option>
                <option value='read'>Lector</option>
              </select>

            </div>
            <label className='label' />
            <span className='label-text'>Email</span>
            <input
              type='text'
              className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
              name='email'
              placeholder='Email'
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              required
            />

            <label className='label' />
            <span className='label-text'>Contraseña</span>
            <input
              type='password'
              className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
              name='password'
              placeholder='Contraseña'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              minLength='6'
              required
            />

            <label className='label' />
            <span className='label-text'>Confirma contraseña</span>
            <input
              type='password'
              className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
              name='confirm_password'
              placeholder='Confirma contraseña'
              required
            />
            <label className='label' />
            <span className='label-text'>Nombre</span>

            <input
              type='text'
              className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
              name='name'
              placeholder='Nombre'
              required
              value={user.first_name}
              onChange={(e) => setUser({ ...user, first_name: e.target.value })}
            />
            <label className='label' />
            <span className='label-text'>Apellido paterno</span>
            <input
              type='text'
              className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
              placeholder='Apellido paterno'
              required
              value={user.first_lastname}
              onChange={(e) => setUser({ ...user, first_lastname: e.target.value })}
            />
            <label className='label' />
            <span className='label-text'>Apellido materno</span>
            <input
              type='text'
              className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple'
              placeholder='Apellido materno'
              required
              value={user.second_lastname}
              onChange={(e) => setUser({ ...user, second_lastname: e.target.value })}
            />

            <button
              type='button'
              className='btn border-none mt-4 rounded-2xl bg-d-dark-dark-purple text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple disabled:text-d-white'
              onClick={handleCreateAccount}
            >Crear cuenta
            </button>
            {error && <p className='p-2 text-error my-4'>{error}</p>}
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
