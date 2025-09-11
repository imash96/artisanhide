import Image from "next/image";

export default function Page() {
    return (
        <div className="bg-primary">
            <div
                style={{
                    backgroundImage: "url('/banners/12260.jpg')",
                    //   backgroundAttachment: "fixed",
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                className="h-[55vh] md:h-[45vh] lg:h-[100vh] relative"
            >
                <div className="absolute px-4 inset-0 flex items-center justify-center bg-gradient-to-t from-primary to-black/25">
                    {/* <p className="text-xl font-light text-center text-white">About</p> */}
                    <div>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl text-center font-medium tracking-tight text-white uppercase">
                            Artisan Hide
                        </h1>
                        <p className="text-[16px] md:text-[18px] lg:text-[20px] tracking-wide max-w-xl mx-auto font-light text-center text-white">
                            Real leather. Real craftsmanship. Real trust.
                        </p>
                    </div>
                </div>
            </div>
            <div className="templateContainer py-10  md:py-9 lg:py-20 space-y-5">
                <h2 className="text-[26px] leading-[1.25] md:text-[30px] lg:text-[34px] -tracking-[0.01em] font-medium uppercase text-center text-white">
                    Who We Are
                </h2>
                <p className="text-[14px] md:text-[16px] font-extralight tracking-wide text-white max-w-[900px] text-center mx-auto">
                    At Artisan Hide, we specialize in premium leather goods that stand the
                    test of time. Founded with a passion for traditional craftsmanship,
                    our mission is simple — to create honest, high-quality leather jackets
                    and accessories that you can wear with pride.
                </p>
            </div>
            <Image
                src={"/banners/3.webp"}
                alt=""
                height={600}
                width={1200}
                sizes="100vw"
                className="h-[300px] md:h-[400px]  w-full object-cover"
            />
            <div className="templateContainer py-10  md:py-9 lg:py-20 space-y-5">
                <h2 className="text-[26px] leading-[1.25] md:text-[30px] lg:text-[34px] -tracking-[0.01em] font-medium uppercase text-center text-white">
                    Crafted To Last
                </h2>
                <p className="text-[14px] md:text-[16px] font-extralight tracking-wide text-white max-w-[900px] text-center mx-auto">
                    Every product we offer is handcrafted by skilled artisans using
                    ethically sourced, 100% genuine leather. From cutting and stitching to
                    finishing, each step is done with care, precision, and passion —
                    ensuring you get a piece that is not just beautiful, but built to
                    last.
                </p>
            </div>
            <Image
                src={"/banners/3.webp"}
                alt=""
                height={600}
                width={1200}
                sizes="100vw"
                className="h-[300px] md:h-[400px]  w-full object-cover"
            />
            <div className="templateContainer py-10  md:py-9 lg:py-20 space-y-5">
                <h2 className="text-[26px] leading-[1.25] md:text-[30px] lg:text-[34px] -tracking-[0.01em] font-medium uppercase text-center text-white">
                    Handcrafted by Real Artisans
                </h2>
                <p className="text-[14px] md:text-[16px] font-extralight tracking-wide text-white max-w-[900px] text-center mx-auto">
                    Each piece is made by skilled hands, not mass-produced in a factory.
                    Our artisans come from generations of leather craftsmanship, adding
                    soul to every stitch.
                </p>
            </div>
            <Image
                src={"/banners/3.webp"}
                alt=""
                height={600}
                width={1200}
                sizes="100vw"
                className="h-[300px] md:h-[400px]  w-full object-cover"
            />
            <div className="templateContainer py-10  md:py-9 lg:py-20 space-y-5">
                <h2 className="text-[26px] leading-[1.25] md:text-[30px] lg:text-[34px] -tracking-[0.01em] font-medium uppercase text-center text-white">
                    No Shortcuts, No Compromises
                </h2>
                <p className="text-[14px] md:text-[16px] font-extralight tracking-wide text-white max-w-[900px] text-center mx-auto">
                    We don’t cut corners to save costs. Every jacket and accessory is cut,
                    stitched, and finished with care — the same way it has been done for
                    decades.
                </p>
            </div>
            <Image
                src={"/banners/3.webp"}
                alt=""
                height={600}
                width={1200}
                sizes="100vw"
                className="h-[300px] md:h-[400px]  w-full object-cover"
            />
        </div>
    )
}

export async function generateStaticParams() {
    return []
  }