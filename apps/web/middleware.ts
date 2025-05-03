import { auth } from '@/auth';
import { NextResponse, NextRequest } from 'next/server';

const protectedRoutes = 'admin';

export async function middleware(req: NextRequest) {
    const { nextUrl } = req;
    const session = await auth();
    if(!session && protectedRoutes.includes(nextUrl.pathname)) {
        return NextResponse.redirect(new URL('/sign-in', nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    runtime: "nodejs",
};