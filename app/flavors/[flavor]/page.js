export default async function FlavorPage({ params }) {
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
  };

  const flavor = params.flavor;
  const data = flavorData[flavor] || {
    name: "Unknown Flavor",
    description: "Flavor not found!",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4">
      <div className="bg-white p-6 sm:p-8 md:p-10 rounded-xl shadow-lg max-w-md w-full text-center transform transition duration-300 hover:scale-105">
        <h1 className="text-4xl sm:text-5xl font-extrabold mb-6 text-amber-700">
          {data.name}
        </h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed">
          {data.description}
        </p>
      </div>
    </div>
  );
}
