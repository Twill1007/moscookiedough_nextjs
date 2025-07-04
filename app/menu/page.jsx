"use client";

import Button from "../components/orders/Button";
import flavorData from "../constants/cookieFlavors";
import { useRouter } from "next/navigation";

export default function Menu() {
  const flavors = ["chocolate-chip-cookie", "snickerdoodle", "sugar-cookie"];
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white w-full pt-24">
      <div className="w-full flex flex-col items-center py-8 px-4">
        <div className="w-full flex flex-col gap-12 max-w-5xl mt-24">
          {flavors.map((slug, idx) => {
            const { name, description } = flavorData[slug];
            const isEven = idx % 2 === 0;
            return (
              <div
                key={slug}
                className={`
                  w-full flex flex-col md:flex-row ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }
                  items-stretch bg-white rounded-3xl overflow-hidden border-2 shadow-xl
                  transition-transform hover:-translate-y-1 hover:shadow-2xl
                  relative
                `}
                style={{
                  minHeight: "320px",
                  borderColor: "#F3E0C7", // Cookie dough card border
                  backgroundImage:
                    "radial-gradient(rgba(255,213,158,0.11) 2px, transparent 2.5px)", // Sprinkles/dots
                  backgroundSize: "20px 20px",
                }}
              >
                {/* Cookie Image Side */}
                <div className="flex-1 min-h-[200px] flex items-center justify-center bg-transparent">
                  <img
                    src={`/cookies/${slug}.jpg`}
                    alt={name}
                    className="w-64 h-64 md:w-72 md:h-72 rounded-full border-4"
                    style={{
                      borderColor: "#FFD59E", // golden
                      boxShadow: "0 4px 18px 0 rgba(123,74,33,0.10)",
                      background: "white",
                    }}
                  />
                </div>
                {/* Text Side */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-start p-8 md:p-12 bg-white">
                  <h3
                    className="text-3xl sm:text-4xl font-bold mb-2"
                    style={{ color: "#7B4A21" }}
                  >
                    {name}
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-700 mb-4">
                    {description}
                  </p>
                  <Button onClick={() => router.push(`/flavors/${slug}`)}>
                    Add to Cart
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
