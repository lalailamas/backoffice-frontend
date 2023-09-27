import { loginUser } from '../api/user'

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
        // console.log(credentials)
        try {
          const response = await loginUser(credentials)
          // console.log(response.data, 'este es el response')
          // const data = await response.json();

          // console.log(data);

          if (response.data && response.data.appUser) {
            // Obtén el rol real del usuario desde la respuesta
            const user = response.data.appUser
            console.log(user, 'user dentro de authorize')

            // Agrega el rol a la respuesta
            credentials.role = user.role
            credentials.fullname = user.fullname
            credentials.callbackUrl = 'http://localhost:3000/'
            console.log(credentials, 'credentials dentro de authorize')

            return Promise.resolve(credentials)
          } else {
            // Si la autenticación falla, devuelve null
            return Promise.resolve(null)
          }
        } catch (error) {
          console.error('Error de autenticación:', error)
          return Promise.resolve(null)
        }
      }
    })
  ],

  secret: 'TuClaveSecretaAqui',
  callbacks: {
    // async signIn (user, account, profile) {
    // // Determina la URL de inicio de sesión basada en el rol del usuario
    //   console.log(user, 'user dentro de signIn')

    //   user.role = 'valor personalizado' // Puedes personalizar este valor

    //   // Retorna la respuesta modificada
    //   return user
    // },
    async jwt ({ token, user }) {
      if (user) {
        // console.log(user, 'user dentro de jwt')
        token.role = user.role
        token.sub = user.role
        token.username = user.fullname
        token.id = user.id
        // console.log('token ===========');
        // console.log(token);
      }
      return token
    },
    async session ({ session, token }) {
      // Personaliza los datos que se almacenan en la sesión
      // console.log(token, 'token dentro de session')
      session.user = {
        id: token.id,
        email: token.email,
        username: token.username,
        role: token.role
        // Agrega otros datos según tus necesidades
      }
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
  session: {
    // Configuración de la sesión, incluido el tiempo de expiración
    maxAge: 30 * 24 * 60 * 60 // 30 días en segundos
  }
}
