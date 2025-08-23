import { Zap } from "lucide-react";
import Breadcrumb from "../components/product-breadcrumb";
import RatingSystem from "@modules/common/rating-system";

export default function ProductInfo({ title, hs_code, pages }: ProductInfoProps) {

    return (
        <>
            <Breadcrumb items={pages} href="/category" />
            <h1 className=" tracking-tight text-xl md:text-2xl lg:text-3xl leading-snug text-foreground">
                {title}
            </h1>
            {hs_code && <h2>{hs_code}</h2>}
            <RatingSystem averageRating={4.4} reviewCount={150} size="md" className="mb-2" />
            <div className="flex gap-x-2 text-sm font-semibold">
                <span className="flex items-center gap-x-1 bg-btn-secondary rounded-full px-3 text-secondary-foreground">
                    <Zap className="w-3 h-3 shrink-0" />
                    Express Delivery
                </span> Get it in 4 – 6 days
            </div>
        </>
    )
}

type ProductInfoProps = {
    title: string,
    hs_code: string | null,
    pages: {
        name: string;
        href: string;
    }[] | undefined
};