import { StoreRegion } from "@medusajs/types";
import { NextRequest, NextResponse } from "next/server";

// Constants
const BACKEND_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL;
const PUBLISHABLE_API_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY;
const DEFAULT_REGION = process.env.NEXT_PUBLIC_DEFAULT_REGION || "us";
const CACHE_EXPIRATION = 3600 * 1000; // 1 hour

// Cache for region data
const regionCache = {
    regionMap: new Set<string>(),
    lastUpdated: 0,
};

// Fetch and cache region data
async function fetchRegionData(cacheId: string) {
    if (!BACKEND_URL) {
        throw new Error(
            "Error fetching regions. Ensure MEDUSA_BACKEND_URL is properly set."
        );
    }

    const isCacheExpired = Date.now() - regionCache.lastUpdated > CACHE_EXPIRATION;

    if (regionCache.regionMap.size > 0 && !isCacheExpired) {
        return regionCache.regionMap;
    }

    const response = await fetch(`${BACKEND_URL}/store/regions`, {
        headers: { "x-publishable-api-key": PUBLISHABLE_API_KEY! },
        next: { revalidate: 3600, tags: [`regions-${cacheId}`] },
        cache: "force-cache",
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch regions: ${response.statusText}`);
    }

    const { regions } = await response.json();

    if (!regions?.length) {
        throw new Error("No regions found. Set up regions in your Medusa Admin.");
    }

    regionCache.regionMap.clear();
    regions.forEach((region: StoreRegion) => {
        region.countries?.forEach((country) => {
            if (country.iso_2) regionCache.regionMap.add(country.iso_2);
        });
    });
    regionCache.lastUpdated = Date.now();
    return regionCache.regionMap;
}

// Determine country code
async function determineCountryCode(request: NextRequest, regionMap: Set<string>) {
    try {
        const vercelCountryCode = request.headers.get("x-vercel-ip-country")?.toLowerCase();
        if (vercelCountryCode && regionMap.has(vercelCountryCode)) return vercelCountryCode;
        if (regionMap.has(DEFAULT_REGION)) return DEFAULT_REGION;
        return regionMap.values().next().value || null;
    } catch (error) {
        if (process.env.NODE_ENV === "development") {
            console.error("Middleware.ts: Error determining country code\n", error);
        }
        return null;
    }
}

// Middleware function
export async function middleware(request: NextRequest) {
    // Handle static assets
    const { pathname } = request.nextUrl

    if (pathname.includes(".")) {
        return NextResponse.next();
    }

    const cacheId = request.cookies.get("__cache_id")?.value || crypto.randomUUID();
    const regionMap = await fetchRegionData(cacheId);
    const urlCountryCode = pathname.split("/")[1]?.toLowerCase();

    if (urlCountryCode && regionMap.has(urlCountryCode)) {
        const response = NextResponse.next();
        if (!request.cookies.get("__cache_id")) {
            response.cookies.set("__cache_id", cacheId, { maxAge: 86400 });
        }
        return response;
    }

    const countryCode = await determineCountryCode(request, regionMap);

    if (countryCode) {
        const redirectUrl = `${request.nextUrl.origin}/${countryCode}${pathname}${request.nextUrl.search}`;
        return NextResponse.redirect(redirectUrl, 307);
    }

    return NextResponse.next();
}

// Configuration
export const config = {
    matcher: [
        "/((?!api|_next/static|_next/image|favicon.ico|images|fonts|assets|png|svg|jpg|jpeg|gif|webp).*)",
    ],
};
