import HeaderClient from "../components/header-client";
import HeaderWrapper from "../components/header-wrapper";

export default async function Header() {
    return (
        <HeaderClient>
            <HeaderWrapper />
        </HeaderClient>
    )
}