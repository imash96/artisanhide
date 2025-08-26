"use client";

import Button from "@module/common/custom-button";
import CustomInput from "@module/common/custom-input";
import { useState } from "react";

const DiscountCode = () => {
  const [coupon, setCoupon] = useState("");

  const handleCouponChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCoupon(e.target.value);
  };

  const handleCouponSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Coupon submitted:", coupon);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <h2 className="text-xl font-medium text-templateBrown">Apply Coupon</h2>
        <p className="text-xs text-gray-500">
          Enter the coupon code to get a discount on your order.
        </p>
      </div>
      <form onSubmit={handleCouponSubmit} className="flex items-center gap-2 w-full">
        <CustomInput
          onChange={handleCouponChange}
          value={coupon}
          name="coupon"
          label="Enter Coupon"
          className="w-full"
        />
        <Button className="h-11">
          APPLY
        </Button>
      </form>
    </div>
  );
};

export default DiscountCode;
