'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

function LayoutEdit () {
  const router = useRouter()
  const { id } = router.query

  console.log(id, 'id en layout edit')

  return (
    <>
      <h1>Probando..</h1>
    </>
  )
}

export default LayoutEdit
