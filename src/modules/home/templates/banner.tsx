import Image from "next/image";

export default function BannerSlider() {
    return (
        <div className="relative w-full h-[75vh] lg:h-[80vh] -mt-[4.5rem]">
            <div className="h-full w-full hidden lg:block">
                <Image
                    src="/temp_img/desktopBanner.webp"
                    alt={" Banner"}
                    quality={100}
                    sizes="100vw"
                    className="h-full w-full object-cover object-top"
                    height={9}
                    width={16}
                    priority
                />
            </div>
            <div className="h-full w-full lg:hidden">
                <Image
                    src="/temp_img/mobileBanner.jpg"
                    alt={" Banner"}
                    quality={100}
                    sizes="100vw"
                    className="h-full w-full object-cover object-top"
                    height={6}
                    width={3}
                    priority
                />
            </div>
            <div className="hidden lg:block absolute inset-0 bg-black/25" />
        </div>
    );
};
