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
        <>
            <Button
                variant="solid"
                color="primary"
                ripple
                isLoading={isLoading}
                disabled={disabled}
                Icon={CreditCard}
                iconClassName="w-5 h-5"
                onClick={onClick}
                className="w-full mt-4 h-11 text-base font-semibold tracking-wide"
            >
                {children ? children : (isLoading ? "Processing..." : `Pay`)}
            </Button>
            <p className="text-xs text-center text-muted-foreground mt-2">
                Transactions are secured and encrypted
            </p>
        </>
    )
}
