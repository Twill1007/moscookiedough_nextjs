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
    <div className="min-h-screen bg-white w-full pt-24">
      <div className="w-full flex flex-col items-center py-8 px-4">
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

        <div className="w-full flex flex-col gap-12 max-w-5xl">
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
                  <div
                    className="w-64 h-64 md:w-72 md:h-72 rounded-full bg-white border-4 border-pink-100 shadow-lg flex items-center justify-center overflow-hidden transition-transform hover:scale-105 cursor-pointer"
                    style={{
                      backgroundImage: `url(/cookies/${slug}.jpg)`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                    }}
                  >
                    {/* Remove this if you have real images */}
                    {/* <span className="text-pink-300 text-lg">{name}</span> */}
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
                  <Link
                    href={`/flavors/${slug}`}
                    className="inline-block bg-pink-500 text-white font-semibold px-6 py-2 rounded-full shadow-lg hover:bg-pink-700 transition"
                  >
                    See Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
