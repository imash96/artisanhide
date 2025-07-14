import { retrieveCustomer } from "@libs/actions/customer"
import Container from "@modules/common/create-section"
import InteractiveLink from "@modules/common/interactive-link"

type AcccountLayoutProp = {
    dash?: React.ReactNode
    auth?: React.ReactNode
}

export default async function AccountPageLayout({ dash, auth }: AcccountLayoutProp) {

    const customer = await retrieveCustomer().catch(() => null)

    return (
        <Container width={7}>
            {customer ? dash : auth}
            <hr />
            <div className="py-12">
                <div>
                    <h3 className="text-xl font-semibold mb-4">Got questions?</h3>
                    <span className="text-base">
                        You can find frequently asked questions and answers on our
                        customer service page.
                    </span>
                </div>
                <div className="float-right">
                    <InteractiveLink href="/customer-service">
                        Customer Service
                    </InteractiveLink>
                </div>
            </div>
        </Container>
    )
}