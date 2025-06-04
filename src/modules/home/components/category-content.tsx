import LocalizedClientLink from "@modules/common/localized-client-link"
import { listParentCategories } from "libs/actions/categories"
import { ArrowRight } from "lucide-react"
import Image from "next/image"


export default async function CategoryContent() {
    const product_categories = await listParentCategories({ limit: 6 })
    const [firstHalf, secondHalf] = [product_categories.splice(0, 3), product_categories.splice(-3)]
    return (
        <>
            {[firstHalf, secondHalf].map((categories, xIndex) => (
                <div key={xIndex} className="grid gap-4 mt-6 md:grid-cols-3 lg:gap-6">
                    {categories.map((category, yIndex) => (
                        <div key={category.id} className={`relative group overflow-hidden no-scrollbar ${(0 == xIndex && 0 == yIndex || 1 == xIndex && yIndex == 1) ? "md:col-span-2 md:row-span-2" : ""}`}>
                            <Image
                                src={category.description ?? ""}
                                width={500} height={250}
                                alt={category.name}
                                className="object-cover object-center w-full h-full transition-transform ease-in-out duration-300 group-hover:scale-105 group-hover:-rotate-2"
                            />
                            <LocalizedClientLink href={`/category/${category.handle}`} className="absolute inset-0 bg-gradient-to-t from-gray-600/60 to-transparent">
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
                            </LocalizedClientLink>
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}