"use client"

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";
import type { EmblaOptionsType } from "embla-carousel";
import { ChevronLeft } from "lucide-react";
import Container from '@module/common/create-section';
import { announcements } from "@/JSON/announcement";

const options: EmblaOptionsType = { loop: true }

export default function Announcement() {
    const [emblaRef, emblaApi] = useEmblaCarousel(options, [Autoplay({ stopOnInteraction: false, delay: 3000 })])
    const [prevBtnDisabled, setPrevBtnDisabled] = useState(true)
    const [nextBtnDisabled, setNextBtnDisabled] = useState(true)

    const scrollPrev = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollPrev();
        emblaApi.plugins().autoplay.reset()
    }, [emblaApi])
    const scrollNext = useCallback(() => {
        if (!emblaApi) return
        emblaApi.scrollNext();
        emblaApi.plugins().autoplay.reset()
    }, [emblaApi])

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setPrevBtnDisabled(!emblaApi.canScrollPrev())
        setNextBtnDisabled(!emblaApi.canScrollNext())
    }, [])

    useEffect(() => {
        if (!emblaApi) return

        onSelect()
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)

        return () => {
            emblaApi.off('select', onSelect)
            emblaApi.off('reInit', onSelect)
        }
    }, [emblaApi, onSelect])


    return (
        <div className="bg-primary text-primary-foreground select-none">
            <Container>
                <div className="flex items-center justify-between h-9">
                    <button onClick={scrollPrev} disabled={prevBtnDisabled} aria-label="Previous announcement">
                        <ChevronLeft className="h-4 w-4 shrink-0" />
                    </button>
                    <div className="overflow-hidden no-scrollbar text-xs font-title" ref={emblaRef}>
                        <div className="flex">
                            {announcements.map((text, index) => (
                                <span className="flex-[0_0_100%] size-full my-auto tracking-wide text-center" key={index}>
                                    {text}
                                </span>
                            ))}
                        </div>
                    </div>
                    <button onClick={scrollNext} disabled={nextBtnDisabled} aria-label="Next announcement">
                        <ChevronLeft className="h-4 w-4 rotate-180 shrink-0" />
                    </button>
                </div>
            </Container >
        </div >
    )
}