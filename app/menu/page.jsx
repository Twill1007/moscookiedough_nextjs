"use client";

import Link from "next/link";
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
            // Optionally change border color per row for extra bakery vibe!
            const borderColor = isEven
              ? "border-pink-200"
              : "border-yellow-100";
            return (
              <div
                key={slug}
                className={`w-full flex flex-col md:flex-row ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-stretch bg-white shadow-2xl rounded-2xl overflow-hidden border-2 ${borderColor}`}
                style={{ minHeight: "320px" }}
              >
                {/* Cookie Image/Button Side */}
                <Link
                  href={`/flavors/${slug}`}
                  className="group flex-1 min-h-[200px] flex bg-gray-50 items-center justify-center"
                  tabIndex={0}
                >
                  <div className="w-64 h-64 md:w-72 md:h-72 rounded-full border-4 border-pink-100 shadow-lg flex items-center justify-center overflow-hidden transition-transform hover:scale-105 cursor-pointer relative group">
                    {/* Cookie dough image (bottom) */}
                    <div
                      className="absolute inset-0 w-full h-full"
                      style={{
                        backgroundImage: `url(/cookies/${slug}.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: 1,
                      }}
                    />
                    {/* Baked cookie image (top, fades in on hover) */}
                    <div
                      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                      style={{
                        backgroundImage: `url(/cookies/${slug}-baked.jpg)`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        zIndex: 2,
                      }}
                    />
                  </div>
                </Link>
                {/* Text Side */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-start p-8 md:p-12 bg-white">
                  <h3 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">
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
