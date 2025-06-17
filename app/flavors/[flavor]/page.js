"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Link from "next/link";

// prettier-ignore
const flavorData = {
  "peanut-butter": {
    name: "Peanut Butter",
    description: "Creamy peanut butter cookie dough, perfect for a nutty treat!",
  },
  "chocolate-chip-cookie": {
    name: "Chocolate Chip Cookie",
    description: "Classic chocolate chip cookie dough with gooey chips!",
  },
  "snickerdoodle": {
    name: "Snickerdoodle",
    description: "Sweet snickerdoodle dough with a cinnamon twist!",
  },
  "sugar-cookie": {
    name: "Sugar Cookie",
    description: "Light and sweet sugar cookie dough, great for decorating!",
  },
  "chunky-chocolate-chip": {
    name: "Chunky Chocolate Chip Cookie",
    description: "Chunky chunks of chocolate chips too good to resist!",
  },
};

export default function FlavorPage({ params }) {
  const flavor = params.flavor;
  const data = flavorData[flavor] || {
    name: "Unknown Flavor",
    description: "Flavor not found!",
  };
  const { cart, setCart } = useCart() || { cart: [], setCart: () => {} }; // Fallback if context is undefined
  const [showOverlay, setShowOverlay] = useState(false);
  const [addedFlavor, setAddedFlavor] = useState("");

  const handleAddToCart = () => {
    if (!Array.isArray(cart)) {
      console.error("Cart is not an array:", cart);
      setCart([]); // Reset to empty array if invalid
    }
    setCart((prevCart) => [
      ...prevCart,
      { slug: flavor, name: data.name, description: data.description },
    ]);
    setAddedFlavor(data.name);
    setShowOverlay(true);
  };

  const closeOverlay = () => {
    setShowOverlay(false);
  };

  console.log("Cart in FlavorPage:", cart);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-16 px-4">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-amber-700">
          {data.name}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
          {data.description}
        </p>
        <div className="flex flex-row justify-center gap-4 overflow-x-auto">
          <button
            onClick={handleAddToCart}
            className="bg-amber-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-amber-700 transition-colors cursor-pointer text-base sm:text-lg"
          >
            Add to Cart
          </button>
          <Link
            href="/"
            className="bg-amber-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-amber-700 transition-colors cursor-pointer text-base sm:text-lg"
          >
            Back to Mo's Dough Flavors
          </Link>
          <Link
            href="/cart"
            className="bg-amber-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-amber-700 transition-colors cursor-pointer text-base sm:text-lg"
          >
            Go to Cart
          </Link>
        </div>
      </div>
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-sm">
            <p className="text-lg text-gray-800">{`${addedFlavor} added to cart!`}</p>
            <button
              onClick={closeOverlay}
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
