import { product_collections } from "@/JSON/collection";
import SectionHeader from "@module/home/components/section-header";
import Image from "next/image";
import Link from "next/link";

export default async function Page() {
    return (
        <SectionHeader title="Collections" desc="Explore our curated collections that cater to every style and occasion." sectionName="collecion" className="border-b mb-6 pb-4">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 gap-y-5 lg:gap-y-6">
                {product_collections.map(item => (
                    <Link key={item.id} href={`collection/${item.handle}`} className="block group space-y-2">
                        <div className="aspect-[4/5.5] overflow-hidden no-scrollbar">
                            <Image
                                src={item.metadata?.thumbnail as string}
                                alt="Category Image"
                                height={600}
                                width={400}
                                className="h-full w-full object-cover group-hover:scale-105 group-hover:rotate-2 transition-all ease-in-out duration-300"
                            />
                        </div>
                        <h2 className="text-[16px] text-center font-light ">{item.title}</h2>
                    </Link>
                ))}
            </div>
        </SectionHeader>
    )
}