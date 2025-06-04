import { StoreProductCategory } from "@medusajs/types"
import LocalizedClientLink from "@modules/common/localized-client-link"
import { ArrowRight } from "lucide-react"
import MenuPromotion from "./menu-promotion"

type MegaMenuProps = {
    categoryData: {
        style: StoreProductCategory[]
        shop: StoreProductCategory[]
    } & StoreProductCategory
}

export default function MegaMenu({ categoryData }: MegaMenuProps) {
    return (
        <div className="mega-menu-content relative z-10 bg-gray-100">
            <div className="grid grid-cols-4 gap-8 px-10 py-12 mx-auto max-w-8xl md:px-10 lg:px-14">
                <div className="col-span-1">
                    <h3 className="flex items-center text-lg font-semibold mb-2 pb-2 border-b border-gray-200">
                        Shop by Category
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </h3>
                    <ul className="">
                        {categoryData.shop.map((item) => (
                            <li key={item.id} className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                <LocalizedClientLink href={`/category/${item.handle}`} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    {item.name}
                                </LocalizedClientLink>
                            </li>
                        ))}
                        <li className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                            <LocalizedClientLink href={`/category/${categoryData?.handle}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                View all
                            </LocalizedClientLink>
                        </li>
                    </ul>
                </div>
                <div className="col-span-1">
                    <h3 className="flex items-center text-lg font-semibold mb-2 pb-2 border-b border-gray-200">
                        Shop by Style
                        <ArrowRight className="w-5 h-5 ml-2" />
                    </h3>
                    <ul className="">
                        {categoryData.style.map((item) => (
                            <li key={item.id} className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                <LocalizedClientLink href={`/category/${item.handle}`} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                    {item.name}
                                </LocalizedClientLink>
                            </li>
                        ))}
                        <li className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                            <LocalizedClientLink href={`/category/${categoryData?.handle}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                View all
                            </LocalizedClientLink>
                        </li>
                    </ul>
                </div>
                <MenuPromotion name={categoryData.name} isMegaMenu />
            </div>
        </div>
    )
}