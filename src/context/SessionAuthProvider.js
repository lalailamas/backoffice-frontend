'use client'
const { SessionProvider } = require('next-auth/react')

const SessionAuthProvider = ({ children }) => {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  )
}

export default SessionAuthProvider
