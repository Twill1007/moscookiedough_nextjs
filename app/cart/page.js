"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import quantityOptions from "../constants/quantityOptions";

export default function Cart() {
  const { cart, setCart } = useCart();
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayMessage, setOverlayMessage] = useState("");

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
    <div className="min-h-screen bg-[#FFF2F6] pt-24 w-full flex items-center justify-center px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-lg border border-pink-100 px-6 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-8 drop-shadow text-center">
          Shopping Cart
        </h1>
        {cart.length === 0 ? (
          <p className="text-lg sm:text-xl text-gray-600 mb-8">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="w-full space-y-6 mb-8">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between bg-white rounded-xl shadow p-5 border border-gray-100"
              >
                <span className="font-bold text-lg sm:text-xl text-pink-700 mb-2 sm:mb-0">
                  {item.name}{" "}
                  <span className="text-base text-gray-700 font-normal">
                    ({item.quantity} dozen)
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity - 1)
                    }
                    className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-700 font-bold text-xl"
                  >
                    –
                  </button>
                  <span className="font-semibold text-lg text-gray-800 min-w-[36px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity + 1)
                    }
                    className="w-8 h-8 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-700 font-bold text-xl"
                  >
                    +
                  </button>
                  <span className="ml-3 text-pink-700 font-bold text-base">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(index, 0)}
                    className="ml-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 font-bold text-lg"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <div className="text-2xl font-bold text-pink-700">
                Total: ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-block bg-pink-500 text-white font-semibold text-lg px-6 py-3 rounded-full shadow hover:bg-pink-700 transition text-center"
          >
            Back to Home Page
          </Link>
          {cart.length > 0 && (
            <Link
              href="/checkout"
              className="w-full sm:w-auto inline-block bg-pink-500 text-white font-semibold text-lg px-6 py-3 rounded-full shadow hover:bg-pink-700 transition text-center"
            >
              Proceed to Checkout
            </Link>
          )}
        </div>
      </div>

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm w-full">
            <p className="text-lg text-gray-800">{overlayMessage}</p>
            <button
              onClick={() => setShowOverlay(false)}
              className="mt-4 px-5 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-700 font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
