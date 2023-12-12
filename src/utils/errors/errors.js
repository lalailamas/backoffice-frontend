'use client'
import { useRouter } from 'next/navigation'
import { swallError } from '../sweetAlerts'
import * as Sentry from '@sentry/nextjs'

export const errorHandler = (error, route, data) => {
  withScope((scope) => {
    // Agrega información adicional al contexto de Sentry
    scope.setContext('Stock Data', data)

    if (error instanceof ValidationError) {
      swallError(error.message, false)
    } else if (error instanceof ConnectionError) {
      swallError(error.message, false)
    } else if (error.response && error.response.status === 403) {
      swallError('La transacción ya fue validada', false)
      useRouter.push(route)
    } else if (error.response && error.response.status === 400) {
      swallError('Solicitud incorrecta', false)
    } else if (error.response && error.response.status === 500) {
      swallError('Error en el servidor', false)
    } else {
      swallError('Error desconocido', false)
    }

    // Captura la excepción en Sentry con el contexto adicional
    Sentry.captureException(error)
  })
}

const createErrorFactory = function (name) {
  return class customError extends Error {
    constructor (message) {
      super(message)
      this.name = name
    }
  }
}
export const ConnectionError = createErrorFactory('ConnectionError')
export const ValidationError = createErrorFactory('ValidationError')
