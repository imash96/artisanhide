import { fetchProductByCollection } from "@lib/action/product";
import ProductSection from "../components/product-section";

export default async function TrendingNow({ region_id, }: { region_id: string }) {
    const products = await fetchProductByCollection({ collection_id: SALE_ID, limit: 6, region_id, fields: "*variants.calculated_price" }, "trending_now_collection")
    return (
        <ProductSection
            title="Trending Now"
            desc="Discover Your Style: Navigate by Category for Effortless Shopping!"
            sectionName="trending-now"
            buttonLink="/"
            products={products}
        />
    )
}

const SALE_ID = "pcol_01HW2VPRNM5NRED5DWC3G77PS3"