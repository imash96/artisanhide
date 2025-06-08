import SectionHeader from "../components/section-header";
import ProductCard from "../components/product-card";
import { fetchProductByCollection } from "libs/actions/product";
import { Button } from "@modules/common/button";

export default async function OnSale({ region_id, }: { region_id: string }) {
    const products = await fetchProductByCollection({ collection_id: SALE_ID, limit: 12, region_id, fields: "*variants.calculated_price" }, "on_sale_collection")
    return (
        <SectionHeader title="On Sale" desc="Discover Your Style: Navigate by Category for Effortless Shopping!" sectionName="on-sale">
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6 lg:gap-6">
                {products?.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
            <div className="flex justify-center">
                <Button href={''} variant="outline" color="secondary">
                    View all
                </Button>
            </div>
        </SectionHeader>
    )
}

const SALE_ID = "pcol_01HWF7J68EM35XK47AHDHG04Y0"