import "server-only"

import { cookies as nextCookies } from "next/headers"

export async function getAuthHeaders() {
    const token = (await nextCookies()).get("__jwt")?.value
    if (!token) return {}
    return { authorization: `Bearer ${token}` }
}

export const getCacheTag = async (tag: string) => {

    const cacheId = (await nextCookies()).get("__cache_id")?.value
    if (!cacheId) return ""
    return `${tag}-${cacheId}`

}

export const getCacheOptions = async (tag: string) => {
    if (typeof window !== "undefined") return null
    const cacheTag = await getCacheTag(tag)
    if (!cacheTag) return null
    return { tags: [cacheTag] }
}

export const setAuthToken = async (token: string) => (await nextCookies()).set("__jwt", token, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
})

export const removeAuthToken = async () => (await nextCookies()).set("__jwt", "", { maxAge: -1, })

export const getCartId = async () => (await nextCookies()).get("__cart_id")?.value

export const setCartId = async (cartId: string) => (await nextCookies()).set("__cart_id", cartId, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
})

export const removeCartId = async () => (await nextCookies()).set("__cart_id", "", {
    maxAge: -1,
})

export const setCountryCode = async (countryCode: string) => (await nextCookies()).set("__country_code", countryCode, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    sameSite: "strict",
})