'use client'

import { datadogLogs } from '@datadog/browser-logs'
import { useEffect } from 'react'

export default function InitDataDog () {
  useEffect(() => {
    const initDD = () => {
      datadogLogs.init({
        clientToken: process.env.DATADOG_CLIENT_TOKEN || 'pub9d5f9180ea92fe995dfc400744ee6979',
        env: process.env.NODE_ENV || 'development',
        site: 'datadoghq.com',
        forwardConsoleLogs: ['error', 'info'],
        forwardErrorsToLogs: true,
        sessionSampleRate: 100,
        service: 'frontend_admin' + `_${process.env.NODE_ENV || 'development'}`
      })
    }
    initDD()
  }, [])
  return <></>
}
