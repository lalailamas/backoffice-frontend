import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'
import React from 'react'

function Links () {
  return (
    <div className="md:hidden flex flex-col justify-center p-10  bg-[url('/img/bg-new.svg')] bg-cover bg-center bg-no-repeat h-screen text-white">
      <div className=' flex flex-col bg-d-soft-white rounded-3xl gap-4 p-8'>
        <div className='flex justify-center'>
          <img src='/img/logo.svg' className='mb-5 w-full ' />
        </div>

        <div className='flex flex-col gap-4'>
          <ButtonPrimary text='Catálogo de la tienda escaneada' />
          <ButtonPrimary text='Cómo funciona Despnsa (FAQ)' />
          <ButtonPrimary text='Quiero sugerir un producto' />
          <ButtonPrimary text='Ayuda' />
          <ButtonPrimary text='Puedo proponer un lugar para una Despnsa?' />
        </div>
        <div className='flex justify-center mt-8'>
          <ul className='flex gap-4'>
            <li>
              <a href='#' className='text-white'>
                <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                  <path fillRule='evenodd' d='M13.1 6H15V3h-1.9A4.1 4.1 0 0 0 9 7.1V9H7v3h2v10h3V12h2l.6-3H12V6.6a.6.6 0 0 1 .6-.6h.5Z' clipRule='evenodd' />
                </svg>

              </a>
            </li>
            <li>
              <a href='#' className='text-white'>
                <svg className='w-6 h-6 text-gray-800 dark:text-white' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 24 24'>
                  <path fillRule='evenodd' d='M22 5.9c-.7.3-1.5.5-2.4.6a4 4 0 0 0 1.8-2.2c-.8.5-1.6.8-2.6 1a4.1 4.1 0 0 0-6.7 1.2 4 4 0 0 0-.2 2.5 11.7 11.7 0 0 1-8.5-4.3 4 4 0 0 0 1.3 5.4c-.7 0-1.3-.2-1.9-.5a4 4 0 0 0 3.3 4 4.2 4.2 0 0 1-1.9.1 4.1 4.1 0 0 0 3.9 2.8c-1.8 1.3-4 2-6.1 1.7a11.7 11.7 0 0 0 10.7 1A11.5 11.5 0 0 0 20 8.5V8a10 10 0 0 0 2-2.1Z' clipRule='evenodd' />
                </svg>

              </a>
            </li>
            <li>
              <a href='#' className='text-white'>
                <svg className='w-6 h-6 text-gray-800 dark:text-white' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                  <path fillRule='evenodd' clipRule='evenodd' d='M2 6C2 3.79086 3.79086 2 6 2H18C20.2091 2 22 3.79086 22 6V18C22 20.2091 20.2091 22 18 22H6C3.79086 22 2 20.2091 2 18V6ZM6 4C4.89543 4 4 4.89543 4 6V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V6C20 4.89543 19.1046 4 18 4H6ZM12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9ZM7 12C7 9.23858 9.23858 7 12 7C14.7614 7 17 9.23858 17 12C17 14.7614 14.7614 17 12 17C9.23858 17 7 14.7614 7 12ZM17.5 8C18.3284 8 19 7.32843 19 6.5C19 5.67157 18.3284 5 17.5 5C16.6716 5 16 5.67157 16 6.5C16 7.32843 16.6716 8 17.5 8Z' fill='#000000' />
                </svg>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default Links
