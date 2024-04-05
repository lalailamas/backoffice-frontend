import { loginUser } from '@/api/user'
import NextAuth from 'next-auth'
import CognitoProvider from 'next-auth/providers/cognito'

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.COGNITO_CLIENT_ID,
      issuer: process.env.COGNITO_DOMAIN,
      idToken: true,
      name: 'Cognito',
      checks: 'nonce'
    })
  ],
  callbacks: {
    async jwt ({ token, user, account, profile }) {
      console.log('Iniciando callback JWT con los datos del usuario y la cuenta...')
      if (account && user) {
        if (account.provider === 'cognito') {
          console.log('Procesando datos de usuario autenticado con Cognito...')

          // Se actualiza el token con la información de Cognito
          token.accessToken = account?.access_token
          const tokenParsed = JSON.parse(Buffer.from(account.id_token.split('.')[1], 'base64').toString())
          token.username = tokenParsed['cognito:username']
          token.refreshToken = account?.refresh_token
          token.accessTokenExpires = account.expires_at * 1000

          console.log(`Datos del usuario Cognito procesados: username=${token.username}`)

          // Llamada a loginUser para obtener y guardar el nombre y el rol del usuario
          try {
            console.log('Llamando a loginUser para obtener datos adicionales del usuario...')
            const userData = await loginUser({ username: token.username })
            if (userData) {
              console.log('Datos del usuario obtenidos de loginUser', userData)
              token.name = userData.name // Asumiendo que loginUser devuelve un objeto con el nombre y el rol
              token.role = userData.role
            }
          } catch (error) {
            console.error('Error al obtener los datos del usuario con loginUser:', error)
          }
        }
      }
      // Return previous token if the access token has not expired yet
      if ((Date.now()) < (token.accessTokenExpires ?? 0)) {
        console.log('Token todavía válido, retornando token existente...')
        return token
      }
      console.log('Token expirado, intentando actualizar...')

      // Access token has expired, try to update it
      return refreshAccessToken(token)
    },
    async session ({ session, token }) {
      console.log('Iniciando callback de sesión...')
      session.accessToken = token.accessToken
      session.username = token.username
      session.refreshToken = token.refreshToken
      session.accessTokenExpires = token.accessTokenExpires
      console.log('Sesión actualizada con los datos del usuario:', session.user)
      return session
    }
  },
  pages: {
    signIn: '/',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  debug: process.env.NODE_ENV === 'development'
}

async function refreshAccessToken (token) {
  try {
    const refreshedTokensResponse = await fetch('https://cognito-idp.us-west-2.amazonaws.com', {
      headers: {
        'X-Amz-Target': 'AWSCognitoIdentityProviderService.InitiateAuth',
        'Content-Type': 'application/x-amz-json-1.1'
      },
      method: 'POST',
      body: JSON.stringify({
        AuthFlow: 'REFRESH_TOKEN_AUTH',
        ClientId: process.env.COGNITO_CLIENT_ID,
        AuthParameters: {
          REFRESH_TOKEN: token.refreshToken,
          SECRET_HASH: process.env.COGNITO_CLIENT_SECRET
        }
      })
    })

    const refreshedTokens = await refreshedTokensResponse.json()

    if (!refreshedTokensResponse.ok) {
      throw refreshedTokens
    }

    return {
      ...token,
      accessToken: refreshedTokens.AuthenticationResult.AccessToken,
      accessTokenExpires: Date.now() + refreshedTokens.AuthenticationResult.ExpiresIn * 1000,
      refreshToken: refreshedTokens.AuthenticationResult.RefreshToken ?? token.refreshToken
    }
  } catch (error) {
    console.error('Error refreshing access token: ', error)
    return {
      ...token,
      error: 'RefreshAccessTokenError'
    }
  }
}

export default NextAuth(authOptions)
