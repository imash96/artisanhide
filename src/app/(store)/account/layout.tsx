import AccountFooter from "@/layout/account/components/account-footer";
import { retrieveCustomer } from "@lib/action/customer";
import Container from "@module/common/create-section";
import SignoutButton from "@/layout/account/components/logout";
import { notFound } from "next/navigation";
import { UserRound } from "lucide-react";
import { use } from "react";
import DashNav from "@/layout/account/templates/dash-nav";

export default function Layout({ children }: LayoutProps<"/account">) {
    const customer = use(retrieveCustomer());
    if (!customer) return notFound()
    const fullName = `${customer.first_name || ''} ${customer.last_name || ''}`.trim() || 'Customer';
    return (
        <Container width={7} className="py-6 md:py-10 lg:py-12">
            <div className="flex flex-col lg:flex-row min-h-screen">
                {/* Sidebar */}
                <aside className="lg:mx-4 lg:sticky top-16 h-fit space-y-4 divide-y border-b border-border lg:border-b-0 lg:pr-0">
                    {/* Customer Info */}
                    <div className="flex items-center gap-4 py-4 px-4">
                        <div className="min-w-[60px] h-[60px] flex items-center justify-center rounded-full border border-accent">
                            <UserRound size={26} className="text-accent" strokeWidth={1.2} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-base font-semibold truncate">{fullName}</h3>
                            <p className="text-sm text-foreground-muted truncate">{customer.email}</p>
                            <SignoutButton />
                        </div>
                    </div>
                    <DashNav />
                </aside>

                <main className="flex-1 lg:pl-6 py-6 lg:border-l">{children}</main>
            </div>
            <hr />
            <AccountFooter />
        </Container>
    )
}