"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const session_id = searchParams.get("session_id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session_id) {
      // Fetch the session details from your API
      fetch(`/api/get-order?session_id=${session_id}`)
        .then((res) => res.json())
        .then((data) => {
          setOrder(data.order);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [session_id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  if (!order) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p>Sorry, we couldn't find your order.</p>
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto p-8 mt-24">
      <h1 className="text-2xl font-bold mb-4">Thank you for your order!</h1>
      <div className="mb-6">
        <p className="mb-6">Order #{order._id}</p>
        <h2 className="font-semibold">Order Details:</h2>
        <ul className="list-disc ml-6">
          {order.items.map((item, i) => (
            <li key={i}>
              {item.name} {item.quantity} Dozen
            </li>
          ))}
        </ul>
      </div>
      <div>
        <strong>Total:</strong> ${order.total.toFixed(2)}
      </div>
      <div className="mt-8 text-sm text-gray-600">
        You’ll receive an email confirmation soon.
      </div>
    </div>
  );
}
