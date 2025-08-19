"use client"

import * as AccordionPrimitive from "@radix-ui/react-accordion"
import { ChevronDown } from "lucide-react"

import "@/styles/accordion.css";

export function Accordion({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Root>) {
    return (
        <AccordionPrimitive.Root className={`border-t ${className ?? ""}`}
            {...props}
        >
            {children}
        </AccordionPrimitive.Root>
    )
}

export function AccordionItem({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>) {
    return (
        <AccordionPrimitive.Item className={`border-b transition ${className ?? ""}`}
            {...props}
        >
            {children}
        </AccordionPrimitive.Item>
    )
}

export function AccordionTrigger({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>) {
    return (
        <AccordionPrimitive.Header>
            <AccordionPrimitive.Trigger
                className={`flex items-center justify-between py-4 px-2 w-full ${className ?? ""}`} {...props}
            >
                {children}
                <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200 data-[state=open]:rotate-180" />
            </AccordionPrimitive.Trigger>
        </AccordionPrimitive.Header>
    )
}

export function AccordionContent({ className, children, ...props }: React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>) {
    return (
        <AccordionPrimitive.Content className={`pb-4 pt-1 text-gray-600 text-sm leading-relaxed data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down ${className ?? ""}`} {...props}>
            {children}
        </AccordionPrimitive.Content>
    )
}