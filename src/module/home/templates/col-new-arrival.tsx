import { fetchProductByCollection } from "@lib/action/product";
import ProductSection from "../components/product-section";

export default async function NewArrival({ region_id }: { region_id: string }) {
    const products = await fetchProductByCollection({ collection_id: SALE_ID, limit: 6, region_id, fields: "*variants.calculated_price" }, "new_arrival_collection")
    return (
        <ProductSection
            title="New Arrival"
            desc="Discover Your Style: Navigate by Category for Effortless Shopping!"
            sectionName="new-arrival"
            buttonLink="/"
            products={products}
        />
    )
}

const SALE_ID = "pcol_01HWD8VQ626X5T7NP4PSVTMH5R"