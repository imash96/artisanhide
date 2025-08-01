"use client";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Minus, MoveLeft, MoveRight } from "lucide-react";
import { testimonials } from "../testimonials";
import { AnimatePresence, motion } from "motion/react";
import RatingSystem from "@modules/common/rating-system";

import "@/styles/testimonials.css"

export default function Testimonials() {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
    const [selectedIndex, setSelectedIndex] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelectedIndex(emblaApi.selectedScrollSnap());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        onSelect(); // sync initially
        emblaApi.on("select", onSelect);
        return () => {
            emblaApi?.off("select", onSelect);
        }
    }, [emblaApi, onSelect]);

    return (
        <div className="max-w-6xl mx-auto flex flex-col px-4 md:px-16 lg:px-32 py-12 md:py-8 gap-y-8 lg:gap-y-10 lg:py-14">
            <h2 className="text-center text-[24px] lg:text-[30px] tracking-tight font-normal text-brown">
                Our Customer Feedbacks
            </h2>

            <div className="testembla relative overflow-hidden no-scrollbar">
                <div className="testembla__viewport no-scrollbar" ref={emblaRef}>
                    <div className="testembla__container">
                        {testimonials.map((item, index) => {
                            const distance = Math.abs(selectedIndex - index);
                            const scale = [1, 0.7, 0.5][distance] || 0.4;
                            return (
                                <div className="testembla__slide" key={item.id}>
                                    <div className="testembla__slide__number border overflow-hidden no-scrollbar aspect-[4/4] transition-transform duration-500 ease-in-out" style={{ transform: `scale(${scale})`, opacity: scale }}>
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            height={200}
                                            width={200}
                                            className="h-full w-full object-cover transition-opacity duration-300"
                                            style={{ opacity: selectedIndex === index ? 1 : 0.5 }}
                                        />
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                <button onClick={scrollPrev} aria-label="Previous testimonial" className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <MoveLeft size={18} strokeWidth={1.5} />
                </button>

                <button onClick={scrollNext} aria-label="Next testimonial" className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center">
                    <MoveRight size={18} strokeWidth={1.5} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.2 }}
                    className="relative max-w-md mx-auto text-center flex flex-col justify-center">
                    <div className="space-y-4 animate-fade-in-up">
                        <RatingSystem rating={testimonials[selectedIndex].star} className="justify-center" />

                        <p className="text-gray-800 text-sm font-light leading-snug tracking-wide">
                            {testimonials[selectedIndex].review}
                        </p>

                        <div className="flex items-center justify-center gap-1 text-lg text-gray-800 tracking-wide">
                            <Minus strokeWidth={1} size={18} />
                            {testimonials[selectedIndex].name}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}