import { StoreProduct } from "@medusajs/types";
import SectionHeader from "./section-header";
import Button from "@modules/common/custom-button";
import ProductCard from "@modules/common/product-card";


export default function ProductSection({ products, title, desc, sectionName, ...props }: ProductSectionProps) {
    return (
        <SectionHeader title={title} desc={desc} sectionName={sectionName}>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6 lg:gap-6">
                {products?.map(product => (
                    <ProductCard key={product.id} product={product} showCol />
                ))}
            </div>
            <div className="flex justify-center">
                <Button href={props.buttonLink} variant="outline" color="secondary">
                    {props.buttonText || "View all"}
                </Button>
            </div>
        </SectionHeader>
    )
}

type ProductSectionProps = {
    products: StoreProduct[];
    title: string;
    subTitle?: string;
    desc: string;
    sectionName: string;
    buttonLink: string;
    buttonText?: string;
}