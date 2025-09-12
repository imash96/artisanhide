import "server-only";
import { cookies } from "next/headers";

const COOKIE_MAX_AGE = 60 * 60 * 24; // 1 Day in seconds

// Common cookie options factory
const defaultCookieOptions = {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production",
};

export async function getAuthHeaders(): Promise<{ authorization?: string; }> {
    const token = (await cookies()).get("__jwt")?.value
    return token ? { authorization: `Bearer ${token}` } : {};
}

export async function getCacheTag(tag: string) {
    const cacheId = (await cookies()).get("__cache_id")?.value
    return cacheId ? `${tag}-${cacheId}` : "";
}

export async function getCacheOptions(tag: string) {
    if (typeof window !== "undefined") return null
    const cacheTag = await getCacheTag(tag);
    return cacheTag ? { tags: [cacheTag] } : null;
}

export async function setAuthToken(token: string) {
    (await cookies()).set("__jwt", token, {
        ...defaultCookieOptions,
        maxAge: COOKIE_MAX_AGE * 7,
    });
}

export async function removeAuthToken() {
    (await cookies()).delete("__jwt");
}

export async function getCartId() {
    return (await cookies()).get("__cart_id")?.value;
}

export async function setCartId(cartId: string) {
    (await cookies()).set("__cart_id", cartId, {
        ...defaultCookieOptions,
        maxAge: COOKIE_MAX_AGE * 7,
    });
}

export async function removeCartId() {
    (await cookies()).delete("__cart_id");
}

export async function setCountryCode(countryCode: string) {
    (await cookies()).set("__country_code", countryCode, {
        maxAge: COOKIE_MAX_AGE * 365,
        sameSite: "strict",
    });
}