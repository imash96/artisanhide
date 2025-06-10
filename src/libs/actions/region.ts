"use server"

import { sdk } from "libs/sdk"
import { getCacheOptions } from "./cookies"
import medusaError from "libs/util/medusa-error";
import type { StoreRegion } from "@medusajs/types";

export const listRegions = async () => {
    const cache = await getCacheOptions("regions");

    return sdk.store.region.list({
        fields: "id,*countries"
    }, {
        tags: cache ? { tags: cache.tags } : null
    })
        .then(({ regions }) => regions)
        .catch(medusaError)
}

const regionMap = new Map<string, StoreRegion>()

export const getRegion = async (countryCode: string) => {
    try {
        if (regionMap.has(countryCode)) {
            return regionMap.get(countryCode)
        }

        const regions = await listRegions()

        if (!regions) return null

        regions.forEach((region) => region.countries?.forEach((c) => regionMap.set(c?.iso_2 ?? "", region)))

        const region = countryCode ? regionMap.get(countryCode) : regionMap.get("us")

        return region
    } catch (e: any) {
        return null
    }
}