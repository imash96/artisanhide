import { fetchProductByCollection } from "@lib/action/product";
import ProductSection from "../components/product-section";
import { product_collections } from "@/JSON/collection";

export default async function OnSale({ region_id, }: { region_id: string }) {
    const collection = product_collections[6]
    const products = await fetchProductByCollection({ collection_id: collection.id, limit: 6, region_id, fields: "*variants.calculated_price" }, collection.title)
    return (
        <ProductSection
            title={collection.title}
            desc={collection.metadata.description}
            buttonLink={`/collection/${collection.handle}`}
            sectionName={collection.handle}
            products={products}
        />
    )
}

const SALE_ID = "pcol_01HWF7J68EM35XK47AHDHG04Y0"