'use client'
/* eslint-disable camelcase */
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, useSession } from 'next-auth/react'

// const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  const { data: session } = useSession()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const performLogin = async () => {
    setLoginError(false)

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    }, { callbackUrl: '' })
    // console.log(result, 'SOY EL RESULTADO')
    // console.log(session, 'SOY EL SESSION')
    if (result?.error) { setLoginError(true) }
    // router.push('/inventory')
  }

  useEffect(() => {
    if (session !== null && session !== undefined) {
      // console.log(session, 'session del useEffect')
      if (session.user.role === 'admin') router.push('/dashboard')
      if (session.user.role === 'restock') router.push('/restock')
    }
  }, [session])

  return (

    <div className="flex flex-col justify-center p-10 md:flex-row bg-[url('/img/bg-new.svg')] bg-cover bg-center bg-no-repeat h-screen">
      <div className=' md:rounded-t-none md:w-1/2 bg-transparent flex justify-center   md:p-0 md:items-center '>
        <div className=' flex flex-col bg-d-soft-white  rounded-3xl gap-4 p-16'>
          <div className='flex justify-center'>
            <img src='/img/logo.svg' className='mb-16 w-full ' />
          </div>
          <div className='form-control w-full '>
            <label className='label font-bold text-sm'>
              <span className='label-text'>EMAIL</span>

            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='EJ: nombre@correo.com' className='input input-bordered w-72 bg-d-white rounded-2xl text-d-dark-dark-purple' />
            <label className='label' />
          </div>
          <div className='form-control w-full '>
            <label className='label font-bold'>
              <span className='label-text'>PASSWORD</span>

            </label>
            <div className='join'>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder='122344842-K' className='input input-bordered w-full bg-d-white rounded-l-2xl join-item text-d-dark-dark-purple' />
              <div className='rounded-2xl join-item'>
                <button className='btn join-item bg-d-dark-dark-purple border-none text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={() => setShowPassword(!showPassword)}>
                  {!showPassword &&
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                    </svg>}
                  {showPassword &&
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395' />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774' />
                      <path strokeLinecap='round' strokeLinejoin='round' d='M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                    </svg>}
                </button>
              </div>
            </div>

            <label className='label' />
          </div>
          {loginError &&
            <div className='text-error my-4'>Email o contraseña incorrecta</div>}
          <div className='flex justify-center'>
            <button disabled={email === '' || password === ''} onClick={() => performLogin()} className='btn w-44 border-none mt-4 rounded-full bg-d-dark-dark-purple text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple disabled:text-d-white'>INGRESAR</button>
          </div>
        </div>
      </div>

    </div>

  )
}
