'use client'

import React from 'react'
import MyComponent from './index'
import { useSession } from 'next-auth/react'

function page () {
  const { data: session } = useSession()

  return (
    <div>
      <MyComponent session={session} />

    </div>
  )
}

export default page
