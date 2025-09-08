import { type NextRequest, NextResponse } from "next/server"
import { regions } from "./region"
import { retrieveCustomer } from "@lib/action/customer"

const REGION_CACHE_TTL = 1000 * 60 * 60 * 24 // 24 hours in mimisecngs
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30 // 30 Days in seconds

interface RegionCache {
    regionMap: Set<string>
    lastUpdated: number
}

// Cache for region data
const regionCache: RegionCache = {
    regionMap: new Set<string>(),
    lastUpdated: 0,
}

export async function middleware(request: NextRequest): Promise<NextResponse> {
    const { pathname } = request.nextUrl

    if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname.includes(".") || pathname === "/favicon.ico") {
        return NextResponse.next()
    }

    try {
        // If user is requesting any account page, require authentication
        if (pathname.startsWith("/account")) {
            const customer = await retrieveCustomer();
            if (!customer) {
                return NextResponse.redirect(new URL("/auth", request.url));
            }
            // allow access if customer exists
            return NextResponse.next();
        }

        if (pathname === "/auth" || pathname === "/auth/") {
            const customer = await retrieveCustomer();
            if (customer) {
                return NextResponse.redirect(new URL("/account/profile", request.url));
            }
            return NextResponse.next();
        }
    } catch (err) {
        // If auth check fails unexpectedly, do not break the whole site — log and continue.
        // (You may choose to redirect to /auth on failure instead; keep behaviour safe for now.)
        if (process.env.NODE_ENV === "development") {
            console.error("middleware: auth check failed:", err);
        }
    }

    const cacheId = request.cookies.get("__cache_id")?.value
    const cachedCountryCode = request.cookies.get("__country_code")?.value?.toLowerCase()

    const regionMap = fetchRegionData()

    if (cachedCountryCode && regionMap.has(cachedCountryCode)) {
        const response = NextResponse.next()

        if (!cacheId) {
            response.cookies.set("__cache_id", crypto.randomUUID(), { maxAge: COOKIE_MAX_AGE })
        }

        return response
    }

    const response = NextResponse.next()

    if (!cacheId) {
        response.cookies.set("__cache_id", crypto.randomUUID(), { maxAge: COOKIE_MAX_AGE })
    }

    return response
}

// Load from local file
function fetchRegionData(): Set<string> {
    if (regionCache.regionMap.size > 0 && Date.now() - regionCache.lastUpdated < REGION_CACHE_TTL) {
        return regionCache.regionMap;
    }
    console.log("❌ regions not cache getting region",)
    regionCache.regionMap.clear()

    for (const region of regions) {
        if (region?.countries) {
            for (const country of region.countries) {
                if (country?.iso_2) {
                    regionCache.regionMap.add(country.iso_2.toLowerCase())
                }
            }
        }
    }

    regionCache.lastUpdated = Date.now()
    return regionCache.regionMap
}

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|fonts|assets|png|svg|jpg|jpeg|gif|avif|webp).*)",
    ],
};