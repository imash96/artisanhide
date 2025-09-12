"use server";

import medusaError from "@lib/util/medusa-error";
import { sdk } from "@lib/sdk";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { StoreCart, StoreCartResponse, StoreCartShippingOption, StoreInitializePaymentSession, StoreUpdateCart } from "@medusajs/types";
import { getAuthHeaders, getCacheOptions, getCacheTag, getCartId, removeCartId, setCartId, } from "./cookies";
import { getRegion } from "./region";


/**
 * Safely coerce FormData entry to string | undefined
 */
function fdStr(fd: FormData, key: string): string | undefined {
    const v = fd.get(key);
    return v === null ? undefined : String(v);
}

/**
 * Retrieves a cart by its ID. If no ID is provided, uses cookie cartId.
 * Returns StoreCart or null on failure.
 */
export async function retrieveCart(cartId?: string, fields?: string): Promise<StoreCart | null> {
    const id = cartId ?? (await getCartId());
    fields ??=
        "*items, *region, *items.product, *items.variant, *items.thumbnail, *items.metadata, +items.total, *promotions, +shipping_methods.name";

    if (!id) return null;

    const headers = await getAuthHeaders();

    const nextOptions = await getCacheOptions("carts");

    try {
        const { cart } = await sdk.store.cart.retrieve(id, { fields }, {
            ...headers,
            next: nextOptions,
            cache: "force-cache",
        })

        return cart ?? null;
    } catch (err) {
        console.error("retrieveCart error:", err);
        return null;
    }
}

/**
 * Get or create a cart for a country. Ensures cart cookie is set and revalidates caches.
 */
export async function getOrSetCart(countryCode: string): Promise<StoreCart> {
    const region = getRegion(countryCode);
    if (!region) throw new Error(`Region not found for country code: ${countryCode}`);

    // Get minimal cart if exists
    let cart = await retrieveCart(undefined, "id,region_id");

    const headers = await getAuthHeaders();

    // Create if missing
    if (!cart) {
        try {
            const cartResp = await sdk.store.cart.create({ region_id: region.id }, {}, headers);
            cart = cartResp.cart
            if (!cart?.id) throw new Error("Failed to create cart");
            await setCartId(cart.id);
            const cartTag = await getCacheTag("carts");
            if (cartTag) revalidateTag(cartTag);
        } catch (err) {
            medusaError(err);
        }
    }

    // If cart exists but region mismatch, update it
    if (cart && cart.region_id !== region.id) {
        try {
            await sdk.store.cart.update(cart.id, { region_id: region.id }, {}, headers);
            revalidateTag(await getCacheTag("carts"));
        } catch (err) {
            medusaError(err);
        }
    }

    return cart;
}

/**
 * Update cart with Medusa StoreUpdateCart payload.
 */
export async function updateCart(data: StoreUpdateCart): Promise<StoreCart> {
    const cartId = await getCartId();
    if (!cartId) throw new Error("No existing cart found, please create one before updating");

    const headers = await getAuthHeaders();

    try {
        const { cart } = await sdk.store.cart.update(cartId, data, {}, headers);

        revalidateTag(await getCacheTag("carts"));
        revalidateTag(await getCacheTag("fulfillment"));

        return cart;
    } catch (err) {
        medusaError(err);
    }
}

/**
 * Add item to cart. Creates cart if missing.
 */
export async function addToCart({ variantId, quantity, countryCode }: AddToCartProps) {
    if (!variantId) throw new Error("Missing variant ID when adding to cart");

    const cart = await getOrSetCart(countryCode);
    if (!cart || !cart.id) throw new Error("Error retrieving or creating cart");

    const headers = await getAuthHeaders();

    try {
        await sdk.store.cart.createLineItem(cart.id, {
            variant_id: variantId, quantity
        }, {},
            headers
        );
        revalidateTag(await getCacheTag("carts"));
        revalidateTag(await getCacheTag("fulfillment"));

        return { success: true };
    } catch (err) {
        medusaError(err);
    }
}

/**
 * Update quantity for a specific line item on the current cart.
 */
export async function updateLineItem({ lineId, quantity, }: { lineId: string; quantity: number; }) {
    if (!lineId) throw new Error("Missing lineItem ID when updating line item");

    const cartId = await getCartId();
    if (!cartId) throw new Error("Missing cart ID when updating line item");

    const headers = await getAuthHeaders();

    try {
        await sdk.store.cart.updateLineItem(cartId, lineId, { quantity }, {}, headers);

        revalidateTag(await getCacheTag("carts"));
        revalidateTag(await getCacheTag("fulfillment"));

        return { success: true };
    } catch (err) {
        medusaError(err);
    }
}

/**
 * Delete a line item from cart.
 */
export async function deleteLineItem(lineId: string) {
    if (!lineId) throw new Error("Missing lineItem ID when deleting line item");

    const cartId = await getCartId();
    if (!cartId) throw new Error("Missing cart ID when deleting line item");

    const headers = await getAuthHeaders();

    try {
        await sdk.store.cart.deleteLineItem(cartId, lineId, headers);

        revalidateTag(await getCacheTag("carts"));
        revalidateTag(await getCacheTag("fulfillment"));

        return { success: true };
    } catch (err) {
        medusaError(err);
    }
}

/**
 * Add shipping method to a cart.
 */
export async function setShippingMethod({ cartId, shippingMethodId, }: { cartId: string; shippingMethodId: string; }) {
    const headers = await getAuthHeaders();

    try {
        await sdk.store.cart.addShippingMethod(cartId, { option_id: shippingMethodId }, {}, headers);

        revalidateTag(await getCacheTag("carts"));

        return { success: true };
    } catch (err) {
        medusaError(err);
    }
}

/**
 * Initiate a payment session for a cart.
 */
