import BrowserWireframe from "@/icon/browser-wireframe";
import PaymentContainer from "./payment-container";

export default function ManualContainer() {
    return (
        <PaymentContainer>
            <BrowserWireframe className="w-64" />
            <p className="text-sm text-muted-foreground max-w-sm">
                <span className="font-semibold text-accent">Attention:</span> For testing purposes
                only.
            </p>
        </PaymentContainer>
    )
}