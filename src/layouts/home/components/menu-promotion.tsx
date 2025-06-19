import Link from "next/link"
import { features } from "../header";
import Image from "next/image";
import { FeaturesType } from "@/types/common";

export default function MenuPromotion({ name, isMegaMenu }: { name?: string; isMegaMenu?: boolean }) {
    if (!name) return null
    return (
        <div className="grid grid-cols-2 gap-x-4 col-span-2 py-4">
            {(features as FeaturesType)[name].map((item) => (
                <Link key={item.id} href={`/collections/${item.handle}`} className={`group relative overflow-clip rounded-md bg-gray-200 border border-gray-300 sm:text-sm ${isMegaMenu ? "aspect-[0.7] lg:aspect-[0.8]" : "aspect-square"}`}>
                    <Image src={item.thumbnail} width={200} height={300} alt={item.alt} className="object-cover object-center group-hover:scale-105 group-hover:rotate-2 transition-transform ease-in-out duration-300 h-full w-full" />
                    <div className="flex absolute bottom-0 flex-col w-full justify-end">
                        <div className="p-4 bg-gray-300 opacity-75 text-sm">
                            <span className="font-medium text-base">{item.name}</span>
                            <p aria-hidden="true" className="mt-0.5 sm:mt-1">Shop now</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}