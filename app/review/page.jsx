"use client";

import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PayButton from "../components/orders/PayButton";

export default function Review() {
  const { checkoutInfo, cart } = useCart();
  const router = useRouter();

  if (!checkoutInfo || !cart || cart.length === 0) {
    router.push("/checkout");
    return null;
  }

  const lineItems = cart.map((item) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: Math.round((item.price / item.quantity) * 100), // Convert to cents
    },
    quantity: item.quantity,
  }));

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-[#FFF5EA] pt-24 w-full flex items-center justify-center px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-lg border-4 border-[#F3E0C7] px-8 py-12 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-[#7B4A21] mb-8 drop-shadow text-center font-[cursive] flex items-center gap-2">
          <span
            role="img"
            aria-label="cookie"
          >
            🍪
          </span>
          Review Your Order
          <span
            role="img"
            aria-label="cookie"
          >
            🍪
          </span>
        </h1>

        {/* Address and contact info */}
        <div className="mb-8 w-full text-[#7B4A21]">
          <div className="mb-2 text-xl">
            <span className="font-semibold">Name:</span> {checkoutInfo.name}
          </div>
          <div className="mb-2 text-xl">
            <span className="font-semibold">Email:</span> {checkoutInfo.email}
          </div>
          <div className="mb-2 text-xl">
            <span className="font-semibold">Phone:</span> {checkoutInfo.phone}
          </div>
          <div className="mb-2 text-xl">
            <span className="font-semibold">Address:</span>{" "}
            {checkoutInfo.address.street}, {checkoutInfo.address.city}{" "}
            {checkoutInfo.address.zip}
          </div>
        </div>

        {/* Cart Items */}
        <div className="mb-8 w-full">
          <h2 className="text-2xl font-bold text-[#A17043] mb-2 font-[cursive]">
            Items:
          </h2>
          <ul className="space-y-2 text-[#7B4A21] text-lg">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center bg-[#F3E0C7] rounded-xl px-4 py-2 border-2 border-[#E2BA85]"
              >
                <span>
                  {item.name} ({item.quantity} dozen)
                </span>
                <span className="font-bold">${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4 text-2xl font-bold text-[#7B4A21]">
            Total: ${totalAmount.toFixed(2)}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 w-full">
          <Link
            href="/checkout"
            className="flex-1 bg-[#E2BA85] text-[#7B4A21] rounded-full py-3 px-6 font-semibold hover:bg-[#F3E0C7] text-center transition"
          >
            Back to Edit
          </Link>

          <PayButton
            lineItems={lineItems}
            customerName={checkoutInfo?.name}
            customerEmail={checkoutInfo?.email}
            customerAddress={checkoutInfo?.address}
            customerPhone={checkoutInfo?.phone}
          />
        </div>
      </div>
    </div>
  );
}
