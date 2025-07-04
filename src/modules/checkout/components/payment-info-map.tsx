import Bancontact from "@/icons/bancontact";
import CreditCard from "@/icons/credit-card";
import Ideal from "@/icons/ideal";
import PayPal from "@/icons/paypal";

/* Map of payment provider_id to their title and icon. Add in any payment providers you want to use. */
export const paymentInfoMap: Record<string, { title: string; icon: React.JSX.Element }> = {
    pp_stripe_stripe: {
        title: "Credit card",
        icon: <CreditCard />,
    },
    "pp_stripe-ideal_stripe": {
        title: "iDeal",
        icon: <Ideal />,
    },
    "pp_stripe-bancontact_stripe": {
        title: "Bancontact",
        icon: <Bancontact />,
    },
    pp_paypal_paypal: {
        title: "PayPal",
        icon: <PayPal />,
    },
    pp_system_default: {
        title: "Manual Payment",
        icon: <CreditCard />,
    },
    // Add more payment providers here
}