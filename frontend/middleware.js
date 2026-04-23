import { NextResponse } from 'next/server'

export function middleware(request) {
  // Check if user is authenticated
  const authCookie = request.cookies.get('thesis-auth')
  
  // Allow access to login page
  if (request.nextUrl.pathname === '/login') {
    return NextResponse.next()
  }
  
  // Redirect to login if not authenticated
  if (!authCookie || authCookie.value !== process.env.NEXT_PUBLIC_AUTH_TOKEN) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|login).*)'],
}
