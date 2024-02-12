'use client'
import React, { useEffect, useState } from 'react'
import { fetchVersion } from '@/api/tagVersion'

function VersionTag () {
  const [version, setVersion] = useState('')
  useEffect(() => {
    handleVersion()
  }, [])

  const handleVersion = async () => {
    const response = await fetchVersion()
    const latestVersion = response.values[0].name
    console.log(latestVersion, 'respuesta')
    setVersion(latestVersion)
  }
  return (
    <>
      <h1>Versión {version} </h1>
    </>
  )
}

export default VersionTag
