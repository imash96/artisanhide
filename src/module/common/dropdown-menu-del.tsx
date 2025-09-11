"use client";

import { Root, Trigger, Content, Item } from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";

type DropdownOption = {
    label: string;
    value: string;
};

type DropdownProps = {
    options: DropdownOption[];
    value: string;
    onChange: (value: string) => void;
} & React.PropsWithChildren

export default function DropdownMenu({ children, options, value, onChange }: DropdownProps) {
    return (
        <Root>
            <Trigger asChild>
                {children}
            </Trigger>

            <Content
                align="end"
                sideOffset={2}
                className="z-50 min-w-[10rem] rounded-lg border border-border bg-card space-y-1 p-1 shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95"
            >
                {options.map((option) => (
                    <Item
                        key={option.value}
                        onSelect={() => onChange(option.value)}
                        className={`relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition ${value === option.value ? "bg-background-muted font-medium text-primary" : "text-foreground-muted hover:bg-background-muted focus:bg-background-muted focus:text-foreground hover:text-foreground"}`}
                    >
                        <span className="flex-1">{option.label}</span>
                        {value === option.value && (
                            <Check className="ml-2 h-4 w-4 text-primary" />
                        )}
                    </Item>
                ))}
            </Content>
        </Root>
    );
}
