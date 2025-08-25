import { sdk } from "../sdk"
import { getCacheOptions } from "./cookies"
import medusaError from "../util/medusa-error";
import type { StoreRegion } from "@medusajs/types";

export const listRegions = async () => {
    const nextOptions = await getCacheOptions("regions");
    return sdk.store.region.list({
        fields: "id,*countries"
    }, {
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    }).then(({ regions }) => regions).catch(medusaError)
}

const regionMap = new Map<string, StoreRegion>()

export const getRegion = async (countryCode: string) => {
    try {
        if (regionMap.has(countryCode)) return regionMap.get(countryCode)

        const regions = await listRegions()

        if (!regions) return null

        regions.forEach((region) => region.countries?.forEach((c) => regionMap.set(c?.iso_2 ?? "", region)))

        const region = countryCode ? regionMap.get(countryCode) : regionMap.get("us")

        return region
    } catch (e: any) {
        console.error(e)
        return null
    }
}

export const retrieveRegion = async (id: string) => {

    const nextOptions = await getCacheOptions(["regions", id].join("-"));

    return sdk.store.region.retrieve(id, {}, {
        next: nextOptions ? nextOptions : null,
        cache: "force-cache",
    }).then(({ region }) => region).catch(medusaError)
}