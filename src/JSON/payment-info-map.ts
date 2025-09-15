import CreditCard from "@/icon/checkout-creditcard";
import PayPal from "@/icon/checkout-paypal";
import { IconProp } from "@/type/common";
import ManualContainer from "@module/checkout/components/container-manual";
import PayPalContainer from "@module/checkout/components/container-paypal";
import StripeContainer from "@module/checkout/components/container-stripe";
import { Clock } from "lucide-react";

export const paymentInfoMap = {
    pp_stripe_stripe: {
        title: "Credit Card",
        desc: "Pay securely with your credit or debit card.",
        Icon: CreditCard,
        Preview: StripeContainer,
    },
    pp_paypal_paypal: {
        title: "PayPal",
        desc: "Complete your purchase quickly and securely with PayPal.",
        Icon: PayPal,
        Preview: PayPalContainer,
    },
    pp_system_default: {
        title: "Pay Later",
        desc: "Place your order now and pay later using your preferred method.",
        Icon: Clock,
        Preview: ManualContainer,
    },
} as Record<string, PIM>

type PIM = {
    title: string;
    desc: string;
    Icon: ({ width, color, ...props }: IconProp) => React.JSX.Element
    Preview: () => React.JSX.Element
}