import { FooterBottom } from "@/layouts/home/templates/footer";
import Container from "@modules/common/create-section";

export default async function CheckoutFooter() {
    return (
        <footer aria-labelledby="footer-heading" className="footer text-base text-gray-900 border-t border-gray-300 bg-bgPrimary">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container>
                <FooterBottom />
            </Container>
        </footer>
    )
}