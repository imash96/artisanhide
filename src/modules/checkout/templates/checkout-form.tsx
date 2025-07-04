import CustomDivider from "@modules/common/custom-divider";
import ExpressCheckout from "../components/express-checkout";


export default function CheckoutForm() {
    return (
        <div className="space-y-8">
            <ExpressCheckout />
            <CustomDivider text={"or"} />
        </div>
    )
}