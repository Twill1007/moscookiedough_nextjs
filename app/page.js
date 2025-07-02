import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center font-sans">
      {/* Nav Bar */}
      {/* <nav>...</nav> */}

      {/* Spacer for nav */}
      <div className="h-20" />

      {/* Hero Section */}
      <section
        className="w-full flex flex-col items-center justify-center py-20 border-b shadow-sm"
        style={{ background: "#F9F2E7" }}
      >
        <h1
          className="text-8xl sm:text-9xl mb-3 text-center"
          style={{
            color: "#7B4A21",
            fontFamily: "var(--font-chewy), cursive",
          }}
        >
          Mo&apos;s Cookie Dough
        </h1>

        <h2
          className="text-3xl sm:text-4xl mb-4 text-center font-bold"
          style={{
            color: "#7B4A21",
            fontFamily: "var(--font-geist-sans), Arial, sans-serif",
          }}
        >
          Bakery-Quality Cookies, Whenever You Want
        </h2>
        <p
          className="text-xl mb-8 text-center"
          style={{
            color: "#7B4A21",
            fontFamily: "var(--font-geist-sans), Arial, sans-serif",
          }}
        >
          Frozen dough delivered to your door—just bake and enjoy warm, fresh
          cookies anytime.
        </p>
        <Link
          href="/menu"
          className="bg-pink-600 hover:bg-pink-700 transition-colors text-white font-bold py-3 px-10 rounded-full text-lg shadow-lg border-2 border-white hover:scale-105 active:scale-95 duration-200"
          style={{ borderColor: "#7B4A21" }}
        >
          See the Menu
        </Link>
      </section>

      {/* Zig-Zag Info Section */}
      <div className="w-full max-w-5xl flex flex-col gap-20 py-16 px-4">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="w-64 h-64 rounded-full border-4 border-yellow-200 bg-white flex items-center justify-center shadow-xl overflow-hidden">
              {/* Replace with product image */}
              <span className="text-pink-300 text-lg">[Dough Balls Image]</span>
            </div>
          </div>
          {/* Text */}
          <div className="md:w-1/2 w-full px-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-3 font-[cursive]">
              Ready for the Freezer or Oven
            </h2>
            <p className="text-base text-gray-700 mb-2">
              Stock your freezer with Mo’s Dough cookie balls—pop one out for a
              midnight snack, or bake up a whole batch for a spontaneous family
              gathering. No prep, no cleanup. Just pure, doughy delight.
            </p>
            <p className="text-base text-gray-700">
              <span className="font-semibold">Bake them fresh, anytime.</span>{" "}
              The best cookies are the ones you make at home—with none of the
              hassle.
            </p>
          </div>
        </div>
        {/* Row 2 */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-8 md:gap-0">
          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="w-64 h-64 rounded-full border-4 border-blue-100 bg-white flex items-center justify-center shadow-xl overflow-hidden">
              {/* Replace with themed image */}
              <span className="text-blue-300 text-lg">
                [Family Movie Night Image]
              </span>
            </div>
          </div>
          {/* Text */}
          <div className="md:w-1/2 w-full px-6">
            <h2 className="text-2xl font-bold text-blue-600 mb-3 font-[cursive]">
              The Movie Night Experience
            </h2>
            <p className="text-base text-gray-700 mb-2">
              Imagine: The aroma of gooey cookies fills your home as the family
              gathers for movie night or a board game showdown. Blankets out,
              laughter in the air, and a tray of warm, fresh cookies for
              everyone to share.
            </p>
            <p className="text-base text-gray-700">
              <span className="font-semibold">
                Smell the love, taste the happiness.
              </span>{" "}
              Baking cookies brings everyone to the kitchen—then the couch,
              ready for the perfect night in.
            </p>
          </div>
        </div>
        {/* Row 3 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="w-64 h-64 rounded-full border-4 border-pink-100 bg-white flex items-center justify-center shadow-xl overflow-hidden">
              {/* Replace with themed image */}
              <span className="text-pink-300 text-lg">
                [Warm Cookies Image]
              </span>
            </div>
          </div>
          {/* Text */}
          <div className="md:w-1/2 w-full px-6">
            <h2 className="text-2xl font-bold text-pink-600 mb-3 font-[cursive]">
              Benefits of Freshly Baked Cookies
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li>
                <span className="font-semibold">Stress relief:</span> The scent
                of cookies baking is proven to relax and comfort.
              </li>
              <li>
                <span className="font-semibold">Togetherness:</span> Share the
                fun—kids love helping shape and bake their own treats!
              </li>
              <li>
                <span className="font-semibold">Instant celebration:</span> Any
                evening becomes special with a tray of warm cookies.
              </li>
              <li>
                <span className="font-semibold">Simple happiness:</span> Because
                a freshly baked cookie just makes life sweeter.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
