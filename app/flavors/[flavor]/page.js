"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // Import useRouter

// prettier-ignore
const flavorData = {
  "peanut-butter": { name: "Peanut Butter", description: "Creamy peanut butter cookie dough, perfect for a nutty treat!" },
  "chocolate-chip-cookie": { name: "Chocolate Chip Cookie", description: "Classic chocolate chip cookie dough with gooey chips!" },
  "snickerdoodle": { name: "Snickerdoodle", description: "Sweet snickerdoodle dough with a cinnamon twist!" },
  "sugar-cookie": { name: "Sugar Cookie", description: "Light and sweet sugar cookie dough, great for decorating!" },
  "chunky-chocolate-chip": { name: "Chunky Chocolate Chip Cookie", description: "Chunky chunks of chocolate chips too good to resist!" },
};

const quantityOptions = [
  { label: "1 dozen ($10)", value: 1, price: 10 },
  { label: "2 dozen ($18)", value: 2, price: 18 },
  { label: "3 dozen ($24)", value: 3, price: 24 },
];

export default function FlavorPage({ params }) {
  const flavor = params.flavor;
  const data = flavorData[flavor] || {
    name: "Unknown Flavor",
    description: "Flavor not found!",
  };
  const { cart, setCart } = useCart() || { cart: [], setCart: () => {} }; // Fallback if context is undefined
  const [showOverlay, setShowOverlay] = useState(false);
  const [addedFlavor, setAddedFlavor] = useState("");
  const [overlayMessage, setOverlayMessage] = useState("");
  const [adjustQuantity, setAdjustQuantity] = useState(null); // { flavor, currentQuantity, newQuantity }
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0]);
  const router = useRouter(); // Initialize useRouter

  const handleAddToCart = () => {
    if (!Array.isArray(cart)) {
      console.error("Cart is not an array:", cart);
      setCart([]);
    }

    // Check if this flavor is already in the cart
    const existingItems = cart.filter((item) => item.slug === flavor);
    const currentFlavorTotal = existingItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );

    if (currentFlavorTotal > 0) {
      setAdjustQuantity({
        flavor,
        currentQuantity: currentFlavorTotal,
        newQuantity: selectedQuantity.value,
      });
      setShowOverlay(true);
      setOverlayMessage(
        `You already have this cookie in the cart, would you like to change the quantity?`
      );
      return;
    }

    setCart((prevCart) => [
      ...prevCart,
      {
        slug: flavor,
        name: data.name,
        description: data.description,
        quantity: selectedQuantity.value,
        price: selectedQuantity.price,
      },
    ]);
    setAddedFlavor(data.name);
    setShowOverlay(true);
  };

  const handleQuantityChange = (newValue) => {
    if (adjustQuantity) {
      setAdjustQuantity({ ...adjustQuantity, newQuantity: newValue });
    }
  };

  const confirmQuantityChange = () => {
    if (adjustQuantity) {
      const { flavor, newQuantity } = adjustQuantity;
      const newPrice =
        quantityOptions.find((opt) => opt.value === newQuantity)?.price || 0;
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.slug !== flavor);
        return [
          ...updatedCart,
          {
            slug: flavor,
            name: flavorData[flavor].name,
            description: flavorData[flavor].description,
            quantity: newQuantity,
            price: newPrice,
          },
        ];
      });
      setShowOverlay(false);
      setAdjustQuantity(null);
    }
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setAdjustQuantity(null);
    router.push("/"); // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-16 px-4">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-amber-700">
          {data.name}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
          {data.description}
        </p>
        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block text-lg text-black mb-2"
          >
            Select Quantity:
          </label>
          <select
            id="quantity"
            value={selectedQuantity.label}
            onChange={(e) =>
              setSelectedQuantity(
                quantityOptions.find((opt) => opt.label === e.target.value)
              )
            }
            className="w-full sm:w-auto px-4 py-2 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          >
            {quantityOptions.map((option) => (
              <option
                key={option.label}
                value={option.label}
                className="text-gray-800"
              >
                {option.label}
              </option>
            ))}
          </select>
        </div>
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
            {adjustQuantity ? (
              <>
                <p className="text-lg text-gray-800">{overlayMessage}</p>
                <select
                  value={adjustQuantity.newQuantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="mt-4 w-full px-4 py-2 border  text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                >
                  {quantityOptions.map((option) => (
                    <option
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </option>
                  ))}
                </select>
                <div className="mt-4 flex justify-center gap-4">
                  <button
                    onClick={confirmQuantityChange}
                    className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={closeOverlay}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg text-gray-800">{`${addedFlavor} added to cart!`}</p>
                <button
                  onClick={closeOverlay}
                  className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors"
                >
                  Close
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
