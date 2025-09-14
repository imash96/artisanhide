import BrowserWireframe from "@/icon/browser-wireframe";
import PaymentContainer from "./payment-container";

export default function ManualContainer() {
    return (
        <PaymentContainer>
            <div className="p-6 flex flex-col items-center justify-center gap-4 bg-muted/50 text-center">
                <BrowserWireframe className="w-64" />
                <p className="text-sm text-muted-foreground max-w-sm">
                    <span className="font-semibold text-accent">Attention:</span> For testing purposes
                    only.
                </p>
            </div>
        </PaymentContainer>
    )
}