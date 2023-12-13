'use client'

import { swallError } from '../sweetAlerts'
import * as Sentry from '@sentry/nextjs'
import { withScope } from '@sentry/nextjs'

export const errorHandler = (error, data) => {
  withScope((scope) => {
    // Agrega información adicional al contexto de Sentry
    if (data) {
      // const serializedData = JSON.stringify(data)
      scope.setExtras(data)
    }

    if (error instanceof ValidationError) {
      swallError(error.message, false)
    } else if (error instanceof ConnectionError) {
      swallError(error.message, false)
    } else if (error.response && error.response.status === 403) {
      // Captura la excepción en Sentry con el contexto adicional
      Sentry.captureException(error)
      swallError('La transacción ya fue validada', false)
    } else if (error.response && error.response.status === 400) {
      // Captura la excepción en Sentry con el contexto adicional
      Sentry.captureException(error)
      swallError('Solicitud incorrecta', false)
    } else if (error.response && error.response.status === 500) {
      // Captura la excepción en Sentry con el contexto adicional
      Sentry.captureException(error)
      swallError('Error en el servidor', false)
    } else if (error.response && error.response.status === 422) {
      // Captura la excepción en Sentry con el contexto adicional
      Sentry.captureException(error)
      swallError('La solicitud no se pudo procesar', false)
    } else {
      // Captura la excepción en Sentry con el contexto adicional
      Sentry.captureException(error)
      swallError(`Ocurrió un error, lo sentimos mucho ${error}`, false)
    }
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
