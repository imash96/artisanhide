import Image from "next/image";
import Link from "next/link"
import { listCollection } from "@lib/action/collection"
import SectionHeader from "../components/section-header";
import Button from "@module/common/custom-button";

export default async function Collection() {
    const product_collections = await listCollection({ limit: 6, fields: "+metadata" })
    return (
        <SectionHeader title="Shop by Collection" desc="Explore our curated collections that cater to every style and occasion." sectionName="collecion">
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
            <div className="flex items-center justify-center">
                <div className="relative overflow-hidden no-scrollbar">
                    <Button href={`/collection`} variant="outline" className="transition-all duration-500 ease-in-out before:absolute before:top-0 before:-left-full before:w-full before:h-full before:bg-gradient-to-r before:from-primary before:to-primary before:transition-all before:duration-500 before:ease-in-out before:z-[-1] hover:text-same-white hover:before:left-0">
                        View all Collection
                    </Button>
                </div>
            </div>
        </SectionHeader>

    )
}