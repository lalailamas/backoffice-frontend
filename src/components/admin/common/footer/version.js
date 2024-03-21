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

    // Obtener la versión más reciente mediante reduce
    const latestVersion = response.values.reduce((latest, current) => {
      // Convertir las fechas de creación a objetos Date para compararlas
      const latestDate = new Date(latest && latest.target.date)
      const currentDate = new Date(current.target.date)

      // Comprobar si la versión actual tiene una fecha de creación más reciente que la última registrada
      if (!latest || currentDate > latestDate) {
        return current
      } else {
        return latest
      }
    }, null)

    // Si se encontró la última versión, establecerla
    if (latestVersion) {
      const latestVersionName = latestVersion.name
      // console.log(latestVersionName, 'respuesta')
      setVersion(latestVersionName)
    } else {
      // console.log('No se encontraron versiones')
    }
  }

  return (
    <>
      <h1 className='text-sm'>Versión {version} </h1>
    </>
  )
}

export default VersionTag
