"use client";

import { useState } from "react";

export default function OderDetail({ order, onClose }) {
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const selectedItem =
    selectedItemIndex !== null ? order.items[selectedItemIndex] : null;

  if (!order) {
    return null;
  }
  return (
    <>
      {/* Main Order Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
        <div className="bg-white text-black rounded-xl shadow-lg max-w-md w-full p-6 relative">
          <button
            onClick={onClose}
            className="absolute top-3 right-3 cursor-pointer text-black hover:text-gray-500 text-xl font-bold"
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
              <button
                key={i}
                onClick={() => setSelectedItemIndex(i)}
                className="block w-full text-left cursor-pointer px-4 py-3 rounded-md bg-amber-100 hover:bg-amber-200 text-lg font-medium text-gray-900 shadow-sm"
              >
                {item.quantity} Dozen – {item.flavor}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Overlay (Item Actions) */}
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
              onClick={() => {
                // Later: mark as filled in DB
                alert("Marked as filled (not yet implemented)");
                setSelectedItemIndex(null);
              }}
              className="w-full bg-green-600 hover:bg-green-700 cursor-pointer text-white font-bold py-2 rounded mb-3"
            >
              Mark as Filled
            </button>
            <button
              onClick={() => setSelectedItemIndex(null)}
              className="w-full bg-gray-300 hover:bg-gray-400 cursor-pointer text-black font-medium py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
