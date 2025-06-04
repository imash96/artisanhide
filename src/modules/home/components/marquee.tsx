import Image from "next/image"

export default function Marquee({ images, direction = "forward", duration = 20, className }: MarqueeProps) {

    return (
        <div className={`overflow-hidden whitespace-nowrap ${className}`}>
            <div
                className="inline-flex animate-marquee"
                style={{
                    animationDuration: `${duration}s`,
                    animationDirection: direction === "forward" ? "normal" : "reverse",
                }}
            >
                {images.map((img, index) => (
                    <div key={index} className="flex-shrink-0 mx-2 relative" style={{ width: "240px", height: "260px" }}>
                        <Image
                            src={img.src || "/placeholder.svg"}
                            alt={`Marquee image ${(index % images.length) + 1}`}
                            fill
                            className="shadow-md object-cover object-center hover:scale-105 hover:rotate-2 transition-transform ease-in-out duration-300 h-full w-full"
                            sizes="240px"
                            priority={index < 4} // Prioritize first few images
                        />
                    </div>
                ))}
                {images.map((img, index) => (
                    <div key={index} className="flex-shrink-0 mx-2 relative" style={{ width: "240px", height: "260px" }} aria-hidden="true">
                        <Image
                            src={img.src || "/placeholder.svg"}
                            alt={`Marquee image ${(index % images.length) + 1}`}
                            fill
                            className="shadow-md object-cover object-center hover:scale-105 hover:rotate-2 transition-transform ease-in-out duration-300 h-full w-full"
                            sizes="240px"
                            priority={index < 4} // Prioritize first few images
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

type MarqueeImages = {
    src: string;
    alt: string;
    width?: number;
    height?: number;
}

interface MarqueeProps {
    images: MarqueeImages[]
    direction?: "forward" | "backward"
    duration?: number
    className?: string
}