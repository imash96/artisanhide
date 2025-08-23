"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { StoreProductImage } from "@medusajs/types"

type ProductGalleryProps = {
    images: StoreProductImage[] | null
    title: string
}

export default function ProductGallery({ images, title }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true })
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
        axis: "x",
        breakpoints: {
            '(min-width: 768px)': { axis: 'y' },
        }
    }, [])

    const onThumbClick = useCallback((index: number) => {
        if (!emblaMainApi || !emblaThumbsApi) return
        emblaMainApi.scrollTo(index)
    }, [emblaMainApi, emblaThumbsApi])

    const onSelect = useCallback(() => {
        if (!emblaMainApi || !emblaThumbsApi) return
        const snap = emblaMainApi.selectedScrollSnap()
        setSelectedIndex(snap)
        emblaThumbsApi.scrollTo(snap)
    }, [emblaMainApi, emblaThumbsApi])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on('select', onSelect).on('reInit', onSelect)

        return () => {
            emblaMainApi?.destroy();
        }
    }, [emblaMainApi, onSelect])

    const scrollPrev = useCallback(() => emblaMainApi?.scrollPrev(), [emblaMainApi])
    const scrollNext = useCallback(() => emblaMainApi?.scrollNext(), [emblaMainApi])

    return (
        <>
            {/* Thumbnails (Mobile = Horizontal | Desktop = Vertical) */}
            <div className="relative md:max-h-[calc(100vh-12rem)] overflow-auto no-scrollbar p-1" ref={emblaThumbsRef}>
                <div className="flex md:flex-col w-max gap-2">
                    {images?.map((image, index) => (
                        <button
                            key={index}
                            className={`relative aspect-[3/4] bg-same-white w-16 md:w-14 rounded-sm transition-transform duration-200 hover:scale-105 ${index === selectedIndex ? "border-b-4 border-accent shadow-sm" : "border border-transparent hover:border-accent"}`}
                            onClick={() => onThumbClick(index)}
                        >
                            <Image
                                src={image.url || "/placeholder.svg"}
                                alt={`${title} thumbnail ${index + 1}`}
                                fill
                                className="object-contain h-full w-full object-center p-0.5"
                            />
                        </button>
                    ))}
                </div>
            </div>

            {/* Main Image Carousel */}
            <div className="w-full m-auto relative overflow-hidden flex-1 no-scrollbar border border-border bg-same-white" ref={emblaMainRef}>
                <div className="flex touch-pan-y touch-pinch-zoom gap-x-2">
                    {images?.map((image, index) => (
                        <div key={index} className="flex-[0_0_100%] min-w-0 select-none aspect-[3/4]">
                            <Image
                                src={image.url || "/placeholder.svg"}
                                alt={`${title} - Image ${index + 1}`}
                                sizes="100vw"
                                width={1200}
                                height={1600}
                                className="object-contain h-full w-full object-center text-transparent p-0.5"
                                priority={index === 0}
                                fetchPriority={index == 0 ? "high" : "auto"}
                            />
                        </div>
                    ))}
                </div>

                {/* Navigation Buttons */}
                <button
                    aria-label="Previous image"
                    className="absolute left-0 top-1/2 -translate-y-1/2  bg-accent px-1 py-2 md:px-2 md:py-3 shadow-lg"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-5 w-5 text-accent-foreground" />
                </button>
                <button
                    aria-label="Next image"
                    className="absolute right-0 top-1/2 -translate-y-1/2  bg-accent px-1 py-2 md:px-2 md:py-3 shadow-lg"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-5 w-5 text-accent-foreground" />
                </button>
            </div>
        </ >
    )
}