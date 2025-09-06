'use client';

import { useMemo, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";
import AccountFooter from "@/layout/account/components/account-footer";
import CustomInput from "@module/common/custom-input";
import { FAQS } from "@/JSON/faq";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent, } from "@module/common/custom-accordion";

export default function Page() {
    const [query, setQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState("");

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(query.toLowerCase());
        }, 300);
        return () => clearTimeout(handler);
    }, [query]);

    const popularFAQs = useMemo(() => FAQS.filter(f => f.popular).slice(0, 4), []);

    const filteredFAQs = useMemo(() => {
        return FAQS.filter(faq => {
            const matchesQuery = !debouncedQuery ||
                faq.question.toLowerCase().includes(debouncedQuery) ||
                (typeof faq.answer === 'string' && faq.answer.toLowerCase().includes(debouncedQuery));
            return matchesQuery;
        });
    }, [debouncedQuery]);

    return (
        <div className="py-16 sm:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
                {/* Header Section */}
                <header className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Help Center</h1>
                    <p className="max-w-2xl mx-auto text-lg text-foreground-muted">
                        Find answers to your questions. If you can't find what you're looking for, feel free to{' '}
                        <a href="/contact-us" className="font-medium text-blue-600 hover:underline">contact our support team</a>.
                    </p>
                    <CustomInput
                        className="mt-6 relative max-w-xl mx-auto"
                        type="text"
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                        label="Search for questions..."
                    />
                </header>

                {/* Main Content */}
                <main>
                    {/* Popular Questions Section */}
                    <section>
                        <h2 className="text-2xl font-semibold mb-6">Popular Questions</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {popularFAQs.map((faq) => (
                                <div key={faq.question} className="border border-border rounded-lg p-6 bg-background-elevated hover:shadow-md hover:border-accent transition-all">
                                    <h3 className="font-semibold mb-2">{faq.question}</h3>
                                    <p className="text-sm text-foreground-muted line-clamp-3">{faq.answer}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* All Questions Section */}
                    <section className="mt-12">
                        {filteredFAQs.length > 0 ? (
                            <Accordion type="single" collapsible className="border rounded-lg overflow-hidden">
                                {filteredFAQs.map((faq, idx) => (
                                    <AccordionItem key={idx} value={`faq-${idx}`}>
                                        <AccordionTrigger className="text-left p-6">
                                            <span className="font-medium">{faq.question}</span>
                                        </AccordionTrigger>
                                        <AccordionContent>
                                            <div className="overflow-hidden no-scrollbar">
                                                <div className="prose prose-sm text-foreground-muted max-w-none px-6 pb-6">
                                                    {typeof faq.answer === 'string' ? <p>{faq.answer}</p> : faq.answer}
                                                </div>
                                            </div>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        ) : (
                            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                                <Sparkles className="mx-auto h-10 w-10" />
                                <h3 className="mt-2 text-lg font-medium">No Questions Found</h3>
                                <p className="mt-1 text-sm text-foreground-muted">Your search for "{query}" did not return any results.</p>
                            </div>
                        )}
                    </section>
                </main>
                <AccountFooter />
            </div>
        </div>
    );
};

