// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
    const token = req.cookies.get("token")?.value;

    const protectedPaths = ["/user-account", "/add-recipe", "/update-recipe"];

    const pathname = req.nextUrl.pathname;

    const isProtected = protectedPaths.some(path =>
        pathname.startsWith(path)
    );
    
    if (!token && isProtected) {
        return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
}