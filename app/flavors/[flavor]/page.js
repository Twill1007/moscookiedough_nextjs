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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center text-gray-900">
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">{data.name}</h1>
        <p className="text-lg text-gray-500">{data.description}</p>
      </div>
    </div>
  );
}
