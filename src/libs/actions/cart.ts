"use server"

import { StoreUpdateCart } from "@medusajs/types"
import { revalidateTag } from "next/cache"
import { redirect } from "next/navigation"
import { getAuthHeaders, getCacheOptions, getCacheTag, getCartId, removeCartId, setCartId, setCountryCode, } from "./cookies"
import { getRegion } from "./region"
import { sdk } from "@libs/sdk"
import { ClientHeaders } from "@medusajs/js-sdk"
import medusaError from "@libs/util/medusa-error"

export async function retrieveCart(cartId?: string) {
    const id = cartId || (await getCartId())

    if (!id) return null

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    const nextOptions = await getCacheOptions("carts");

    return await sdk.store.cart.retrieve(id, {
        fields: "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name",
    }, {
        ...headers,
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    }).then(({ cart }) => cart).catch(() => null)
}

export async function getOrSetCart(countryCode: string) {
    const region = await getRegion(countryCode)

    if (!region) throw new Error(`Region not found for country code: ${countryCode}`);

    let cart = await retrieveCart()

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    if (!cart) {
        const cartResp = await sdk.store.cart.create(
            { region_id: region.id },
            {},
            headers
        )
        cart = cartResp.cart

        await setCartId(cart.id)

        revalidateTag(await getCacheTag("carts"))
    }

    if (cart && cart?.region_id !== region.id) {
        await sdk.store.cart.update(cart.id, { region_id: region.id }, {}, headers)
        revalidateTag(await getCacheTag("carts"))
    }

    return cart
}

export async function updateCart(data: StoreUpdateCart) {
    const cartId = await getCartId()

    if (!cartId) throw new Error("No existing cart found, please create one before updating")

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return sdk.store.cart.update(cartId, data, {}, headers).then(async ({ cart }) => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)

        const fulfillmentCacheTag = await getCacheTag("fulfillment")
        revalidateTag(fulfillmentCacheTag)

        return cart
    }).catch(medusaError)
}

export async function addToCart({ variantId, quantity, countryCode }: AddToCartProps) {
    if (!variantId) throw new Error("Missing variant ID when adding to cart")

    const cart = await getOrSetCart(countryCode)

    if (!cart) {
        throw new Error("Error retrieving or creating cart")
    }

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    await sdk.store.cart.createLineItem(cart.id, {
        variant_id: variantId,
        quantity,
    }, {},
        headers
    ).then(async () => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)

        const fulfillmentCacheTag = await getCacheTag("fulfillment")
        revalidateTag(fulfillmentCacheTag)
    }).catch(medusaError)
}

export async function updateLineItem(lineId: string, quantity: number) {
    // console.log(quantity)
    // if (quantity <= 0) {
    //     deleteLineItem(lineId)
    //     return
    // }
    if (!lineId) throw new Error("Missing lineItem ID when updating line item")

    const cartId = await getCartId()

    if (!cartId) throw new Error("Missing cart ID when updating line item")

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    await sdk.store.cart.updateLineItem(cartId, lineId, { quantity }, {}, headers).then(async () => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)

        const fulfillmentCacheTag = await getCacheTag("fulfillment")
        revalidateTag(fulfillmentCacheTag)
    }).catch(medusaError)
}

export async function deleteLineItem(lineId: string) {
    if (!lineId) throw new Error("Missing lineItem ID when deleting line item")

    const cartId = await getCartId()

    if (!cartId) throw new Error("Missing cart ID when deleting line item")

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    await sdk.store.cart.deleteLineItem(cartId, lineId, headers).then(async () => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)

        const fulfillmentCacheTag = await getCacheTag("fulfillment")
        revalidateTag(fulfillmentCacheTag)
    }).catch(medusaError)
}

export async function setShippingMethod({ cartId, shippingMethodId }: { cartId: string, shippingMethodId: string }) {
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return sdk.store.cart.addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers).then(async () => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)
    }).catch(medusaError)
}

export async function applyPromotions(codes: string[]) {
    const cartId = await getCartId()

    if (!cartId) throw new Error("No existing cart found")

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    return sdk.store.cart.update(cartId, { promo_codes: codes }, {}, headers).then(async () => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)

        const fulfillmentCacheTag = await getCacheTag("fulfillment")
        revalidateTag(fulfillmentCacheTag)
    }).catch(medusaError)
}

export async function applyGiftCard(code: string) {
    //   const cartId = getCartId()
    //   if (!cartId) return "No cartId cookie found"
    //   try {
    //     await updateCart(cartId, { gift_cards: [{ code }] }).then(() => {
    //       revalidateTag("cart")
    //     })
    //   } catch (error: any) {
    //     throw error
    //   }
}

export async function removeDiscount(code: string) {
    // const cartId = getCartId()
    // if (!cartId) return "No cartId cookie found"
    // try {
    //   await deleteDiscount(cartId, code)
    //   revalidateTag("cart")
    // } catch (error: any) {
    //   throw error
    // }
}

