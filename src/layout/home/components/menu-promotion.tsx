import Link from "next/link"
import Image from "next/image";
import { FeaturesType } from "@/type/common";
import { features } from "@/JSON/header";

export default function MenuPromotion({ name, isMegaMenu }: { name?: string; isMegaMenu?: boolean }) {
    if (!name) return null
    return (
        <div className="grid grid-cols-2 gap-x-4 col-span-2 py-4">
            {(features as FeaturesType)[name].map((item) => (
                <Link key={item.id} href={`/collection/${item.handle}`} className={`group/promo relative overflow-clip rounded-md bg-secondary border border-divider ${isMegaMenu ? "aspect-[3/4] xl:aspect-[9/10]" : "aspect-square"}`}>
                    <Image
                        src={item.thumbnail}
                        alt={item.alt}
                        width={200}
                        height={300}
                        className="object-cover object-center group-hover/promo:scale-105 group-hover/promo:rotate-2 transition-transform ease-in-out duration-300 h-full w-full"
                    />
                    <div className="flex absolute bottom-0 sm:text-sm text-accent-foreground flex-col w-full justify-end">
                        <div className="p-4 bg-accent opacity-90 text-sm">
                            <span className="font-medium text-base">{item.name}</span>
                            <p aria-hidden="true" className="mt-0.5 sm:mt-1">Shop now</p>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}