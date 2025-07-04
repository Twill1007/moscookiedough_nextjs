"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import quantityOptions from "../constants/quantityOptions";
import Button from "../components/orders/Button";

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
    <div className="min-h-screen bg-white pt-24 w-full flex flex-col items-center justify-center px-2">
      {/* Header OUTSIDE card */}
      <h1 className="text-5xl font-extrabold text-[#7B4A21] mb-8 drop-shadow text-center font-[cursive] flex items-center gap-2">
        Shopping Cart
      </h1>
      {/* Cart Card */}
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-lg border-4 border-[#F3E0C7] px-6 py-12 flex flex-col items-center">
        {cart.length === 0 ? (
          <p className="text-2xl text-[#A17043] mb-8">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="w-full space-y-6 mb-8">
            {cart.map((item, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row items-center justify-between bg-[#F3E0C7] rounded-xl shadow p-5 border-2 border-[#E2BA85]"
              >
                <span className="font-bold text-2xl text-[#7B4A21] mb-2 sm:mb-0">
                  {item.name}{" "}
                  <span className="text-base text-[#A17043] font-normal">
                    ({item.quantity} dozen)
                  </span>
                </span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity - 1)
                    }
                    className="w-9 h-9 cursor-pointer bg-[#A17043] text-white rounded-full flex items-center justify-center hover:bg-[#7B4A21] font-bold text-2xl"
                  >
                    –
                  </button>
                  <span className="font-semibold text-xl text-[#7B4A21] min-w-[36px] text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() =>
                      handleQuantityChange(index, item.quantity + 1)
                    }
                    className="w-9 h-9 cursor-pointer bg-[#A17043] text-white rounded-full flex items-center justify-center hover:bg-[#7B4A21] font-bold text-2xl"
                  >
                    +
                  </button>
                  <span className="ml-3 text-[#A17043] font-bold text-lg">
                    ${item.price}
                  </span>
                  <button
                    onClick={() => handleQuantityChange(index, 0)}
                    className="ml-3 w-9 h-9 cursor-pointer bg-[#D2A06E] text-[#7B4A21] rounded-full flex items-center justify-center hover:bg-[#E2BA85] font-bold text-xl"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-end">
              <div className="text-3xl font-bold text-[#7B4A21]">
                Total: ${totalAmount.toFixed(2)}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mt-2">
          <Link
            href="/"
            className="w-full sm:w-auto inline-block bg-[#A17043] text-white font-semibold text-xl px-7 py-4 rounded-full shadow hover:bg-[#7B4A21] transition text-center"
          >
            Back to Home Page
          </Link>
          {cart.length > 0 && (
            <Link
              href="/checkout"
              className="w-full sm:w-auto inline-block bg-[#7B4A21] text-white font-semibold text-xl px-7 py-4 rounded-full shadow hover:bg-[#A17043] transition text-center"
            >
              Proceed to Checkout
            </Link>
          )}
        </div>
      </div>

      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-sm w-full border-4 border-[#F3E0C7]">
            <p className="text-xl text-[#7B4A21] mb-3">{overlayMessage}</p>
            <Button onClick={() => setShowOverlay(false)}>Close</Button>
          </div>
        </div>
      )}
    </div>
  );
}
