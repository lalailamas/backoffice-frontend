'use client'
import React, { useState } from 'react'
import { SearchField } from '@/components/admin/common/search'
import MainTitle from '@/components/admin/common/titles/MainTitle'
import useGetStores2 from '@/hooks/useStores2'
import { useRouter } from 'next/navigation'
import ButtonPrimary from '@/components/admin/common/buttons/ButtonPrimary'

const NewScreen = () => {
  const { stores } = useGetStores2(false)
  const [searchTerm, setSearchTerm] = useState('')
  const router = useRouter()

  const filteredStores = stores
    ? stores.filter(store =>
      store.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    : []

  const handleSearchChange = (value) => {
    setSearchTerm(value)
  }
  const handleViewLayout = (storeId) => {
    // console.log(storeId, 'storeId desde newScreen')
    router.push(`/layout_dream/layout_store?id=${storeId}`)
  }

  return (
    <>
      <div className='flex items-center justify-center min-h-screen'>
        <section className='w-full p-6 rounded-lg max-w-2xl'>
          <MainTitle>Transición de Layout</MainTitle>
          <div className='px-4 flex justify-center'>
            <SearchField
              placeholder='Busca una tienda...'
              onChange={handleSearchChange}
            />
          </div>
          <div className='py-4  flex flex-col gap-2'>
            {stores && filteredStores.map((store) => (
              <div key={store.storeId}>
                <div className='flex items-center  p-4 cursor-pointer  shadow-md hover:shadow-lg '>

                  <div className='space-y-3 flex-1'>
                    <div className='flex items-center'>
                      <img src='img/vending-machine.png' className='w-8 h-auto m-2' />
                      <h4
                        className='font-medium text-sm mr-auto text-gray-700 flex items-center'
                      >
                        {store.name}

                      </h4>
                      <ButtonPrimary text='Ver layout actual' onClick={() => handleViewLayout(store.storeId)} />
                    </div>

                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  )
}

export default NewScreen
