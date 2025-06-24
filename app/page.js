import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-pink-100 to-yellow-50 flex flex-col items-center">
      {/* Nav Bar */}

      {/* Spacer for nav */}
      <div className="h-24" />

      {/* Hero Section */}
      <section className="w-full flex flex-col items-center justify-center py-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-pink-700 mb-4 drop-shadow text-center">
          Cookie Dough. Movie Night Magic.
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-8 text-center max-w-xl">
          Freshly-rolled dough balls delivered to your door—bake when you want
          or keep them in your freezer for the perfect moment. No mess. No
          hassle. Just pure joy.
        </p>
        <Link
          href="/menu"
          className="bg-pink-500 hover:bg-pink-700 transition-colors text-white font-bold py-3 px-10 rounded-full text-lg shadow-md text-center"
        >
          See the Menu
        </Link>
      </section>

      {/* Zig-Zag Info Section */}
      <div className="w-full max-w-5xl flex flex-col gap-20 pb-16">
        {/* Row 1 */}
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-0">
          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center">
            <div className="w-72 h-72 rounded-3xl bg-gray-200 flex items-center justify-center shadow-lg">
              {/* Swap src with real image */}
              <span className="text-gray-400 text-lg">[Dough Balls Image]</span>
            </div>
          </div>
          {/* Text */}
          <div className="md:w-1/2 w-full px-6">
            <h2 className="text-2xl font-bold text-pink-700 mb-3">
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
            <div className="w-72 h-72 rounded-3xl bg-gray-200 flex items-center justify-center shadow-lg">
              {/* Swap src with real image */}
              <span className="text-gray-400 text-lg">
                [Family Movie Night Image]
              </span>
            </div>
          </div>
          {/* Text */}
          <div className="md:w-1/2 w-full px-6">
            <h2 className="text-2xl font-bold text-pink-700 mb-3">
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
            <div className="w-72 h-72 rounded-3xl bg-gray-200 flex items-center justify-center shadow-lg">
              {/* Swap src with real image */}
              <span className="text-gray-400 text-lg">
                [Warm Cookies Image]
              </span>
            </div>
          </div>
          {/* Text */}
          <div className="md:w-1/2 w-full px-6">
            <h2 className="text-2xl font-bold text-pink-700 mb-3">
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
      {/* Footer */}
      <footer className="w-full py-8 mt-auto text-center text-sm text-gray-400 bg-pink-50">
        &copy; {new Date().getFullYear()} Mo&apos;s Dough — Spread joy, one
        cookie at a time.
      </footer>
    </div>
  );
}
