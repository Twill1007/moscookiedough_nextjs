"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const flavorData = {
  "peanut-butter": {
    name: "Peanut Butter",
    description:
      "Creamy peanut butter cookie dough, perfect for a nutty treat!",
  },
  "chocolate-chip-cookie": {
    name: "Chocolate Chip Cookie",
    description: "Classic chocolate chip cookie dough with gooey chips!",
  },
  snickerdoodle: {
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

  const { cart, setCart } = useCart() || { cart: [], setCart: () => {} };
  const [showOverlay, setShowOverlay] = useState(false);
  const [addedFlavor, setAddedFlavor] = useState("");
  const [overlayMessage, setOverlayMessage] = useState("");
  const [adjustQuantity, setAdjustQuantity] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0]);
  const router = useRouter();

  const handleAddToCart = () => {
    if (!Array.isArray(cart)) {
      console.error("Cart is not an array:", cart);
      setCart([]);
    }

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
        "You already have this cookie in the cart, would you like to change the quantity?"
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
    router.push("/menu");
  };

  return (
    <div className="min-h-screen bg-[#FFF2F6] flex items-center justify-center py-0 px-0">
      <div className="w-full max-w-2xl bg-[#FFF2F6] text-center py-12 px-2 sm:px-4">
        {/* Fun headline */}
        <div className="mb-7">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-pink-700 mb-2 drop-shadow">
            <span
              role="img"
              aria-label="sparkles"
            >
              ✨
            </span>{" "}
            Shop By Flavor{" "}
            <span
              role="img"
              aria-label="sparkles"
            >
              ✨
            </span>
          </h1>
        </div>

        {/* Main content */}
        <div className="bg-white rounded-2xl shadow-md mx-auto max-w-md py-10 px-6">
          <h2 className="text-2xl font-extrabold text-pink-700 mb-2">
            {data.name}
          </h2>
          <p className="text-base text-gray-700 mb-6">{data.description}</p>
          <label className="block text-base font-bold text-pink-700 mb-1 text-left">
            Select Quantity
          </label>
          <select
            id="quantity"
            value={selectedQuantity.label}
            onChange={(e) =>
              setSelectedQuantity(
                quantityOptions.find((opt) => opt.label === e.target.value)
              )
            }
            className="w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 text-black bg-pink-50 mb-4"
          >
            {quantityOptions.map((option) => (
              <option
                key={option.label}
                value={option.label}
              >
                {option.label}
              </option>
            ))}
          </select>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
            <button
              onClick={handleAddToCart}
              className="bg-pink-600 text-white px-5 py-2 text-base rounded-full font-bold shadow-sm hover:bg-pink-700 transition-colors cursor-pointer w-full sm:w-auto"
            >
              Add to Cart
            </button>
            <Link
              href="/menu"
              className="bg-white border border-pink-300 text-pink-700 px-5 py-2 text-base rounded-full font-bold shadow-sm hover:bg-pink-50 transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              Back to Flavors
            </Link>
            <Link
              href="/cart"
              className="bg-white border border-pink-300 text-pink-700 px-5 py-2 text-base rounded-full font-bold shadow-sm hover:bg-pink-50 transition-colors cursor-pointer w-full sm:w-auto text-center"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white text-pink-800 p-6 rounded-xl shadow-lg w-full max-w-sm overflow-auto text-center">
            {adjustQuantity ? (
              <>
                <p className="text-lg mb-3">{overlayMessage}</p>
                <select
                  value={adjustQuantity.newQuantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="mt-2 w-full px-4 py-2 border border-pink-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-400 text-black bg-pink-50"
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
                <div className="mt-4 flex justify-center gap-3 flex-wrap">
                  <button
                    onClick={confirmQuantityChange}
                    className="px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={closeOverlay}
                    className="px-4 py-2 bg-pink-200 text-pink-800 rounded-full hover:bg-pink-300 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-lg mb-3">{`${addedFlavor} added to cart!`}</p>
                <button
                  onClick={closeOverlay}
                  className="mt-2 px-4 py-2 bg-pink-600 text-white rounded-full hover:bg-pink-700 transition-colors"
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
