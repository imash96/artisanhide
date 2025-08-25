import { FooterBottom } from "@/layout/home/templates/footer";
import Container from "@module/common/create-section";

export default async function CheckoutFooter() {
    return (
        <footer aria-labelledby="footer-heading" className="footer border-t border-border bg-primary text-primary-foreground">
            <h2 id="footer-heading" className="sr-only">
                Footer
            </h2>
            <Container>
                <FooterBottom />
            </Container>
        </footer>
    )
}