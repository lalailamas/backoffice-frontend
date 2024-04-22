import { loginUser } from '../api/user'
import { refreshAccessToken } from './refreshAccessToken'

import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Username', type: 'email', placeholder: 'jsmith' },
        password: { label: 'Password', type: 'password' }

      },
      authorize: async (credentials) => {
        try {
          const response = await loginUser(credentials) // loginUser debe comunicarse con Cognito

          if (response && response.cognitoUser) {
            const { cognitoUser } = response
            const user = {
              ...response.appUser,
              accessToken: cognitoUser.AuthenticationResult.AccessToken,
              refreshToken: cognitoUser.AuthenticationResult.RefreshToken,
              accessTokenExpires: Date.now() + cognitoUser.AuthenticationResult.ExpiresIn * 1000 // Asumiendo que ExpiresIn está en segundos
            }
            // console.log(user, 'user dentro de authorize')

            return user
          } else {
            return null
          }
        } catch (error) {
          console.error('Error de autenticación:', error)
          return null
        }
      }
    })
  ],

  // secret: 'TuClaveSecretaAqui',
  callbacks: {
    async jwt ({ token, user, account }) {
      if (user) {
        token = user
      } else if (token.accessTokenExpires - 10000 < Date.now()) {
      // Aquí asumimos que quieres verificar la expiración un poco antes de que realmente expire
        try {
          console.log('Renovando accessToken y refreshToken')
          const refreshedTokens = await refreshAccessToken(token.refreshToken)

          if (refreshedTokens.accessToken) {
            token.accessToken = refreshedTokens.accessToken
            token.accessTokenExpires = Date.now() + refreshedTokens.expiresIn * 1000
            token.refreshToken = refreshedTokens.refreshToken ?? token.refreshToken // Actualiza si es nuevo, sino mantiene el anterior
          } else {
            throw new Error('Error al renovar el accessToken y/o refreshToken')
          }
        } catch (error) {
          console.error('Error al renovar el accessToken y/o refreshToken:', error)
          token.error = 'Session expired'
          return token // Retorna el token modificado con un error marcado
        }
      }

      // Siempre devuelve el token ya sea actualizado o no
      return token
    },
    async session ({ session, token, user }) {
      // Personaliza los datos que se almacenan en la sesión
      session.user.name = token.fullname || `${token.first_name} ${token.first_lastname}`
      session.user.email = token.email // Ya parece estar correctamente asignado
      session.user.role = token.role
      session.user.id = token.id

      session.user.accessToken = token.accessToken
      session.user.refreshToken = token.refreshToken
      session.user.accessTokenExpires = token.accessTokenExpires
      return session
    }
  },
  pages: {
    signIn: '/',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  }
  // debug: true
}
