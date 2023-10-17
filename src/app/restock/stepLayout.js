'use client'
import React from 'react'
import { usePathname } from 'next/navigation'

function StepLayout () {
  const pathname = usePathname()

  return (
    <div>
      <div className=''>
        <h2 className='text-d-dark-dark-purple text-2xl font-bold'>Restock</h2>
      </div>
      <ul className='steps p-8'>
        <li className={`step ${pathname === '/restock' ? 'step-primary' : ''}`}>Elige la tienda</li>
        <li className={`step ${pathname === '/restock/stepTwo' ? 'step-primary' : ''}`}>Confirma inventario</li>
        <li className={`step ${pathname === '/restock/stepThree' ? 'step-primary' : ''}`}>Agrega o quita productos</li>
        <li className={`step ${pathname === '/restock/stepFour' ? 'step-primary' : ''}`}>Revisión final</li>
      </ul>
    </div>
  )
}

export default StepLayout
