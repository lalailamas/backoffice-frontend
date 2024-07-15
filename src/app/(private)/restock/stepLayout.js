'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import MainTitle from '@/components/admin/common/titles/MainTitle'

function StepLayout ({ showStepIntermediate }) {
  const pathname = usePathname()

  return (
    <>
      <MainTitle>Restock</MainTitle>
      <ul className='steps p-8 text-xs'>
        <li className={`step ${pathname === '/restock' ? 'step-primary' : ''}`}>Elige la tienda</li>
        <li className={`step ${pathname === '/restock/stepTwo' ? 'step-primary' : ''}`}>Confirma inventario</li>
        {showStepIntermediate && (
          <li className={`step ${pathname === '/restock/stepIntermediate' ? 'step-primary' : ''}`}>Transición Layout</li>
        )}
        <li className={`step ${pathname === '/restock/stepThree' ? 'step-primary' : ''}`}>Agrega o quita productos</li>
        <li className={`step ${pathname === '/restock/stepFour' ? 'step-primary' : ''}`}>Revisión final</li>
      </ul>
    </>
  )
}

export default StepLayout
