import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { listCategories } from "libs/actions/categories"
import SectionHeader from "../components/section-header";
import Link from "next/link";

export default async function Category() {
    const product_categories = await listCategories({
        limit: 6,
        parent_category_id: "null",
    })
    return (
        <SectionHeader title="Shop by Category" desc="Discover Your Style: Navigate by Category for Effortless Shopping!" sectionName="category">
            <div className="grid md:grid-cols-6 lg:grid-cols-4  gap-4">
                {product_categories.map((category, xIndex) => (
                    <div key={category.id} className="tw-category-card relative overflow-hidden no-scrollbar bg-gray-50 max-h-72" data-index={xIndex}>
                        <Image
                            src={category.description ?? ""}
                            width={500} height={250}
                            alt={category.name}
                            className="object-cover object-center w-full h-full transition-transform duration-300 group-hover:scale-105"
                        />
                        <Link href={`/category/${category.handle}`} className="absolute inset-0 bg-gradient-to-t from-gray-600/60 to-transparent">
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 className="font-bold text-gray-50 text-xl mb-2 font-title">
                                    <span className="absolute inset-0" />
                                    {category.name}
                                </h3>
                                <p aria-hidden="true" className="text-gray-50 text-sm flex items-center">
                                    Shop now
                                    <ArrowRight className="ml-2 w-4 h-4 transition-transform duration-300 group-hover:-rotate-45" />
                                </p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </SectionHeader>
    )
}