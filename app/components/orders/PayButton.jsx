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
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Checkout failed: " + data.error);
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleCheckout}
      className="bg-pink-600 cursor-pointer text-white py-2 px-4 rounded"
      disabled={loading}
    >
      {loading ? "Redirecting..." : "Pay Now"}
    </button>
  );
}
