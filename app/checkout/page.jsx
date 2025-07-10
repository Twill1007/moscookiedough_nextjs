"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import { allowedZips } from "../constants/allowedZips";
import { useState } from "react"; // <-- You were missing this import!

export default function Checkout() {
  const { cart, setCheckoutInfo } = useCart();
  const [zip, setZip] = useState("");
  const [zipError, setZipError] = useState("");
  const router = useRouter();

  const totalAmount = cart.reduce((sum, item) => sum + item.price, 0);

  // Handler for real-time ZIP validation
  const handleZipChange = (e) => {
    const value = e.target.value;
    setZip(value);

    // Only validate for 5-digit input
    if (value.length === 5) {
      if (!allowedZips.includes(value)) {
        setZipError("Sorry, we only deliver to select areas in Arizona.");
      } else {
        setZipError("");
      }
    } else {
      setZipError(""); // Hide error for incomplete input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const zipInput = form.zip.value.trim();
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

    if (!zipRegex.test(zipInput)) {
      setZipError("Please enter a 5-digit ZIP code.");
      return;
    }

    if (!allowedZips.includes(zipInput)) {
      setZipError("Sorry, we only deliver to select areas in Arizona.");
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
      address: { street, city, zip: zipInput },
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
    <div className="min-h-screen bg-[#FFF5EA] flex items-center justify-center py-20 px-2">
      <div className="w-full max-w-2xl bg-white/90 rounded-3xl shadow-lg border-4 border-[#F3E0C7] px-8 py-12 flex flex-col items-center">
        <h1 className="text-5xl font-extrabold text-[#7B4A21] mb-8 drop-shadow text-center font-[cursive] flex items-center gap-2">
          <span
            role="img"
            aria-label="cookie"
          >
            🍪
          </span>
          Checkout
          <span
            role="img"
            aria-label="cookie"
          >
            🍪
          </span>
        </h1>

        {cart.length === 0 ? (
          <p className="text-2xl text-[#A17043] mb-8">
            Your cart is empty. Please add items to proceed.
          </p>
        ) : (
          <>
            <div className="w-full mb-8">
              <h2 className="text-2xl font-bold text-[#A17043] mb-2 font-[cursive]">
                Your Order
              </h2>
              <ul className="space-y-2">
                {cart.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-[#F3E0C7] rounded-xl px-4 py-2 border-2 border-[#E2BA85]"
                  >
                    <span className="font-semibold text-[#7B4A21] text-lg">
                      {item.name}{" "}
                      <span className="text-[#A17043] font-normal">
                        ({item.quantity} dozen)
                      </span>
                    </span>
                    <span className="font-bold text-[#7B4A21] text-lg">
                      ${item.price}
                    </span>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-5 text-2xl font-bold text-[#7B4A21]">
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
                  className="block text-[#A17043] font-semibold mb-1"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-[#F3E0C7] rounded-xl text-[#7B4A21] bg-[#FFF5EA] focus:outline-none focus:ring-2 focus:ring-[#A17043] focus:border-[#A17043] transition"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-[#A17043] font-semibold mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-[#F3E0C7] rounded-xl text-[#7B4A21] bg-[#FFF5EA] focus:outline-none focus:ring-2 focus:ring-[#A17043] focus:border-[#A17043] transition"
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="block text-[#A17043] font-semibold mb-1"
                >
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-[#F3E0C7] rounded-xl text-[#7B4A21] bg-[#FFF5EA] focus:outline-none focus:ring-2 focus:ring-[#A17043] focus:border-[#A17043] transition"
                />
              </div>
              <div>
                <label className="block text-[#A17043] font-semibold mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  className="mt-1 block w-full px-4 py-3 border border-[#F3E0C7] rounded-xl text-[#7B4A21] bg-[#FFF5EA] focus:outline-none focus:ring-2 focus:ring-[#A17043] focus:border-[#A17043] transition"
                />
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-[#A17043] font-semibold mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    className="mt-1 block w-full px-4 py-3 border border-[#F3E0C7] rounded-xl text-[#7B4A21] bg-[#FFF5EA] focus:outline-none focus:ring-2 focus:ring-[#A17043] focus:border-[#A17043] transition"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-[#A17043] font-semibold mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    name="zip"
                    value={zip}
                    onChange={handleZipChange}
                    required
                    maxLength={5}
                    className={`mt-1 block w-full px-4 py-3 border rounded-xl text-[#7B4A21] bg-[#FFF5EA] focus:outline-none focus:ring-2 focus:ring-[#A17043] focus:border-[#A17043] transition ${zipError ? "border-red-500" : "border-[#F3E0C7]"}`}
                  />
                  {zipError && (
                    <div className="text-red-600 mt-1 text-sm">{zipError}</div>
                  )}
                </div>
              </div>
              <button
                type="submit"
                className="w-full cursor-pointer bg-[#A17043] text-white font-bold text-xl px-4 py-4 rounded-full shadow hover:bg-[#7B4A21] transition"
                disabled={!!zipError || zip.length !== 5}
              >
                Review Order
              </button>
            </form>
          </>
        )}

        <div className="mt-8 text-center">
          <Link
            href="/cart"
            className="text-[#A17043] hover:underline text-lg font-semibold"
          >
            ← Back to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
