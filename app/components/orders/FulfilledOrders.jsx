"use client";

import { useState } from "react";

export default function FulfilledOrders({ orders, onSelect }) {
  const [show, setShow] = useState(false);

  return (
    <section className="mb-10">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="mb-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
      >
        {show ? "Hide" : `Show Fulfilled orders (${orders.length})`}
      </button>
      {show &&
        (orders.length === 0 ? (
          <p className="text-gray-600">No fulfilled orders.</p>
        ) : (
          <div className="space-y-3">
            {orders.map((order, index) => (
              <button
                key={index}
                onClick={() => onSelect(order)}
                className="w-full text-left bg-green-100 cursor-pointer hover:bg-green-200 px-4 py-3 rounded-md shadow-sm border border-green-400 transition-colors"
              >
                <span className="font-medium text-lg">{order.name}</span>
                <span className="block text-sm text-gray-700">
                  {order.items
                    .map((item) => `${item.quantity} Dozen ${item.flavor}`)
                    .join(", ")}
                </span>
              </button>
            ))}
          </div>
        ))}
    </section>
  );
}
