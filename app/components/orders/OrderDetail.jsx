"use client";

import { useState } from "react";
import OrderItem from "./OrderItem";

export default function OrderDetail({ order, onClose, setSelectedOrder }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const selectedItem =
    selectedItemIndex !== null ? order.items[selectedItemIndex] : null;

  const handleMarkFilled = async () => {
    try {
      await fetch(`/api/orders/${order._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ itemIndex: selectedItemIndex }),
      });

      // Update UI locally
      const updatedOrder = { ...order };
      updatedOrder.items[selectedItemIndex].filled = true;
      setSelectedOrder(updatedOrder);
      setSelectedItemIndex(null);
    } catch (err) {
      console.error("Failed to mark item filled:", err);
    }
  };

  if (!order) return null;

  return (
    <>
      {/* Main Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
        <div className="bg-white text-black rounded-xl shadow-lg max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-black text-xl font-bold hover:text-gray-500 cursor-pointer"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-2">{order.name}</h2>
          <p className="text-sm mb-1">📧 {order.email}</p>
          <p className="text-sm mb-1">📞 {order.phone}</p>
          <p className="text-sm mb-1">
            📍 {order.address.street}, {order.address.city}, {order.address.zip}
          </p>
          <p className="text-sm text-gray-500 mb-4">
            🕒 {new Date(order.createdAt).toLocaleString()}
          </p>

          <div className="space-y-2">
            {order.items.map((item, i) => (
              <OrderItem
                key={i}
                item={item}
                index={i}
                onClick={(index) => setSelectedItemIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Item Overlay */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-60 flex items-center justify-center px-4">
          <div className="bg-white text-black rounded-xl shadow-lg max-w-sm w-full p-6 relative">
            <button
              onClick={() => setSelectedItemIndex(null)}
              className="absolute top-3 right-3 cursor-pointer text-black hover:text-gray-700 text-xl font-bold"
            >
              ×
            </button>
            <h3 className="text-xl font-semibold mb-4">
              {selectedItem.quantity} Dozen – {selectedItem.flavor}
            </h3>
            <button
              onClick={handleMarkFilled}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 rounded mb-3 cursor-pointer"
            >
              Mark as Filled
            </button>
            <button
              onClick={() => setSelectedItemIndex(null)}
              className="w-full bg-gray-300 hover:bg-gray-400 text-black font-medium py-2 rounded cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
