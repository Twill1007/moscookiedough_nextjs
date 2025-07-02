"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";

export default function Checkout() {
  const { cart, setCheckoutInfo } = useCart();
  const router = useRouter();

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const zip = form.zip.value.trim();
    const street = form.street.value.trim();
    const city = form.city.value.trim();

    // Basic regex patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{4})$/;
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
      address: { street, city, zip },
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
    <div className="min-h-screen bg-[#FFF2F6] flex items-center justify-center py-20 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-2xl shadow-lg border border-pink-100 px-8 py-10 flex flex-col items-center">
        <h1 className="text-4xl font-extrabold text-pink-700 mb-6 drop-shadow text-center">
          Checkout
        </h1>

        {cart.length === 0 ? (
          <p className="text-xl text-gray-600 mb-8">
            Your cart is empty. Please add items to proceed.
          </p>
        ) : (
          <>
            <div className="w-full mb-8">
              <h2 className="text-xl font-bold text-pink-700 mb-2">
                Your Order
              </h2>
              <ul className="space-y-2">
                {cart.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-pink-50 rounded-lg px-4 py-2"
                  >
                    <span className="font-semibold text-pink-700">
                      {item.name}{" "}
                      <span className="text-gray-700 font-normal">
                        ({item.quantity} dozen)
                      </span>
                    </span>
                    <span className="font-bold text-pink-700">
                      ${item.price}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-5 text-2xl font-bold text-pink-700">
                Total: ${totalAmount}
              </div>
            </div>
            <form
              className="w-full space-y-6"
              onSubmit={handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-pink-700 font-semibold mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-pink-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-pink-700 font-semibold mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-pink-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-pink-700 font-semibold mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-pink-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                />
              </div>
              <div>
                <label className="block text-pink-700 font-semibold mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-pink-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-pink-700 font-semibold mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-pink-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-pink-700 font-semibold mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-pink-200 rounded-xl text-black focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-pink-400 transition"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-pink-500 text-white font-bold text-lg px-4 py-3 rounded-full shadow hover:bg-pink-700 transition"
              >
                Review Order
              </button>
            </form>
          </>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/cart"
            className="text-pink-700 hover:underline text-lg font-semibold"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
