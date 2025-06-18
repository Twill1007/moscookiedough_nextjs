"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { cart, setCart } = useCart();

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-lg shadow-md w-full max-w-2xl">
        <h1 className="text-3xl font-bold mb-6 text-amber-600">Checkout</h1>
        {cart.length === 0 ? (
          <p className="text-xl sm:text-2xl mb-6 text-gray-600">
            Your cart is empty. Please add items to proceed.
          </p>
        ) : (
          <>
            <div className="mb-6">
              {cart.map((item, index) => (
                <div
                  key={index}
                  className="text-lg text-gray-800 mb-2 flex justify-between items-center"
                >
                  <span>
                    {item.name} - {item.quantity} Dozen {`$${item.price}`}
                  </span>
                </div>
              ))}
              <div className="text-xl sm:text-2xl font-bold text-amber-600 mt-4">
                Total: ${totalAmount}
              </div>
            </div>
            <form className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Shipping Address
                </label>
                <textarea
                  id="address"
                  name="address"
                  rows="3"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                ></textarea>
              </div>
              <div>
                <label
                  htmlFor="card"
                  className="block text-sm font-medium text-gray-700"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card"
                  name="card"
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm  text-black focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-amber-700 transition-colors text-lg"
              >
                Place Order
              </button>
            </form>
          </>
        )}

        <div className="mt-6 text-center">
          <Link
            href="/cart"
            className="text-amber-600 hover:underline text-base"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
