import Logo from "@/icons/logo";
import { IconProp } from "@/types/common";
import Container from "@modules/common/create-section";
import Link from "next/link"
import { Clock, Mail, MessageCircleQuestion } from "lucide-react";
import { footer } from "../footer";
import { StoreRegion } from "@medusajs/types";
import HeaderCountrySelect from "../components/footer-country-select";
import { cookies } from "next/headers";

export default async function Footer({ regions }: { regions: StoreRegion[] }) {
    const cookieStore = await cookies()
    const countryCode = cookieStore.get('__country_code')?.value
    return (
        <footer aria-labelledby="footer-heading" className="footer bg-brown text-gray-50 pb-4 lg:pb-0">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container>
                <div className="grid grid-cols-1 gap-8 px-4 py-10 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-4 lg:grid-rows-1">
                    <div className="grid gap-y-6">
                        <Logo className="w-32 fill-gray-50" />
                        {contactInfo.map((info, idx) => (
                            <div key={idx} className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <info.icon size={18} strokeWidth={1.5} className="text-white" />
                                    <span className="text-base tracking-wide">{info.title}</span>
                                </div>
                                <p className="text-sm tracking-wider px-4">{info.content}</p>
                            </div>
                        ))}
                        {regions && <HeaderCountrySelect regions={regions} countryCode={countryCode} />}
                    </div>
                    {Object.entries(footer).map(([title, data]) => <FooterTop key={title} title={title} data={data} />)}
                </div>
                <div className="flex flex-col gap-y-4 md:flex-row-reverse py-4 text-center items-center justify-between">
                    <img className="inline-block align-middle h-12 w-auto" loading="lazy" aria-hidden="true" src="/images/contents/StripeBadge.png" />
                    <p>&copy; {new Date().getFullYear()} Artisan Hide</p>
                </div>
            </Container>
        </footer>
    )
}

const FooterTop = ({ title, data }: FooterTopProps) => {
    return (
        <ul className="grid grid-cols-2 md:grid-cols-1 w-full gap-y-4">
            <li className="useful-link text-lg tracking-widest col-span-2 md:col-span-1">
                {title}
            </li>
            {data.map((item) => (
                <li key={item.name} className="listHoverAnimation list-none text-base">
                    <Link key={item.name} href={item.href} className="flex items-center gap-x-2">
                        {item.icon && <item.icon className="w-5 h-5" />}
                        {item.name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}

const contactInfo = [
    {
        icon: Clock,
        title: "Our Timing",
        content: "Mon to Sat - 11:00 AM to 7:30 PM",
    },
    {
        icon: MessageCircleQuestion,
        title: "Order Query",
        content: "Contact: 98-6777-2418",
    },
    {
        icon: Mail,
        title: "Email Us",
        content: "contact@artisanhide.com",
    },
];

type FooterTopProps = {
    title: string
    data: {
        name: string;
        href: string;
        icon?: ({ ...props }: IconProp) => React.ReactNode
    }[]
}