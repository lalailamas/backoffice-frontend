import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export default async function middleware (req, res, next) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })
  // console.log(session, 'SESSION DEL MIDDLEWARE')
  if (!session) {
    const requestedPage = req.nextUrl.pathname
    const url = req.nextUrl.clone()
    url.pathname = '/'
    url.search = `p=${requestedPage}`

    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = { matcher: ['/inventory', '/tasks', '/users', '/replacements', '/replenishment_orders', '/restock', '/stock', '/stock_request', '/home'] }
