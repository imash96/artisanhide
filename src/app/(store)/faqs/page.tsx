"use client"

import Link from "next/link";
import { useState } from "react";
import { FAQS } from "../../../JSON/faq";
import Container from "@module/common/create-section";

export default function Page() {
    return (
        <Container className="space-y-8 py-10 md:py-10 lg:py-14">
            <div className="space-y-2.5">
                <h1 className="text-2xl md:text-3xl font-light text-center">
                    Frequently Asked Questions
                </h1>
                <p className="text-sm font-light tracking-wide max-w-xl text-center mx-auto">
                    These are the most common questions about Artisan Hide. Can&apos;t
                    find what you&apos;re looking for?{" "}
                    <Link href={"/contact-us"} className="font-medium underline underline-offset-2" >
                        Contact
                    </Link>
                </p>
            </div>
            <FaqSection />
        </Container>
    )
}

function FaqSection() {
    const [openItem, setOpenItem] = useState<string | null>(null);

    const handleToggle = (itemValue: string) => {
        setOpenItem((prevValue) => (prevValue === itemValue ? null : itemValue));
    };

    return (
        <div className="max-w-[45rem] mx-auto">
            <div className="">
                <div>
                    {FAQS.map((faq, index) => (
                        <div key={index} className="border-b border-accent">
                            {/* Question */}
                            <button
                                className={`w-full BricolageGrotesqueFont flex cursor-pointer  justify-between items-center px-4 py-6 text-left tracking-wide hover:bg-background-muted focus:outline-none ${openItem === faq.question ? "" : ""
                                    }`}
                                onClick={() => handleToggle(faq.question)}
                            >
                                <span className="text-sm font-light">{faq.question}</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className={`w-5 h-5 transform transition-transform duration-500 ${openItem === faq.question ? "rotate-180" : "rotate-0"
                                        }`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            {/* Answer */}
                            <div
                                className={`overflow-hidden BricolageGrotesqueFont transition-all duration-500 ${openItem === faq.question ? "max-h-40" : "max-h-0"
                                    }`}
                                style={{
                                    maxHeight: openItem === faq.question ? "1000px" : "0px",
                                }}
                            >
                                <div className="p-4 text-foreground-muted text-[13px]  tracking-wider">
                                    {faq.answer}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}