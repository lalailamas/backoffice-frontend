'use client'
import useGetStores2 from '@/hooks/useStores2'
import React, { useState } from 'react'
import Link from 'next/link'
import { SearchField } from '@/components/admin/common/search'
import MainTitle from '@/components/admin/common/titles/MainTitle'

function Stores () {
  const { stores } = useGetStores2(false)

  const [searchTerm, setSearchTerm] = useState('')

  const filteredStores = stores
    ? stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }
  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <section className='w-full p-6 rounded-lg max-w-2xl'>
          <MainTitle>Tiendas</MainTitle>
          <div className='p-6'>
            <SearchField
              placeholder='Busca una tienda...'
              onChange={handleSearchChange}
            />
          </div>
          <section className='py-4  flex flex-col gap-2'>
            {stores && filteredStores.map((store) => (
              <Link href={`/stores/detail?storeId=${store.storeId}&layoutId=${store.layoutId}&storeName=${store.name}`} key={store.storeId}>
                <div className='flex items-center  p-4 cursor-pointer  shadow-md hover:shadow-lg '>

                  <span
                    className='w-8 h-8 shrink-0 mr-4 rounded-full bg-green-50 flex items-center justify-center'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth='1.5' stroke='currentColor' className='w-6 h-6 animate-ping'>
                      <path strokeLinecap='round' strokeLinejoin='round' d='M9.348 14.652a3.75 3.75 0 0 1 0-5.304m5.304 0a3.75 3.75 0 0 1 0 5.304m-7.425 2.121a6.75 6.75 0 0 1 0-9.546m9.546 0a6.75 6.75 0 0 1 0 9.546M5.106 18.894c-3.808-3.807-3.808-9.98 0-13.788m13.788 0c3.808 3.807 3.808 9.98 0 13.788M12 12h.008v.008H12V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z' />
                    </svg>
                  </span>
                  <div className='space-y-3 flex-1'>
                    <div className='flex items-center'>
                      <h4
                        className='font-medium text-sm mr-auto text-gray-700 flex items-center'
                      >
                        {store.name}
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='ml-2 shrink-0 w-5 h-5 text-gray-500'
                          width='24'
                          height='24'
                          viewBox='0 0 24 24'
                          strokeWidth='2'
                          stroke='currentColor'
                          fill='none'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        >
                          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
                          <path d='M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0' />
                          <path d='M12 9h.01' />
                          <path d='M11 12h1v4h1' />
                        </svg>
                      </h4>
                      <span className='px-2 py-1 rounded-lg bg-red-50 text-red-500 text-xs'>
                        10 / 10
                      </span>
                    </div>
                    <div className='overflow-hidden bg-blue-50 h-3.5 rounded-full w-full'>
                      <span
                        className='h-full bg-green-500 w-full block rounded-full relative'
                        style={{ width: '80%' }}
                      >
                        <span className='absolute inset-0 flex items-center justify-center text-white font-bold'>
                          80%
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </section>
        </section>
      </div>
    </>
  )
}

export default Stores
