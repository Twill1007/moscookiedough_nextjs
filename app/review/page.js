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

  // try {
  //   const response = await fetch("/api/orders", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(order),
  //   });

  //   if (response.ok) {
  //     alert("Order placed successfully!!");
  //     setCart([]);
  //     form.reset();
  //   } else {
  //     alert("Failed to place order.");
  //   }
  // } catch (err) {
  //   console.error("Error submitting order:", err);
  //   alert("An error occurred while placing your order.");
  // }

  return (
    <div className="min-h-screen bg-[#FFF2F6] pt-24 w-full flex items-center justify-center px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-lg border border-pink-100 px-6 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-8 drop-shadow text-center">
          Review Your Order
        </h1>

        {/* Address and contact info */}
        <div className="mb-8 w-full text-black">
          <div className="mb-2 text-lg">
            <span className="font-semibold">Name:</span> {checkoutInfo.name}
          </div>
          <div className="mb-2 text-lg">
            <span className="font-semibold">Email:</span> {checkoutInfo.email}
          </div>
          <div className="mb-2 text-lg">
            <span className="font-semibold">Phone:</span> {checkoutInfo.phone}
          </div>
          <div className="mb-2 text-lg">
            <span className="font-semibold">Address:</span>{" "}
            {checkoutInfo.address.street}, {checkoutInfo.address.city}{" "}
            {checkoutInfo.address.zip}
          </div>
        </div>

        {/* Cart Items */}
        <div className="mb-8 w-full">
          <h2 className="text-xl font-bold text-pink-700 mb-2">Items:</h2>
          <ul className="space-y-2 text-black">
            {cart.map((item, idx) => (
              <li
                key={idx}
                className="flex justify-between items-center"
              >
                <span>
                  {item.name} ({item.quantity} dozen)
                </span>
                <span>${item.price}</span>
              </li>
            ))}
          </ul>
          <div className="flex justify-end mt-4 text-xl font-bold text-pink-700">
            Total: ${totalAmount.toFixed(2)}
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 w-full">
          <Link
            href="/checkout"
            className="flex-1 bg-gray-200 text-gray-800 rounded-full py-3 px-6 font-semibold hover:bg-gray-300 text-center"
          >
            Back to Edit
          </Link>

          <PayButton
            lineItems={lineItems} // ✅ Pass the correct Stripe-ready lineItems
            customerName={checkoutInfo?.name}
            customerEmail={checkoutInfo?.email}
            customerAddress={checkoutInfo?.address}
            customerPhone={checkoutInfo?.phone}
          />

          {/* Or your Stripe logic here */}
        </div>
      </div>
    </div>
  );
}
