import type { StoreRegion } from "@medusajs/types";
import { type NextRequest, NextResponse } from "next/server";

// Constants
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us";
const CACHE_EXPIRATION = 24 * 3600000; // 24 hour
const COOKIE_MAX_AGE = 86400; // 24 hours in seconds
const FETCH_TIMEOUT = 5000; // 5 seconds

interface RegionCache {
    regionMap: Set<string>
    lastUpdated: number
    error: string | null
};

// Cache for region data
const regionCache: RegionCache = {
    regionMap: new Set<string>(),
    lastUpdated: 0,
    error: null,
};

export async function middleware(request: NextRequest): Promise<NextResponse> {
    // Handle static assets
    const { pathname } = request.nextUrl;

    // Early return for static assets and API routes
    if (pathname.startsWith("/_next/") || pathname.startsWith("/api/") || pathname.includes(".") || pathname === "/favicon.ico") return NextResponse.next()

    // Get or create cache ID
    const cacheId = request.cookies.get("__cache_id")?.value || crypto.randomUUID()
    // Check existing country code cookie
    const cachedCountryCode = request.cookies.get("__country_code")?.value?.toLowerCase()

    // Fetch region data
    const regionMap = await fetchRegionData(cacheId)

    // Validate cached country code
    if (cachedCountryCode && regionMap.has(cachedCountryCode)) {
        const response = NextResponse.next()

        // Ensure cache ID is set
        if (!request.cookies.get("__cache_id")) {
            response.cookies.set("__cache_id", cacheId, { maxAge: 86400 })
        }

        return response
    }

    // Determine new country code
    const countryCode = determineCountryCode(request, regionMap)

    // Create response with updated cookies
    const response = NextResponse.next()

    // Set country code cookie - fixed cookie name
    response.cookies.set("__country_code", countryCode, { maxAge: COOKIE_MAX_AGE })

    // Set cache ID if not present
    if (!request.cookies.get("__cache_id")) {
        response.cookies.set("__cache_id", cacheId, { maxAge: COOKIE_MAX_AGE })
    }

    return response
};


// Fetch and cache region data
async function fetchRegionData(cacheId: string): Promise<Set<string>> {
    if (!BACKEND_URL) throw new Error("NEXT_PUBLIC_MEDUSA_BACKEND_URL is not configured");

    const isCacheValid = regionCache.regionMap.size > 0 && Date.now() - regionCache.lastUpdated < CACHE_EXPIRATION && !regionCache.error

    if (isCacheValid) return regionCache.regionMap;

    try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT)

        const response = await fetch(`${BACKEND_URL}/store/regions`, {
            headers: {
                "x-publishable-api-key": PUBLISHABLE_API_KEY!,
                Accept: "application/json",
                "Cache-Control": "max-age=3600",
            },
            signal: controller.signal,
            next: {
                revalidate: 3600,
                tags: [`regions-${cacheId}`],
            },
        })

        clearTimeout(timeoutId)

        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`)

        const regions = (await response.json())?.regions as StoreRegion[];

        if (!Array.isArray(regions) || regions.length === 0) throw new Error("No valid regions found in response")

        // Clear and rebuild cache
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

        if (regionCache.regionMap.size === 0) throw new Error("No valid country codes found in regions")

        regionCache.lastUpdated = Date.now();

        return regionCache.regionMap
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error"
        regionCache.error = errorMessage

        if (process.env.NODE_ENV === "development") {
            console.error("❌ Region fetch failed:", errorMessage)
        }

        // Return existing cache if available, otherwise fallback
        if (regionCache.regionMap.size > 0) {
            return regionCache.regionMap
        }

        // Fallback to default region
        return new Set([DEFAULT_REGION])
    }
};

// Determine country code
function determineCountryCode(request: NextRequest, regionMap: Set<string>): string {
    try {
        // Priority 1: Vercel geolocation header
        const vercelCountryCode = request.headers.get("x-vercel-ip-country")?.toLowerCase()
        if (vercelCountryCode && regionMap.has(vercelCountryCode)) {
            return vercelCountryCode
        }

        // Priority 2: Cloudflare geolocation header
        const cfCountryCode = request.headers.get("cf-ipcountry")?.toLowerCase()
        if (cfCountryCode && cfCountryCode !== "xx" && regionMap.has(cfCountryCode)) {
            return cfCountryCode
        }

        // Priority 3: Default region
        if (regionMap.has(DEFAULT_REGION)) {
            return DEFAULT_REGION
        }

        // Priority 4: First available region
        const firstRegion = regionMap.values().next().value
        return firstRegion || DEFAULT_REGION
    } catch (error) {
        if (process.env.NODE_ENV === "development") console.error("❌ Country code determination failed:", error)
        return DEFAULT_REGION
    }
};

// Configuration
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|fonts|assets|png|svg|jpg|jpeg|gif|avif|webp).*)",
    ],
};