import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export default async function middleware (request) {
  const session = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  const redirectTo = (path) => {
    const url = request.nextUrl.clone()
    url.pathname = path
    return NextResponse.redirect(url)
  }

  if (!session) {
    return redirectTo('/')
  }

  const adminRequiredPages = [
    '/categories',
    '/clients',
    '/dashboard',
    '/inventory',
    '/layout',
    '/layout_dream',
    '/marketing',
    '/purchase_register',
    '/replacements',
    '/shop_list',
    '/stock_adjustment',
    '/stores',
    '/users'
  ]

  const isAdminPage = adminRequiredPages.some((page) => request.nextUrl.pathname.startsWith(page))

  if (isAdminPage && session.role !== 'admin') {
    return redirectTo('/restock')
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/categories/:path*',
    '/clients/:path*',
    '/dashboard/:path*',
    '/inventory/:path*',
    '/layout/:path*',
    '/layout_dream/:path*',
    '/marketing/:path*',
    '/purchase_register/:path*',
    '/replacements/:path*',
    '/replenishment_orders/:path*',
    '/restock/:path*',
    '/restock_copy/:path*',
    '/shop_list/:path*',
    '/stock_adjustment/:path*',
    '/stock_overview/:path*',
    '/stock_request/:path*',
    '/stores/:path*',
    '/strap/:path*',
    '/users/:path*'
  ]
}