export async function initiatePaymentSession(cart: StoreCart, data: StoreInitializePaymentSession) {
    const headers = await getAuthHeaders();

    try {
        const resp = await sdk.store.payment.initiatePaymentSession(cart, data, {}, headers);

        revalidateTag(await getCacheTag("carts"));
        return resp;
    } catch (err) {
        medusaError(err);
    }
}

/**
 * Apply promo codes to cart.
 */
export async function applyPromotions(codes: string[]): Promise<{ success: true }> {
    const cartId = await getCartId();
    if (!cartId) throw new Error("No existing cart found");

    const headers = await getAuthHeaders();

    try {
        await sdk.store.cart.update(cartId, { promo_codes: codes }, {}, headers);

        revalidateTag(await getCacheTag("carts"));
        revalidateTag(await getCacheTag("fulfillment"));

        return { success: true };
    } catch (err) {
        medusaError(err);
    }
}

/**
 * Server action: apply promotion from form
 */
export async function submitPromotionForm(_state: unknown, formData: FormData) {
    const code = fdStr(formData, "code") ?? "";
    try {
        await applyPromotions([code]);
        return null; // no error
    } catch (e: any) {
        return e?.message ?? "Failed to apply promotion";
    }
}

/**
 * Set shipping & billing addresses (server action).
 * Returns error message or null on success so your pages can consume result.
 */
export async function setAddresses(_state: unknown, formData: FormData) {
    try {
        if (!formData) throw new Error("No form data found when setting addresses");

        const cartId = await getCartId();
        if (!cartId) throw new Error("No existing cart found when setting addresses");

        const shipping_address = {
            first_name: fdStr(formData, "shipping_address.first_name"),
            last_name: fdStr(formData, "shipping_address.last_name"),
            address_1: fdStr(formData, "shipping_address.address_1"),
            address_2: fdStr(formData, "shipping_address.address_2") ?? "",
            company: fdStr(formData, "shipping_address.company"),
            postal_code: fdStr(formData, "shipping_address.postal_code"),
            city: fdStr(formData, "shipping_address.city"),
            country_code: fdStr(formData, "shipping_address.country_code"),
            province: fdStr(formData, "shipping_address.province"),
            phone: fdStr(formData, "shipping_address.phone"),
        };

        const sameAsBilling = String(formData.get("same_as_billing") ?? "");
        const email = fdStr(formData, "email");

        let billing_address;
        if (sameAsBilling === "on") {
            billing_address = shipping_address;
        } else {
            billing_address = {
                first_name: fdStr(formData, "billing_address.first_name"),
                last_name: fdStr(formData, "billing_address.last_name"),
                address_1: fdStr(formData, "billing_address.address_1"),
                address_2: fdStr(formData, "billing_address.address_2") ?? "",
                company: fdStr(formData, "billing_address.company"),
                postal_code: fdStr(formData, "billing_address.postal_code"),
                city: fdStr(formData, "billing_address.city"),
                country_code: fdStr(formData, "billing_address.country_code"),
                province: fdStr(formData, "billing_address.province"),
                phone: fdStr(formData, "billing_address.phone"),
            };
        }

        const data: any = {
            shipping_address,
            email,
        };
        if (billing_address) data.billing_address = billing_address;

        await updateCart(data);
    } catch (e: any) {
        return e?.message ?? "Failed to set addresses";
    }
}

/**
 * Place an order (complete cart). Redirects to confirmation page if success.
 */
export async function placeOrder(cartId?: string) {
    const id = cartId ?? (await getCartId());
    if (!id) throw new Error("No existing cart found when placing an order");

    const headers = await getAuthHeaders();

    try {
        const res = await sdk.store.cart.complete(id, {}, headers);

        revalidateTag(await getCacheTag("carts"));

        // If SDK returned an order result, revalidate orders and redirect
        if (res.type === "order" && res.order.id) {
            const orderId = res.order.id;
            revalidateTag(await getCacheTag("orders"));

            await removeCartId();
            redirect(`/order/${orderId}/confirmed`);
        }
    } catch (err) {
        medusaError(err);
    }
}

/**
 * Update region for session & optionally cart, revalidate caches and redirect.
 */
export async function updateRegion(countryCode: string, currentPath = "/") {
    const cartId = await getCartId();
    const region = getRegion(countryCode);

    if (!region) throw new Error(`Region not found for country code: ${countryCode}`);

    if (cartId) {
        await updateCart({ region_id: region.id });
        const cartTag = await getCacheTag("carts");
        if (cartTag) revalidateTag(cartTag);
    }

    const regionTag = await getCacheTag("regions");
    if (regionTag) revalidateTag(regionTag);

    const productsTag = await getCacheTag("products");
    if (productsTag) revalidateTag(productsTag);

    // store country selection in cookie (if you want server-readability later)
    // Note: setCountryCode is not in this file; make sure it's available where you expect it.
    // await setCountryCode(countryCode);

    redirect(`/${countryCode}${currentPath}`);
}

/**
 * List shipping options for the current cart (requires cartId).
 */
export async function listCartOptions() {
    const cartId = await getCartId();
    if (!cartId) throw new Error("No existing cart found");

    const headers = {
        ...(await getAuthHeaders()),
    };
    const nextOptions = await getCacheOptions("shippingOptions");

    try {
        const resp = await sdk.client.fetch<{
            shipping_options: StoreCartShippingOption[];
        }>("/store/shipping-options", {
            query: { cart_id: cartId },
            headers,
            ...(nextOptions ? { next: nextOptions } : {}),
            cache: "force-cache",
        });

        return resp;
    } catch (err) {
        medusaError(err);
    }
}

type AddToCartProps = {
    variantId: string;
    quantity: number;
    countryCode: string;
}