export default function AboutPage() {
  return (
    <div className="pt-24 pb-24 min-h-screen bg-white flex items-center justify-center">
      <div
        className="max-w-xl w-full mx-auto p-10 rounded-2xl shadow-xl text-center"
        style={{
          background: "white",
          color: "#7B4A21", // default text color (milk chocolate)
          border: "1px solid #FFD59E", // soft golden border
        }}
      >
        <h1
          className="text-4xl font-extrabold mb-3"
          style={{
            color: "#7B4A21", // headline chocolate
            fontFamily: "var(--font-chewy), cursive",
          }}
        >
          About Mo’s Cookie Dough
        </h1>
        <div className="flex justify-center mb-6">
          <span className="text-5xl">🍪</span>
        </div>
        <p
          className="text-xl font-semibold mb-4"
          style={{ color: "#7B4A21" }}
        >
          Coming Soon!
        </p>
        <p
          className="text-base"
          style={{ color: "#7B4A21" }}
        >
          We’re mixing up something special behind the scenes.
          <br />
          Check back soon to learn more about Mo’s Cookie Dough and our story!
        </p>
      </div>
    </div>
  );
}
