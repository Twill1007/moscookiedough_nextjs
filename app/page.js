import Link from "next/link";

export default function Home() {
  const flavors = [
    { slug: "peanut-butter", name: "Peanut Butter" },
    { slug: "chocolate-chip-cookie", name: "Chocolate Chip Cookie" },
    { slug: "snickerdoodle", name: "Snickerdoodle" },
    { slug: "sugar-cookie", name: "Sugar Cookie" },
    { slug: "chunky-chocolate-chip", name: "Chunky Chocolate Chip" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-8 px-4">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg w-full max-w-3xl text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 text-amber-700">
          Mo's Cookie Dough
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl mb-6 text-gray-600">
          Choose Your Flavor
        </h2>

        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-4">
          {flavors.map((flavor) => (
            <Link
              href={`/flavors/${flavor.slug}`}
              key={flavor.slug}
            >
              <button className="py-2 px-4 bg-gradient-to-r from-amber-200 to-amber-300 text-amber-800 font-semibold rounded-lg hover:bg-amber-400 transition duration-200 w-full sm:w-auto min-w-[160px] text-sm sm:text-base cursor-pointer">
                {flavor.name}
              </button>
            </Link>
          ))}
        </div>

        <div className="mt-8">
          <Link
            href="/cart"
            className="inline-block text-base sm:text-lg text-white bg-purple-500 px-6 py-3 rounded-md hover:bg-purple-700 transition-colors duration-200"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
