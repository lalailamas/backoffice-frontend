'use client'
import VersionTag from './version'

export default function Footer () {
  return (
    <>
      <footer className=' bg-d-soft-soft-purple text-d-dark-dark-purple'>

        <div className='flex justify-between w-full pt-2'>
          <div className='flex-col justify-top p-5 ml-5 text-sm'>
            <label htmlFor='footerTextInput' />
            <div className='flex gap-2 items-center font-bold'>

              <h2>&copy;{new Date().getFullYear()}</h2>
              <div className='p-1 bg-white rounded-full'>
                <img src='/img/d.svg' className='w-3 h-auto' />

              </div>
              <h2> Despnsa247 </h2>
            </div>
            <h2 className='text-xs'>Todos los derechos reservados</h2>
          </div>
          <div className='flex flex-row items-center justify-end p-2 mr-2'>
            <img src='/img/emoji.gif' alt='Emoji' className='bg-white rounded-full p-1 m-3 w-10 h-10 mr-2' />
            <VersionTag />

          </div>
        </div>

      </footer>

    </>
  )
}
