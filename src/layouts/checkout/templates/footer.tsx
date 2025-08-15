import { FooterBottom } from "@/layouts/home/templates/footer";
import Container from "@modules/common/create-section";

export default async function CheckoutFooter() {
    return (
        <footer aria-labelledby="footer-heading" className="text-brown footer border-t border-gray-300 bg-gray-50">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container>
                <FooterBottom />
            </Container>
        </footer>
    )
}