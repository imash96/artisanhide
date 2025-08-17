"use client"

import { useState, useCallback, useEffect } from "react"
import useEmblaCarousel from "embla-carousel-react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { StoreProductImage } from "@medusajs/types"

type ProductGalleryProps = {
    images: StoreProductImage[] | null
    title: string
    className?: string
}

export default function ProductGallery({ images, title, className }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [emblaMainRef, emblaMainApi] = useEmblaCarousel({ loop: true })
    const [emblaThumbsRef, emblaThumbsApi] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
        axis: "y",
    })

    const onThumbClick = useCallback((index: number) => {
        if (!emblaMainApi) return
        emblaMainApi.scrollTo(index)
    }, [emblaMainApi])

    const onSelect = useCallback(() => {
        if (!emblaMainApi) return
        const snap = emblaMainApi.selectedScrollSnap()
        setSelectedIndex(snap)
        emblaThumbsApi?.scrollTo(snap)
    }, [emblaMainApi, emblaThumbsApi])

    useEffect(() => {
        if (!emblaMainApi) return
        onSelect()
        emblaMainApi.on("select", onSelect).on('reInit', onSelect)
        return () => emblaMainApi.destroy()
    }, [emblaMainApi, onSelect])

    const scrollPrev = useCallback(() => emblaMainApi?.scrollPrev(), [emblaMainApi])
    const scrollNext = useCallback(() => emblaMainApi?.scrollNext(), [emblaMainApi])

    return (
        <div className={`relative flex flex-col-reverse md:flex-row lg:sticky top-0 gap-2 ${className}`}>
            {/* Thumbnails (Mobile = Horizontal | Desktop = Vertical) */}
            <div className="overflow-x-scroll no-scrollbar p-1" ref={emblaThumbsRef}>
                <div className="flex md:flex-col w-max gap-2">
                    {images?.map((image, index) => (
                        <button
                            key={index}
                            className={`relative aspect-[3/4] w-16 md:w-14 rounded-sm transition-transform duration-200 hover:scale-105 ${index === selectedIndex ? "border-b-4 border-brown shadow-sm" : "border border-transparent hover:border-brown"}`}
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
            <div className="w-full m-auto relative overflow-hidden flex-1 no-scrollbar border" ref={emblaMainRef}>
                <div className="flex touch-pan-y touch-pinch-zoom gap-x-2">
                    {images?.map((image, index) => (
                        <div key={index} className="min-w-0 grow-0 shrink-0 basis-full select-none aspect-[.75]">
                            <Image
                                src={image.url || "/placeholder.svg"}
                                alt={`${title} - Image ${index + 1}`}
                                sizes="100vw"
                                height={4}
                                width={4}
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
                    className="absolute left-0 top-1/2 -translate-y-1/2  bg-white px-1 py-2 md:px-2 md:py-3 shadow-lg"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-5 w-5 text-gray-800" />
                </button>
                <button
                    aria-label="Next image"
                    className="absolute right-0 top-1/2 -translate-y-1/2  bg-white px-1 py-2 md:px-2 md:py-3 shadow-lg"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-5 w-5 text-gray-800" />
                </button>
            </div>
        </div >
    )
}