"use client";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import { Minus, MoveLeft, MoveRight } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import RatingSystem from "@module/common/rating-system";
import { testimonials } from "@/JSON/testimonials";

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
        onSelect();
        emblaApi.on("select", onSelect);
        return () => emblaApi?.destroy();
    }, [emblaApi, onSelect]);

    return (
        <div className="max-w-6xl mx-auto px-4 md:px-12 lg:px-20 py-12 lg:py-16">
            <h2 className="text-center text-2xl lg:text-3xl font-semibold tracking-tight text-foreground mb-8">
                Our Customer Feedbacks
            </h2>

            <div className="relative">
                <div className="overflow-hidden no-scrollbar" ref={emblaRef}>
                    <div className="flex touch-pan-y -ml-12 sm:-ml-6">
                        {testimonials.map((item, index) => {
                            const isActive = selectedIndex === index;
                            const distance = Math.abs(selectedIndex - index);
                            const scale = [1, 0.6, 0.3][distance] || 0.3;
                            return (
                                <div key={item.id} className="flex-[0_0_30%] md:flex-[0_0_20%] min-w-0 pl-12 md:pl-6">
                                    <div className="rounded-xl overflow-hidden no-scrollbar shadow-md aspect-square transition-transform duration-500 ease-out" style={{ transform: `scale(${scale})`, opacity: isActive ? 1 : 0.5, }}>
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

                <button onClick={scrollPrev} aria-label="Previous testimonial" className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 shadow hover:bg-background transition">
                    <MoveLeft size={18} strokeWidth={1.5} />
                </button>

                <button onClick={scrollNext} aria-label="Next testimonial" className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/70 shadow hover:bg-background transition">
                    <MoveRight size={18} strokeWidth={1.5} />
                </button>
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={selectedIndex}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.25 }}
                    className="max-w-lg mx-auto mt-8 text-center">
                    <div className="animate-fade-in-up">
                        <RatingSystem size="lg" averageRating={testimonials[selectedIndex].star} type="test" className="justify-center mb-4" />

                        <p className="text-foreground text-base font-light leading-relaxed">
                            {testimonials[selectedIndex].review}
                        </p>

                        <div className="flex items-center justify-center gap-1 text-lg text-foreground-muted mt-1">
                            <Minus strokeWidth={1} size={18} />
                            {testimonials[selectedIndex].name}
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}