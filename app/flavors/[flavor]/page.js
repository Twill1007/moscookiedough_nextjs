"use client";
import { useState } from "react";

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
  const [cart, setCart] = useState([]);

  const handleAddToCart = () => {
    setCart((prevCart) => [
      ...prevCart,
      { slug: flavor, name: data.name, description: data.description },
    ]);
    alert(`${data.name} added to cart!`);
  };

  console.log(cart);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-16 px-4">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-amber-700">
          {data.name}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed mb-6">
          {data.description}
        </p>
        <button
          onClick={handleAddToCart}
          className="bg-amber-600 text-white px-6 py-3 rounded-md shadow-md hover:bg-amber-700 transition-colors cursor-pointer text-base sm:text-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
