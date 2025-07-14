import Addresses from "@modules/account/templates/addresses";
import Measurements from "@modules/account/templates/measurements";
import Orders from "@modules/account/templates/orders";
import Profile from "@modules/account/templates/profile";
import Wishlist from "@modules/account/templates/wishlist";
import { notFound } from "next/navigation";

export default async function Page({ params }: { params: Promise<{ tab: string }> }) {
    return renderView((await params).tab)
}

const renderView = (tab: string) => {
    switch (tab) {
        case "profile":
            return <Profile />;
        case "addresses":
            return <Addresses />;
        case "orders":
            return <Orders />;
        case "wishlist":
            return <Wishlist />;
        case "measurements":
            return <Measurements />;
        // case "logout":
        //     return <Logout />;
        default:
            return notFound;
    }
};