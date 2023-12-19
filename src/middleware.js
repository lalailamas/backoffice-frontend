import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export default async function middleware (req, res, next) {
  // console.log(req.nextUrl.pathname, 'req.nextUrl.pathname')
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET })

  const redirectTo = (path) => {
    const url = req.nextUrl.clone()
    url.pathname = path
    return NextResponse.redirect(url)
  }

  if (!session) {
    return redirectTo('/')
  }

  const adminRequiredPages = [
    '/inventory',
    '/tasks',
    '/users',
    '/dashboard',
    '/marketing',
    '/replenishment_orders',
    '/replacements',
    '/users/**'
  ]
  const isAdminPage = adminRequiredPages.some((page) => req.nextUrl.pathname.startsWith(page))

  if (isAdminPage && session.role !== 'admin') {
    return redirectTo('/restock')
  }

  return NextResponse.next()
}

export const config = { matcher: ['/inventory', '/tasks', '/users', '/replacements', '/replenishment_orders', '/restock', '/stock', '/stock_request', '/dashboard', '/marketing'] }
