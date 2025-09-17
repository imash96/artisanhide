"use client"

import { FormState } from "@/type/common"
import { applyPromotions } from "@lib/action/cart"
import { StoreCartPromotion } from "@medusajs/types"
import Button from "@module/common/custom-button"
import CustomInput from "@module/common/custom-input"
import { Loader, X, Tag } from "lucide-react"
import { useActionState, useEffect, useState, useTransition } from "react"

const handlePromoCode = async (prevState: FormState, formData: FormData): Promise<FormState> => {
  const code = formData.get("code") as string
  if (!code) return { success: false, error: "Coupon code cannot be empty." }

  return await applyPromotions([code])

}

export default function DiscountCode({ promotions }: { promotions: StoreCartPromotion[] }) {
  const [appliedCode, setAppliedCode] = useState<string | undefined>(promotions[0]?.code)
  const [state, formAction, isPending] = useActionState(handlePromoCode, {
    success: false,
    error: null,
    message: undefined,
  } as FormState)
  const [isRemoving, startTransition] = useTransition()

  useEffect(() => {
    if (state.success && state.message) setAppliedCode(state.message)
  }, [state])

  const removePromotionCode = (code: string) => {
    const remainingPromotions = promotions.filter((p) => p.code !== code)
    startTransition(() => applyPromotions(remainingPromotions.map((p) => p.code!).filter(Boolean)).then(() => setAppliedCode(undefined)))
  }

  // ✅ Show applied coupon
  if (appliedCode) {
    return (
      <div className="flex justify-between items-center">
        <div>
          <p className="text-sm">Promo Code Applied:</p>
          <p className="font-semibold text-badge-sale flex items-center gap-2">
            <Tag className="w-5 h-5" />
            {appliedCode}
          </p>
        </div>
        <button onClick={() => removePromotionCode(appliedCode)} className="text-sm font-medium text-destructive hover:text-destructive/80 flex items-center gap-1" >
          {isRemoving ? <Loader className="w-4 h-4 animate-spin" /> : <X className="w-4 h-4" />}
          Remove
        </button>
      </div>
    )
  }

  // ✅ Show coupon input form
  return (
    <div className="">
      <h3 className="font-semibold">Apply Discount Code</h3>
      <p className="text-sm text-foreground-muted mt-1">
        Enter your coupon below to save instantly.
      </p>

      <form action={formAction} className="flex items-start gap-2 w-full mt-3">
        <div className="flex-grow">
          <CustomInput
            type="text"
            name="code"
            label="Enter Discount code"
            autoFocus
            disabled={isPending}
            helperText={state.error ?? undefined}
            state={state.error ? "error" : "default"}
          />
        </div>
        <Button type="submit" disabled={isPending} className="h-11 w-18">
          {isPending ? <Loader className="w-5 h-5 animate-spin" /> : "Apply"}
        </Button>
      </form>
    </div>
  )
}
