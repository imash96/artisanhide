import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function EmptyCart() {
  return (
    <div className="space-y-4">
      <div className="w-full h-full p-5 space-y-4">
        <div className="flex items-center justify-center">
          <Image
            src={"/temp_img/emptycart.jpg"}
            alt="empty cart"
            height={150}
            width={150}
          />
        </div>
        <div className="space-y-0.5">
          <h2 className="text-templateText text-center">Your cart is empty</h2>
          <p className="text-xs text-center text-gray-500 tracking-wide font-light">
            There is nothing in your bag. Let's add some items.
          </p>
        </div>
        <Link href={"/"} className="block text-center">
          <button className="border uppercase border-templatePrimary tracking-wide text-templatePrimary py-2 px-6 text-xs font-medium">
            Let's Shop
          </button>
        </Link>
      </div>
    </div>
  );
};
