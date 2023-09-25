'use client'
/* eslint-disable camelcase */
// import Image from 'next/image'
// import { Inter } from 'next/font/google'
import { useEffect, useState } from 'react'
import { loginUser } from '@/api/user'
import S from '@/lib/storage'
import { useRouter } from 'next/navigation'
import { useUser } from '@/hooks/userContext'

// const inter = Inter({ subsets: ['latin'] })

export default function Home () {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()

  const performLogin = () => {
    setLoginError(false)
    loginUser({ email, password })
      .then((response) => {
        const now = Math.round(Date.now() / 1000)
        S.set('user', { ...response.data.AuthenticationResult, loggedAt: now })
        router.push('/home')
      }
      ).catch((error) => {
        if (error.response && (error.response.status === 401 || error.response.status === 422)) {
          setLoginError(true)
        }
      // console.log();
      // console.log(error.message)
      }
      )
  }

  useEffect(
    () => {
      S.delete('user')
    },
    []

  )

  return (

    <div className='flex flex-col md:flex-row w-full h-screen  bg-d-dark-dark-purple login-background'>
      <div className='w-full h-36 md:h-auto md:w-1/2' />
      <div className='w-full rounded-t-3xl md:rounded-t-none md:w-1/2 h-screen bg-d-white flex justify-center pt-16 md:p-0 md:items-center'>
        <div className=' flex flex-col'>
          <img src='/img/logo.svg' className='w-2/3 mx-auto md:w-full ' />
          <h2 className='font-albert-sans font-extrabold text-center my-4 text-2xl text-d-title-purple '>Inventory manager</h2>
          <div className='form-control w-full'>
            <label className='label'>
              <span className='label-text'>Email</span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type='text' placeholder='Email' className='input input-bordered w-full bg-d-white rounded-full text-d-dark-dark-purple' />
            <label className='label'>
              {/* <span className="label-text-alt">Bottom Left label</span> */}
              {/* <span className="label-text-alt">Bottom Right label</span> */}
            </label>
          </div>
          <div className='form-control w-full '>
            <label className='label'>
              <span className='label-text'>Password</span>
              {/* <span className="label-text-alt">Top Right label</span> */}
            </label>
            <div className='join'>
              <input value={password} onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder='Password' className='input input-bordered w-full bg-d-white rounded-l-full JOIN-ITEM  text-d-dark-dark-purple' />
              <button className='btn join-item rounded-r-full bg-d-dark-dark-purple border-none text-d-white  hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple' onClick={() => setShowPassword(!showPassword)}>
                {!showPassword &&
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z' />
                    <path strokeLinecap='round' strokeLinejoin='round' d='M15 12a3 3 0 11-6 0 3 3 0 016 0z' />
                  </svg>}
                {showPassword &&
                  <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={1.5} stroke='currentColor' className='w-6 h-6'>
                    <path strokeLinecap='round' strokeLinejoin='round' d='M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88' />
                  </svg>}

              </button>
            </div>
            <label className='label'>
              {/* <span className="label-text-alt">Bottom Left label</span> */}
              {/* <span className="label-text-alt">Bottom Right label</span> */}
            </label>
          </div>
          {loginError &&
            <div className='text-error my-4'>Email o contraseña incorrecta</div>}
          <button disabled={email === '' || password === ''} onClick={() => performLogin()} className='btn border-none mt-4 rounded-2xl bg-d-dark-dark-purple text-d-white hover:bg-d-soft-soft-purple hover:text-d-dark-dark-purple disabled:text-d-white'>Login</button>

        </div>
      </div>
    </div>

  )
}
