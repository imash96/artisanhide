import { type NextRequest, NextResponse } from "next/server"
import { regions } from "./region"
import { retrieveCustomer } from "@lib/action/customer"

const COOKIE_MAX_AGE = 86400000 // 24 hours in seconds

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

    if (pathname === "/account") {
        const customer = await retrieveCustomer();
        console.log(pathname, customer)
        if (!customer) return NextResponse.redirect(new URL('/auth', request.url))
    }

    if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname.includes(".") || pathname === "/favicon.ico") {
        return NextResponse.next()
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
    if (regionCache.regionMap.size > 0) return regionCache.regionMap
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

// function determineCountryCode(request: NextRequest, regionMap: Set<string>): string {
//     try {
//         const vercelCountryCode = request.headers.get("x-vercel-ip-country")?.toLowerCase()
//         if (vercelCountryCode && regionMap.has(vercelCountryCode)) return vercelCountryCode

//         const cfCountryCode = request.headers.get("cf-ipcountry")?.toLowerCase()
//         if (cfCountryCode && cfCountryCode !== "xx" && regionMap.has(cfCountryCode)) {
//             return cfCountryCode
//         }

//         if (regionMap.has(DEFAULT_REGION)) return DEFAULT_REGION

//         return regionMap.values().next().value || DEFAULT_REGION
//     } catch {
//         return DEFAULT_REGION
//     }
// }

export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|fonts|assets|png|svg|jpg|jpeg|gif|avif|webp).*)",
    ],
}
