"use client";

import { useState } from "react";

export default function PayButton({
  lineItems,
  customerName,
  customerEmail,
  customerPhone,
  customerAddress,
}) {
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    console.log("Pay Now clicked");
    setLoading(true);

    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        line_items: lineItems,
        customerInfo: {
          name: customerName,
          email: customerEmail,
          phone: customerPhone,
          address: customerAddress,
        },
      }),
    });

    const data = await res.json();
    if (typeof window !== "undefined") {
      window.location.href = data.url;
    } else {
      alert("Checkout failed: " + data.error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className={`
        flex-1 bg-[#7B4A21] 
        cursor-pointer text-white py-3 px-6 rounded-full 
        font-bold text-xl shadow
        hover:bg-[#A17043] transition
        disabled:opacity-60 disabled:cursor-not-allowed
      `}
      disabled={loading}
    >
      {loading ? "Redirecting..." : <>Pay Now</>}
    </button>
  );
}
