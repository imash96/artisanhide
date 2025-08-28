"use client"

import { sdk } from "@lib/sdk"
import { StoreRegion } from "@medusajs/types"
import { createContext, useContext, useEffect, useState } from "react"

type RegionContextType = {
    region?: StoreRegion
    regions: StoreRegion[]
    setRegion: React.Dispatch<React.SetStateAction<StoreRegion | undefined>>
}

const RegionContext = createContext<RegionContextType | null>(null)

// TODO add provider component
type RegionProviderProps = {
    children: React.ReactNode
}

export const RegionProvider = ({ children }: RegionProviderProps) => {
    const [regions, setRegions] = useState<StoreRegion[]>([])
    const [region, setRegion] = useState<StoreRegion>()

    useEffect(() => {
        if (regions.length) return

        sdk.store.region.list().then(({ regions }) => setRegions(regions))
    }, [])

    useEffect(() => {
        if (region) {
            localStorage.setItem("region_id", region.id)
            return
        }

        const regionId = localStorage.getItem("region_id")
        if (!regionId) {
            if (regions.length) setRegion(regions[0])
        } else {
            sdk.store.region.retrieve(regionId).then(({ region: dataRegion }) => setRegion(dataRegion))
        }
    }, [region, regions])

    return (
        <RegionContext.Provider value={{ region, regions, setRegion }}>
            {children}
        </RegionContext.Provider>
    )
}

export const useRegion = () => {
    const context = useContext(RegionContext)

    if (!context) throw new Error("useRegion must be used within a RegionProvider")

    return context
}