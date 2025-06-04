import "server-only"

import { cookies as nextCookies } from "next/headers"

export const getAuthHeaders = async (): Promise<{ authorization: string } | object> => {
    const cookies = await nextCookies()
    const token = cookies.get("__jwt")?.value

    if (!token) return {}

    return { authorization: `Bearer ${token}` }
}

export const getCacheTag = async (tag: string): Promise<string> => {
    try {
        const cookies = await nextCookies()
        const cacheId = cookies.get("__cache_id")?.value

        if (!cacheId) {
            return ""
        }

        return `${tag}-${cacheId}`
    } catch {
        return ""
    }
}

export const getCacheOptions = async (tag: string) => {
    if (typeof window !== "undefined") return null

    const cacheTag = await getCacheTag(tag)

    if (!cacheTag) return null

    return { tags: [`${cacheTag}`] }
}

export const setAuthToken = async (token: string) => {
    const cookies = await nextCookies()
    cookies.set("__jwt", token, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    })
}

export const removeAuthToken = async () => {
    const cookies = await nextCookies()
    cookies.set("__jwt", "", {
        maxAge: -1,
    })
}

export const getCartId = async () => {
    const cookies = await nextCookies()
    return cookies.get("__cart_id")?.value
}

export const setCartId = async (cartId: string) => {
    const cookies = await nextCookies()
    cookies.set("__cart_id", cartId, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
    })
}

export const removeCartId = async () => {
    const cookies = await nextCookies()
    cookies.set("__cart_id", "", {
        maxAge: -1,
    })
}