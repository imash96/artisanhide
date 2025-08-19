import { Zap } from "lucide-react";
import Breadcrumb from "../components/product-breadcrumb";
import RatingSystem from "../components/rating-system";

export default function ProductInfo({ title, hs_code, pages }: ProductInfoProps) {

    return (
        <>
            <Breadcrumb items={pages} href="" />
            <h1 className=" tracking-tight text-[20px] md:text-[26px] lg:text-[30px] leading-snug text-[#242424]">
                {title}
            </h1>
            {hs_code && <h2>{hs_code}</h2>}
            <RatingSystem rating={rating} />
            <div className="flex gap-x-2 text-sm font-semibold">
                <span className="flex items-center gap-x-1 bg-green-700 rounded-full px-3 text-gray-100">
                    <Zap className="w-3 h-3 shrink-0" />
                    Express Delivery
                </span> Get it in 4 – 6 days
            </div>
        </>
    )
}

const rating = {
    rating: 4,
    reviewCount: 150
}

type ProductInfoProps = {
    title: string,
    hs_code: string | null,
    pages: {
        name: string;
        href: string;
    }[] | undefined
};