"use-client";
import Link from "next/link";

export default function Home() {
  const flavors = [
    { slug: "peanut-butter", name: "Peanut Butter" },
    { slug: "chocolate-chip-cookie", name: "Chocolate Chip Cookie" },
    { slug: "snickerdoodle", name: "Snickerdoodle" },
    { slug: "sugar-cookie", name: "Sugar Cookie" },
  ];
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-md w-full max-w-xs sm:max-w-sm md:max-w-md">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-2 sm:mb-4 text-brown-600">
          Mos Cookie Dough Flavors
        </h1>
        <ul className="list-disc pl-4 sm:pl-5 space-y-1 sm:space-y-2">
          {flavors.map((flavor, index) => (
            <li
              key={flavor.slug}
              className="text-base sm:text-lg md:text-xl text-gray-800"
            >
              <Link
                href={`flavors/${flavor.slug}`}
                className="text-lg sm:text-xl text-blue-500 hover:text-blue-700"
              >
                {flavor.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
