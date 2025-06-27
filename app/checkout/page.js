"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, setCheckoutInfo } = useCart();
  const router = useRouter();

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const zip = form.zip.value.trim();
    const street = form.street.value.trim();
    const city = form.city.value.trim();

    // Basic regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{4})$/; // Accepts (123) 456-7890, 123-456-7890, etc.
    const zipRegex = /^\d{5}$/;

    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!phoneRegex.test(phone)) {
      alert("Please enter a valid phone number (e.g., 123-456-7890).");
      return;
    }

    if (!zipRegex.test(zip)) {
      alert("Please enter a 5-digit ZIP code.");
      return;
    }

    if (!street || !city) {
      alert("Please enter a valid address.");
      return;
    }

    setCheckoutInfo({
      name: form.name.value,
      email,
      phone,
      address: {
        street,
        city,
        zip,
      },
      items: cart.map((item) => ({
        flavor: item.name,
        quantity: item.quantity,
        filled: false,
      })),
      createdAt: new Date(),
    });

    router.push("/review");
  };

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
            <form
              className="space-y-4"
              onSubmit={handleSubmit}
            >
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
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-gray-700"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                />
              </div>

              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>

                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-amber-500 focus:border-amber-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full cursor-pointer bg-amber-600 text-white px-4 py-2 rounded-md shadow-md hover:bg-amber-700 transition-colors text-lg"
              >
                Proceed to Payment
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
