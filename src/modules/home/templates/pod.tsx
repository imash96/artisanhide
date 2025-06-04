import Handcrafted from "@/icons/pod-handcrafted";
import Rating from "@/icons/pod-rating";
import Review from "@/icons/pod-review";
import Support from "@/icons/pod-support";
import IconWithText from "@modules/home/components/icon-with-text";

export default function POD() {
    return (
        <IconWithText data={podData} />
    )
}

const podData = [
    {
        name: "1272+",
        Icon: Review,
        description: "Positive Review",
    },
    {
        name: "10000+",
        Icon: Rating,
        description: "Customers Served",
    },
    {
        name: "24x7",
        Icon: Support,
        description: "Chat Support",
    },
    {
        name: "Handcrafted",
        Icon: Handcrafted,
        description: "Customize Products",
    },
];