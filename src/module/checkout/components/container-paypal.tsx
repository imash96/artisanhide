import BrowserWireframe from "@/icon/browser-wireframe";
import PaymentContainer from "./payment-container";

export default function PayPalContainer() {
    return (
        <PaymentContainer>
            <div className="p-6 flex flex-col items-center justify-center gap-4 bg-muted/50 text-center">
                <BrowserWireframe className="w-64" />
                <p className="text-sm text-muted-foreground max-w-sm">
                    After clicking "Pay with PayPal", you will be redirected to PayPal to complete your
                    purchase securely.
                </p>
            </div>
        </PaymentContainer>
    )
}