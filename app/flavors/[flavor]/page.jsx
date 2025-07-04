"use client";
import { useCart } from "@/app/context/CartContext";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import flavorData from "@/app/constants/cookieFlavors";
import quantityOptions from "@/app/constants/quantityOptions";

export default function FlavorPage({ params }) {
  const flavor = params.flavor;
  const data = flavorData[flavor] || {
    name: "Unknown Flavor",
    description: "Flavor not found!",
  };

  const { cart, setCart } = useCart() || { cart: [], setCart: () => {} };
  const [showOverlay, setShowOverlay] = useState(false);
  const [addedFlavor, setAddedFlavor] = useState("");
  const [addedQuantity, setAddedQuantity] = useState("");
  const [overlayMessage, setOverlayMessage] = useState("");
  const [adjustQuantity, setAdjustQuantity] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0]);
  const router = useRouter();

  const handleAddToCart = () => {
    if (!Array.isArray(cart)) setCart([]);
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
        "You already have this cookie in the cart. Would you like to change the quantity?"
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
    setAddedQuantity(selectedQuantity.value);
    setShowOverlay(true);

    setTimeout(() => {
      setShowOverlay(false);
      router.push("/menu");
    }, 1500);
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
      router.push("/menu");
    }
  };

  const closeOverlay = () => {
    setShowOverlay(false);
    setAdjustQuantity(null);
    router.push("/menu");
  };

  return (
    <div className="min-h-screen bg-[#FFF5EA] flex items-center justify-center py-0 px-0">
      <div className="w-full max-w-2xl bg-[#FFF5EA] text-center py-12 px-2 sm:px-4">
        {/* Headline */}

        {/* Main card */}
        <div className="bg-white rounded-3xl shadow-lg mx-auto max-w-md py-10 px-6 border-4 border-[#F3E0C7]">
          <h2 className="text-3xl font-extrabold text-[#7B4A21] mb-2 font-[cursive] flex items-center justify-center gap-2">
            {data.name}{" "}
          </h2>
          <p className="text-lg text-[#A17043] mb-6">{data.description}</p>
          <label className="block text-base font-bold text-[#A17043] mb-1 text-left">
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
            className="w-full px-4 py-2 border border-[#D2A06E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4A21] text-[#7B4A21] bg-[#F3E0C7] mb-4"
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
          <div className="flex flex-col sm:flex-row justify-center gap-3 w-full mt-4">
            <button
              onClick={handleAddToCart}
              className="bg-[#7B4A21] text-white px-5 py-2 text-lg rounded-full font-bold shadow-sm hover:bg-[#A17043] hover:scale-105 transition-all duration-150 cursor-pointer w-full sm:w-auto"
            >
              Add to Cart
            </button>
            <Link
              href="/menu"
              className="bg-white border border-[#D2A06E] text-[#7B4A21] px-5 py-2 text-lg rounded-full font-bold shadow-sm hover:bg-[#F3E0C7] hover:scale-105 transition-all duration-150 cursor-pointer w-full sm:w-auto text-center"
            >
              Back to Flavors
            </Link>
            <Link
              href="/cart"
              className="bg-white border border-[#D2A06E] text-[#7B4A21] px-5 py-2 text-lg rounded-full font-bold shadow-sm hover:bg-[#F3E0C7] hover:scale-105 transition-all duration-150 cursor-pointer w-full sm:w-auto text-center"
            >
              Go to Cart
            </Link>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-4 backdrop-blur">
          <div className="bg-white text-[#7B4A21] p-6 rounded-xl shadow-lg w-full max-w-sm overflow-auto text-center border-4 border-[#F3E0C7]">
            {adjustQuantity ? (
              <>
                <p className="text-xl mb-3">{overlayMessage}</p>
                <select
                  value={adjustQuantity.newQuantity}
                  onChange={(e) =>
                    handleQuantityChange(parseInt(e.target.value))
                  }
                  className="mt-2 w-full px-4 py-2 border border-[#D2A06E] rounded-md focus:outline-none focus:ring-2 focus:ring-[#7B4A21] text-[#7B4A21] bg-[#F3E0C7]"
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
                    className="px-4 py-2 bg-[#7B4A21] text-white rounded-full hover:bg-[#A17043] transition-colors"
                  >
                    Confirm
                  </button>
                  <button
                    onClick={closeOverlay}
                    className="px-4 py-2 bg-[#F3E0C7] text-[#7B4A21] rounded-full hover:bg-[#FFF5EA] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <p className="text-xl mb-3">
                  {`${addedQuantity} dozen ${addedFlavor}s added to your cart!`}
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
