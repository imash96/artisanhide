import medusaError from "../util/medusa-error";
import type { StoreRegion } from "@medusajs/types";
import { regions } from "../../JSON/region";

const regionMap = new Map<string, StoreRegion>();

export const listRegions = () => regions;

export function getRegion(countryCode: string) {
    try {
        if (regionMap.has(countryCode)) return regionMap.get(countryCode);

        const regions = listRegions();
        if (!regions.length) return null;

        for (const region of regions) {
            region.countries?.forEach((c) => {
                if (c?.iso_2) regionMap.set(c.iso_2.toLowerCase(), region);
            });
        }

        return regionMap.get(countryCode) ?? null;
    } catch (err) {
        console.error(err);
        return null;
    }
}

export function retrieveRegion(id: string) {
    try {
        const region = regions.find(region => region.id === id)
        if (!region) throw new Error(`Region with id "${id}" not found`);
        return region;
    } catch (err) {
        medusaError(err);
    }
}