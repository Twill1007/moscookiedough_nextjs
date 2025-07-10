"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useCart } from "../context/CartContext"; // adjust import path if needed

function SuccessContent() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setCart } = useCart();

  useEffect(() => {
    if (session_id) {
      fetch(`/api/get-order?session_id=${session_id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data.order);
          setLoading(false);
          if (data.order) {
            setCart([]);
            localStorage.removeItem("cart");
          }
        });
    } else {
      setLoading(false);
    }
  }, [session_id, setCart]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!order) {
    return (
      <div className="p-8 flex items-center justify-center min-h-screen bg-white">
        <div
          className="max-w-lg w-full mx-auto p-8 rounded-2xl shadow-xl border"
          style={{ background: "#f8f1e4" }}
        >
          <h1 className="text-2xl font-bold mb-4 text-[#7B3F00]">
            Order Not Found
          </h1>
          <p className="text-gray-700">Sorry, we couldn't find your order.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div
        className="max-w-lg w-full mx-auto p-10 rounded-2xl shadow-xl border"
        style={{ background: "#f8f1e4" }}
      >
        <h1 className="text-3xl font-extrabold mb-4 text-[#7B3F00]">
          Thank you for your order!
        </h1>
        <div className="mb-6">
          <p className="mb-3 text-lg text-[#7B3F00] font-semibold">
            Order #{order._id}
          </p>
          <h2 className="font-semibold text-[#7B3F00] mb-1">Order Details:</h2>
          <ul className="list-disc ml-6 text-gray-800">
            {order.items.map((item, i) => (
              <li key={i}>
                {item.name} {item.quantity} Dozen
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <strong className="text-[#7B3F00]">Total:</strong>{" "}
          <span className="font-semibold text-gray-800">
            ${order.total.toFixed(2)}
          </span>
        </div>
        <div className="mt-8 text-sm text-gray-500">
          You’ll receive an email confirmation soon.
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
