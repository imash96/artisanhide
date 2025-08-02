import AuthLayout from "@/layouts/account/auth-layout";
import DashLayout from "@/layouts/account/dash-layout";
import { retrieveCustomer } from "@libs/actions/customer";
import Container from "@modules/common/create-section";
import InteractiveLink from "@modules/common/interactive-link";
import { redirect } from "next/navigation";

export default async function Layout({ dash, auth }: AcccountLayoutProp) {
    const customer = await retrieveCustomer().catch(() => null)

    // If no customer and trying to access a dash route, force login.
    if (!customer && dash) redirect("/account");


    return (
        <Container width={7} className="py-6 md:py-10 lg:py-12">
            {customer ? <DashLayout customer={customer}>{dash}</DashLayout> : <AuthLayout>{auth}</AuthLayout>}
            <hr />
            <div className="py-8">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Got questions?</h3>
                    <span className="text-base">
                        You can find frequently asked questions and answers on our
                        customer service page.
                    </span>
                </div>
                <div className="float-right mt-4">
                    <InteractiveLink href="/customer-service">
                        Customer Service
                    </InteractiveLink>
                </div>
            </div>
        </Container>
    )
}

type AcccountLayoutProp = {
    dash?: React.ReactNode
    auth?: React.ReactNode
}