"use client";

import { useCart } from "@/app/context/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartButton() {
  const { cart } = useCart();

  // Count the number of items in the cart.
  const cartCount =
    cart?.reduce((sum, item) => sum + (item.quantity || 1), 0) || 0;

  return (
    <Link
      href="/cart"
      className="relative inline-block"
    >
      <ShoppingCart
        className="w-7 h-7"
        style={{ color: "#7B4A21" }}
      />
      {cartCount > 0 && (
        <span
          className="absolute -top-2 -right-2 text-xs font-bold rounded-full px-2 py-0.5 shadow"
          style={{
            background: "#7B4A21", // milk chocolate
            color: "white", // cookie dough/golden text
            border: "2px solid #FFD59E", // optional: golden border for pop
          }}
        >
          {cartCount}
        </span>
      )}
    </Link>
  );
}