export async function removeGiftCard(
    codeToRemove: string,
    giftCards: any[]
    // giftCards: GiftCard[]
) {
    //   const cartId = getCartId()
    //   if (!cartId) return "No cartId cookie found"
    //   try {
    //     await updateCart(cartId, {
    //       gift_cards: [...giftCards]
    //         .filter((gc) => gc.code !== codeToRemove)
    //         .map((gc) => ({ code: gc.code })),
    //     }).then(() => {
    //       revalidateTag("cart")
    //     })
    //   } catch (error: any) {
    //     throw error
    //   }
}

export async function submitPromotionForm(currentState: unknown, formData: FormData) {
    const code = formData.get("code") as string
    try {
        await applyPromotions([code])
    } catch (e: any) {
        return e.message
    }
}

// TODO: Pass a POJO instead of a form entity here
export async function setAddresses(currentState: unknown, formData: FormData) {
    try {
        if (!formData) throw new Error("No form data found when setting addresses")
        const cartId = getCartId()
        if (!cartId) throw new Error("No existing cart found when setting addresses")

        const data = {
            shipping_address: {
                first_name: formData.get("shipping_address.first_name"),
                last_name: formData.get("shipping_address.last_name"),
                address_1: formData.get("shipping_address.address_1"),
                address_2: formData.get("shipping_address.address_2"),
                company: formData.get("shipping_address.company"),
                postal_code: formData.get("shipping_address.postal_code"),
                city: formData.get("shipping_address.city"),
                country_code: formData.get("shipping_address.country_code"),
                province: formData.get("shipping_address.province"),
                phone: formData.get("shipping_address.phone"),
            },
            email: formData.get("email"),
        } as any

        const sameAsBilling = formData.get("same_as_billing")
        if (sameAsBilling === "on") data.billing_address = data.shipping_address

        if (sameAsBilling !== "on")
            data.billing_address = {
                first_name: formData.get("billing_address.first_name"),
                last_name: formData.get("billing_address.last_name"),
                address_1: formData.get("billing_address.address_1"),
                address_2: "",
                company: formData.get("billing_address.company"),
                postal_code: formData.get("billing_address.postal_code"),
                city: formData.get("billing_address.city"),
                country_code: formData.get("billing_address.country_code"),
                province: formData.get("billing_address.province"),
                phone: formData.get("billing_address.phone"),
            }
        await updateCart(data)

        return { success: true, error: null }
    } catch (e: any) {
        return { success: false, error: e.toString() }
    }

    // redirect("/checkout?step=shipping")
}

export async function handleSetShippingMethod(_: Record<string, any>, formData: FormData) {
    const selectedOption = String(formData.get("shippingMethod"))
    try {
        await setShippingMethod({ cartId: _.cartId, shippingMethodId: selectedOption })
        return { success: true, error: null }
    } catch (e: any) {
        return {
            cartId: _.cartId,
            error: e.message,
            success: false,
        }
    }
    // redirect("/checkout?step=payment")
}

/**
 * Places an order for a cart. If no cart ID is provided, it will use the cart ID from the cookies.
 * @param cartId - optional - The ID of the cart to place an order for.
 * @returns The cart object if the order was successful, or null if not.
 */
export async function placeOrder(cartId?: string) {
    const id = cartId || (await getCartId())

    if (!id) throw new Error("No existing cart found when placing an order")

    const headers = { ...(await getAuthHeaders()) as ClientHeaders };

    const cartRes = await sdk.store.cart.complete(id, {}, headers).then(async (cartRes) => {
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)
        return cartRes
    }).catch(medusaError)

    if (cartRes?.type === "order") {

        const orderCacheTag = await getCacheTag("orders")
        revalidateTag(orderCacheTag)

        removeCartId()
        redirect(`/order/${cartRes?.order.id}/confirmed`)
    }

    return cartRes.cart
}

/**
 * Updates the countrycode param and revalidates the regions cache
 * @param regionId
 * @param countryCode
 */
export async function updateRegion(countryCode: string) {
    const cartId = await getCartId()
    const region = await getRegion(countryCode)

    if (!region) {
        throw new Error(`Region not found for country code: ${countryCode}`)
    }

    if (cartId) {
        await updateCart({ region_id: region.id })
        const cartCacheTag = await getCacheTag("carts")
        revalidateTag(cartCacheTag)
    }

    const regionCacheTag = await getCacheTag("regions")
    revalidateTag(regionCacheTag)

    const productsCacheTag = await getCacheTag("products")
    revalidateTag(productsCacheTag)

    setCountryCode(countryCode)
}

export async function listCartOptions() {
    const cartId = await getCartId()
    if (!cartId) throw new Error("No existing cart found")
    const headers = { ...(await getAuthHeaders()) as ClientHeaders };
    const nextOptions = await getCacheOptions("carts");

    return await sdk.store.fulfillment.listCartOptions({ cart_id: cartId }, {
        ...headers,
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    })
}

export async function fetchCartItemCount() {
    const cart = await retrieveCart()
    return cart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;
}

type AddToCartProps = {
    variantId: string
    quantity: number
    countryCode: string
}