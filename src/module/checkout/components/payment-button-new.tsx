"use client"

import Button from "@module/common/custom-button"
import { CreditCard } from "lucide-react"

type FinalPaymentButtonProps = {
    isLoading?: boolean
    disabled?: boolean
    onClick?: () => void
} & React.PropsWithChildren

export default function FinalPaymentButton({
    isLoading = false,
    disabled = false,
    onClick,
    children
}: FinalPaymentButtonProps) {
    return (
        <div className="w-full border-t p-4">
            <Button
                variant="solid"
                color="primary"
                pill
                ripple
                isLoading={isLoading}
                disabled={disabled}
                Icon={CreditCard}
                iconClassName="w-5 h-5"
                onClick={onClick}
                className="w-full py-3 text-base font-semibold tracking-wide"
            >
                {children ? children : (isLoading ? "Processing..." : `Pay`)}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
                Transactions are secured and encrypted
            </p>
        </div>
    )
}
