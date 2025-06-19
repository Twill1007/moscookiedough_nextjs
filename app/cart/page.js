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
    } //Prevent negative or zero quantities
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

  console.log("This is the total amount", totalAmount);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-amber-600">
          Shopping Cart
        </h1>
        {cart.length === 0 ? (
          <p className="text-xl sm:text-2xl mb-6 text-gray-600">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="mb-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="text-lg text-gray-800 mb-2 flex justify-between items-center"
              >
                <span> {item.name} - </span>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-medium">
                    {item.quantity} Dozen
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity - 1)
                    }
                    className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors text-sm"
                  >
                    -
                  </button>
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity + 1)
                    }
                    className="w-6 h-6 bg-amber-600 text-white rounded-full flex items-center justify-center hover:bg-amber-700 transition-colors text-sm"
                  >
                    +
                  </button>
                  <span className="ml-2">(${item.price})</span>
                </div>
                <button
                  onClick={() => handleQuantityChange(index, 0)} // Delete by setting quantity to 0
                  className="ml-4 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors text-sm"
                >
                  X
                </button>
              </div>
            ))}
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-4">
              Total: ${totalAmount.toFixed(2)}
            </div>
          </div>
        )}
        <Link
          className="bg-amber-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-amber-700 transition-colors cursor-pointer text-base sm:text-lg"
          href="/"
        >
          Back to Home Page
        </Link>
        <Link
          className="mt-4 bg-amber-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-amber-700 transition-colors cursor-pointer text-base sm:text-lg"
          href="/checkout"
        >
          Proceed to Checkout
        </Link>
      </div>
      +
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <p className="text-lg text-gray-800">{overlayMessage}</p>
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
