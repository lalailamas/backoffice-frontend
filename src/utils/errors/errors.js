'use client'
import { datadogLogs } from '@datadog/browser-logs'
import { swallError } from '../sweetAlerts'

export const errorHandler = (error, data) => {
  datadogLogs.logger.error('Error captured', {
    error: error.message,
    stack: error.stack,
    data,
    statusCode: error.response ? error.response.status : 'No HTTP response'
  })
  if (error instanceof ValidationError) {
    swallError(error.message, false)
  } else if (error instanceof ConnectionError) {
    swallError(error.message, false)
  } else if (error.response) {
    switch (error.response.status) {
      case 403:
        swallError('La transacción ya fue validada', false)
        break
      case 400:
        swallError('Solicitud incorrecta', false)
        break
      case 500:
        swallError('Error en el servidor', false)
        break
      case 422:
        swallError('La solicitud no se pudo procesar', false)
        break
      case 404:
        swallError('No se encontró la solicitud', false)
        break
      case 401:
        swallError('Solicitud no autorizada', false)
        break
      default:
        swallError(`Ocurrió un error, lo sentimos mucho ${error.message}`, false)
        break
    }
  } else {
    swallError(`Ocurrió un error inesperado: ${error.message}`, false)
  }
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
