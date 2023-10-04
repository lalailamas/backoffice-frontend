'use client'
import React, { useState } from 'react'
import InsideLayout from '@/components/admin/layouts/inside'
import DatePicker from '@/components/admin/common/datepicker/double'
import useGetStores2 from '@/hooks/useStores2'

function Marketing () {
  const { stores, error } = useGetStores2()
  const [selectedStores, setSelectedStores] = useState([])

  if (error) {
    return <div>Error: {error.message}</div>
  }

  const handleStoreChange = async (id) => {
    setSelectedStores([])
    const response = await useGetStores2(id)
    setSelectedStores(response.data)
  }

  //   // Renderiza checkboxes para cada tienda
  //   const storeCheckboxes = stores
  //     ? stores.map((store) => (
  //       <label key={store.id}>
  //         <input
  //           type='checkbox'
  //           value={store.id}
  //           checked={selectedStores.includes(store.id)}
  //           onChange={() => handleStoreChange(store.id)}
  //         />
  //         {store.name}
  //       </label>
  //     ))
  //     : null

  // Ahora puedes usar el array selectedStores para realizar acciones basadas en las tiendas seleccionadas
  return (
    <div>
      <InsideLayout />
      <h2 className='text-d-dark-dark-purple text-2xl font-bold text-center pt-5'>Dashboard Marketing</h2>
      <div className='flex flex-ro p-4'>

        <select
          onChange={(e) => handleStoreChange(e.target.value)}
          className='select select-sm select-bordered rounded-full w-full md:max-w-xs'
        >
          {stores && stores.map((store) => (
            <option key={store.id} value={store.id}>
              {store.name}
            </option>
          ))}
        </select>

        <DatePicker />
      </div>

    </div>
  )
}

export default Marketing
