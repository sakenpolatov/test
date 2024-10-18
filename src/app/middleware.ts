import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const protectedPaths = ['/map', '/info']

export async function middleware(req: NextRequest) {
	const token = await getToken({ req, secret: process.env.AUTH_SECRET })

	const { pathname } = req.nextUrl

	if (!token && protectedPaths.includes(pathname)) {
		return NextResponse.redirect(new URL('/signin', req.url))
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/map', '/info']
}
