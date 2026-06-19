import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const protectedRoutes = ["/shopping", "/favorites"]

export async function middleware(req:NextRequest){
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET});
     console.log("===== PROXY =====");
    console.log("TOKEN:", token);
    console.log("SECRET:", process.env.NEXTAUTH_SECRET);
    console.log("PATHNAME:", req.nextUrl.pathname);
    console.log("=================");
    const {pathname} = req.nextUrl

    // protege la ruta y todas sus subrutas
if(protectedRoutes.some(route => pathname.startsWith(route))){
        if(!token){
            return NextResponse.redirect(new URL("/login", req.url));
        }
    }
    return NextResponse.next()
}

export const config = {
    matcher: [ "/shopping/:path*", "/favorites/:path*"]
}