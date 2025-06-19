import { fetchProductByCollection } from "libs/actions/product";
import ProductSection from "../components/product-section";

export default async function OnSale({ region_id, }: { region_id: string }) {
    const products = await fetchProductByCollection({ collection_id: SALE_ID, limit: 12, region_id, fields: "*variants.calculated_price" }, "on_sale_collection")
    return (
        <ProductSection
            title="On Sale"
            desc="Discover Your Style: Navigate by Category for Effortless Shopping!"
            sectionName="on-sale"
            buttonLink="/"
            products={products}
        />
    )
}

const SALE_ID = "pcol_01HWF7J68EM35XK47AHDHG04Y0"