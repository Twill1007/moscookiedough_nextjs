"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, setCart } = useCart();

  const handleDeleteItem = (indexToDelete) => {
    setCart((prevCart) =>
      prevCart.filter((_, index) => index !== indexToDelete)
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
          <p className="text-xl sm:text-2xl mb-6 text-black">
            Your cart is currently empty.
          </p>
        ) : (
          <div className="mb-6">
            {cart.map((item, index) => (
              <div
                key={index}
                className="text-lg text-gray-800 mb-2 flex justify-between items-center"
              >
                <span
                  key={index}
                  className="text-lg text-gray-800 mb-2"
                >
                  {item.name} - {`${item.quantity} dozen`} {`$${item.price}`}
                </span>
                <button
                  className="ml-4 px-2 py-1 cursor-pointer bg-amber-600 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
                  onClick={() => handleDeleteItem(index)}
                >
                  X
                </button>
              </div>
            ))}
            <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-4">
              Total: ${totalAmount}
            </div>
          </div>
        )}
        <Link
          href="/"
          className="bg-amber-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-amber-700 transition-colors cursor-pointer text-base sm:text-lg"
        >
          Back to Cookie Flavors
        </Link>
      </div>
    </div>
  );
}
