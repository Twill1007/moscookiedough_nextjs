import Link from "next/link";

const flavorData = {
  "chocolate-chip-cookie": {
    name: "Chocolate Chip Cookie",
    description:
      "Classic chocolate chip cookie dough with gooey chips! These cookies are chewy with crisp edges, offering a sweet, buttery flavor with rich chocolate notes. Perfect for pairing with cold milk or a scoop of vanilla ice cream.",
  },
  snickerdoodle: {
    name: "Snickerdoodle",
    description:
      "Sweet snickerdoodle dough with a cinnamon twist! Soft and pillowy with a sugary crunch, they deliver a sweet taste with warm cinnamon spice. Enjoy them with hot chai tea or a pumpkin spice latte for a cozy treat.",
  },
  "sugar-cookie": {
    name: "Sugar Cookie",
    description:
      "Light and sweet sugar cookie dough, great for decorating! With a light and tender texture that slightly crumbles, they feature sweet, delicate vanilla undertones. Pair with Earl Grey tea or a fruity sorbet for a delightful experience.",
  },
};

export default function Menu() {
  const flavors = ["chocolate-chip-cookie", "snickerdoodle", "sugar-cookie"];

  return (
    <div className="min-h-screen bg-[#FFF2F6] w-full pt-24">
      <div className="w-full flex flex-col items-center py-8 px-0">
        <div className="w-full max-w-5xl mb-10 text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold mb-3 text-pink-700 drop-shadow">
            <span
              role="img"
              aria-label="sparkles"
            >
              ✨
            </span>{" "}
            Mo&apos;s Cookie Dough{" "}
            <span
              role="img"
              aria-label="sparkles"
            >
              ✨
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl mb-8 text-pink-700 font-semibold">
            Choose Your Flavor
          </h2>
        </div>

        <div className="w-full flex flex-col gap-12">
          {flavors.map((slug, idx) => {
            const { name, description } = flavorData[slug];
            const isEven = idx % 2 === 0;
            return (
              <div
                key={slug}
                className={`w-full flex flex-col md:flex-row ${
                  isEven ? "md:flex-row" : "md:flex-row-reverse"
                } items-stretch gap-0 md:gap-0 bg-white/80 shadow-md`}
                style={{ minHeight: "320px" }}
              >
                {/* Cookie Image/Button Side */}
                <Link
                  href={`/flavors/${slug}`}
                  className="group flex-1 min-h-[200px] flex"
                >
                  <div
                    className="w-full h-48 md:h-auto flex-1 bg-cover bg-center transition-transform hover:scale-105 cursor-pointer relative flex items-end"
                    style={{
                      backgroundImage: `url(/cookies/${slug}.jpg)`,
                      minHeight: "320px",
                    }}
                  >
                    {/* <span className="absolute left-0 bottom-0 right-0 text-white font-extrabold text-2xl sm:text-3xl mb-8 drop-shadow-lg bg-black/40 px-4 py-2 rounded-t-xl text-center pointer-events-none">
                      {name}
                    </span> */}
                  </div>
                </Link>
                {/* Text Side */}
                <div className="flex-1 flex flex-col justify-center items-center md:items-start p-8 md:p-12">
                  <h3 className="text-3xl sm:text-4xl font-bold text-pink-600 mb-2">
                    {name}
                  </h3>
                  <p className="text-lg sm:text-xl text-gray-700 mb-4">
                    {description}
                  </p>
                  <Link
                    href={`/flavors/${slug}`}
                    className="inline-block bg-pink-500 text-white font-semibold px-5 py-2 rounded-full shadow hover:bg-pink-700 transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-10">
          <Link
            href="/cart"
            className="inline-block text-lg font-bold text-white bg-pink-500 px-8 py-3 rounded-full hover:bg-pink-700 transition-colors duration-200 shadow-md"
          >
            Go to Cart
          </Link>
        </div>
      </div>
    </div>
  );
}
