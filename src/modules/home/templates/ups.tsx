import Delivery from "@/icons/ups-delivery";
import Payment from "@/icons/ups-payment";
import Return from "@/icons/ups-return";
import Leather from "@/icons/usp-leather";
import IconWithText from "@modules/home/components/icon-with-text";

export default function USP() {
    return (
        <IconWithText data={uspData} />
    )
}

const uspData = [
    {
        name: "Premium Leather",
        Icon: Leather,
        description: "Sourced from the finest tannerie.",
    },
    {
        name: "Secure Payment",
        Icon: Payment,
        description: "Contact support team 24x7 365 days.",
    },
    {
        name: "Easy returns",
        Icon: Return,
        description: "Not what expected Return & get full refund.",
    },
    {
        name: "Free Delivery",
        Icon: Delivery,
        description: "Receive your products within 5-6 Days.",
    },
];