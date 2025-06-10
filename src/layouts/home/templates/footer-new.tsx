import type { StoreRegion } from "@medusajs/types";
import Container from "@modules/common/create-section";

export default async function Footer({ regions }: { regions: StoreRegion[] }) {

    return (
        <footer aria-labelledby="footer-heading" className="footer bg-brown text-gray-50 pb-4 lg:pb-0">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container>
                <div className="">ooter</div>
            </Container>
        </footer>
    )
}