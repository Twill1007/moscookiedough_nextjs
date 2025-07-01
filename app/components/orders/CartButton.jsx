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
      <ShoppingCart className="w-7 h-7 text-pink-700" />
      {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-pink-600 text-white text-xs font-bold rounded-full px-2 py-0.5 shadow">
          {cartCount}
        </span>
      )}
    </Link>
  );
}
