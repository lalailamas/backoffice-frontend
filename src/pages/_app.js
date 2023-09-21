import '../styles/globals.css'
import { UserProvider } from '@/hooks/userContext'

export default function Despnsa24 ({ Component, pageProps }) {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page)

  return getLayout(
    <>
      <UserProvider>
        <Component {...pageProps} />
      </UserProvider>
    </>

  )
}
