import CreditCard from "@/icon/checkout-creditcard";
import PayPal from "@/icon/checkout-paypal";
import { IconProp } from "@/type/common";
import { Bot } from "lucide-react";

export const paymentInfoMap = {
    pp_stripe_stripe: {
        title: "Credit Card",
        desc: "Pay securely with credit/debit card",
        Icon: CreditCard
    },
    pp_paypal_paypal: {
        title: "PayPal",
        desc: "PayPal to complete your purchase securely.",
        Icon: PayPal,
    },
    pp_system_default: {
        title: "Manual Payment",
        desc: "For testing purposes",
        Icon: Bot,
    },
} as Record<string, PIM>

type PIM = {
    title: string;
    desc: string;
    Icon: ({ width, color, ...props }: IconProp) => React.JSX.Element
}