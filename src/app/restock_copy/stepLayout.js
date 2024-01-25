'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

function StepLayout () {
  const pathname = usePathname()

  return (
    <div className=''>
      <div className=''>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Restock</h2>
      </div>
      <ul className='steps p-8 text-xs'>
        <li className={`step ${pathname === '/restock_copy' ? 'step-primary' : ''}`}>Elige la tienda</li>
        <li className={`step ${pathname === '/restock_copy/stepTwo' ? 'step-primary' : ''}`}>Confirma inventario</li>
        <li className={`step ${pathname === '/restock_copy/stepThree' ? 'step-primary' : ''}`}>Agrega o quita productos</li>
        <li className={`step ${pathname === '/restock_copy/stepFour' ? 'step-primary' : ''}`}>Revisión final</li>
      </ul>
    </div>
  )
}

export default StepLayout
