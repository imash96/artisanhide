import CreditCard from "@/icon/checkout-creditcard";
import PayPal from "@/icon/checkout-paypal";
import { IconProp } from "@/type/common";
import ManualContainer from "@module/checkout/components/container-manual";
import PayPalContainer from "@module/checkout/components/container-paypal";
import StripeContainer from "@module/checkout/components/container-stripe";
import { Bot } from "lucide-react";

export const paymentInfoMap = {
    pp_stripe_stripe: {
        title: "Credit Card",
        desc: "Pay securely with credit/debit card",
        Icon: CreditCard,
        Preview: StripeContainer
    },
    pp_paypal_paypal: {
        title: "PayPal",
        desc: "PayPal to complete your purchase securely.",
        Icon: PayPal,
        Preview: PayPalContainer
    },
    pp_system_default: {
        title: "Manual Payment",
        desc: "For testing purposes",
        Icon: Bot,
        Preview: ManualContainer
    },
} as Record<string, PIM>

type PIM = {
    title: string;
    desc: string;
    Icon: ({ width, color, ...props }: IconProp) => React.JSX.Element
    Preview: () => React.JSX.Element
}