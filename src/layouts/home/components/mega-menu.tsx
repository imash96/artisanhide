import { PopoverPanel } from "@headlessui/react"
import { StoreProductCategory } from "@medusajs/types"
import { ArrowRight } from "lucide-react"
import MenuPromotion from "./menu-promotion"
import Link from "next/link"

export default function MegaMenu({ categoryData }: MegaMenuProps) {
    return (
        <PopoverPanel transition className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in">
            <div aria-hidden="true" className="absolute inset-0 top-1/2 bg-white shadow-sm" />
            <div className="relative z-20 bg-gray-100">
                <div className="grid grid-cols-4 gap-8 px-10 py-12 mx-auto max-w-8xl md:px-10 lg:px-14">
                    <div className="col-span-1">
                        <h3 className="flex items-center text-lg font-semibold mb-2 pb-2 border-b border-gray-200">
                            Shop by Category
                            <ArrowRight className="w-5 h-5 ml-2" />
                        </h3>
                        <ul className="">
                            {categoryData.shop.map((item) => (
                                <li key={item.id} className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                    <Link href={`/category/${item.handle}`} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                <Link href={`/category/${categoryData?.handle}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                    View all
                                </Link>
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
                                    <Link href={`/category/${item.handle}`} className="text-gray-600 hover:text-blue-600 transition-colors duration-200">
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                            <li className="w-full px-2 py-3 hover:bg-gray-200 rounded">
                                <Link href={`/category/${categoryData?.handle}`} className="text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200">
                                    View all
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <MenuPromotion name={categoryData.name} isMegaMenu />
                </div>
            </div>
        </PopoverPanel>
    )
}

type MegaMenuProps = {
    categoryData: {
        style: StoreProductCategory[]
        shop: StoreProductCategory[]
    } & StoreProductCategory
}