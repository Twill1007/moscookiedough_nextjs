"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useCart();
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");

  const quantityOptions = [
    { label: "1 dozen ($10)", value: 1, price: 10 },
    { label: "2 dozen ($18)", value: 2, price: 18 },
    { label: "3 dozen ($24)", value: 3, price: 24 },
  ];

  const handleQuantityChange = (index, newQuantity) => {
    if (newQuantity < 1) {
      setCart((prevCart) => prevCart.filter((_, i) => i !== index));
      return;
    }
    if (newQuantity > 3) {
      setShowOverlay(true);
      setOverlayMessage("Maximum is 3 dozen");
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item, i) =>
        i === index
          ? {
              ...item,
              quantity: newQuantity,
              price:
                quantityOptions.find((opt) => opt.value === newQuantity)
                  ?.price || item.price,
            }
          : item
      )
    );
  };

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center w-full max-w-2xl">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-amber-600">
          Shopping Cart
        </h1>

        {cart.length === 0 ? (
          <p className="text-lg sm:text-xl text-gray-600 mb-6">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="mb-6 space-y-4">
            {cart.map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-md p-3 flex flex-col sm:flex-row justify-between items-center gap-3 text-gray-800"
              >
                <span className="text-base sm:text-lg font-medium">
                  {item.name} - {item.quantity} Dozen
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity - 1)
                    }
                    className="w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors text-sm"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity + 1)
                    }
                    className="w-7 h-7 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors text-sm"
                  >
                    +
                  </button>
                  <span className="ml-2 text-sm text-gray-700">
                    (${item.price})
                  </span>
                  <button
                    onClick={() => handleQuantityChange(index, 0)}
                    className="ml-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-sm"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-2">
              Total: ${totalAmount.toFixed(2)}
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <Link
            href="/"
            className="bg-amber-600 text-white px-5 py-2 text-sm sm:text-base rounded-md shadow-md hover:bg-amber-700 transition-colors text-center"
          >
            Back to Home Page
          </Link>
          <Link
            href="/checkout"
            className="bg-amber-600 text-white px-5 py-2 text-sm sm:text-base rounded-md shadow-md hover:bg-amber-700 transition-colors text-center"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm w-full">
            <p className="text-base sm:text-lg text-gray-800">
              {overlayMessage}
            </p>
            <button
              onClick={() => setShowOverlay(false)}
              className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
