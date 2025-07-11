"use client";

import Button from "./components/orders/Button";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen w-full bg-white flex flex-col items-center font-sans">
      {/* Nav Bar */}
      {/* <nav>...</nav> */}

      {/* Spacer for nav */}
      <div className="h-20" />

      {/* Hero Section */}
      <section
        className="w-full flex flex-col items-center justify-center py-10 mt-10 border-b shadow-sm"
        style={{ background: "#E5C99B" }}
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
        <Button
          onClick={() => router.push("/menu")}
          style={{ minWidth: 200 }}
        >
          Shop Our Cookies!
        </Button>
      </section>

      {/* Zig-Zag Info Section: Full-Bleed Rows */}

      <div className="flex flex-col gap-20 py-20">
        {/* Row 1: Image Left, Text Right */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-white shadow-lg overflow-hidden flex flex-col md:flex-row items-center md:items-stretch"
        >
          <div className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-white shadow-lg overflow-hidden flex flex-col md:flex-row items-center md:items-stretch">
            {/* Image */}
            <div className="md:w-1/2 w-full flex justify-center items-center ">
              <span>
                <img src={`/cookies/Cookie-Dough-Sheet.jpg`} />
              </span>
            </div>
            {/* Text */}
            <section className="md:w-1/2 w-full flex flex-col justify-center items-center px-4 md:px-20 py-8 text-center">
              <div className="max-w-2xl w-full">
                <h2
                  className="text-5xl font-bold mb-6"
                  style={{
                    color: "#7B4A21",
                    fontFamily: "var(--font-chewy), cursive",
                  }}
                >
                  Always Ready, Always Fresh
                </h2>
                <p
                  className="text-2xl"
                  style={{ color: "#7B4A21" }}
                >
                  With Mo’s Cookie Dough, you’re always minutes from warm, fresh
                  cookies.
                  <br />
                  Keep our frozen dough in your freezer and bake a batch
                  anytime—no prep, no mess, just pure cookie bliss.
                </p>
              </div>
            </section>
          </div>
        </motion.div>
        {/* Row 2: Image Right, Text Left */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F8E8D5] shadow-lg overflow-hidden flex flex-col md:flex-row-reverse items-center md:items-stretch"
        >
          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center items-center">
            <span>
              <img src={`/cookies/Snickerdoodle-Cookie-LandingPage.jpg`} />
            </span>
          </div>
          {/* Text */}
          <section className="md:w-1/2 w-full flex flex-col justify-center items-center px-4 md:px-20 py-8 text-center">
            <div className="max-w-2xl w-full">
              <h2
                className="text-4xl font-bold mb-6"
                style={{
                  color: "#A17043",
                  fontFamily: "var(--font-chewy), cursive",
                }}
              >
                Why Mo’s Cookie Dough?
              </h2>
              <ul className="list-none space-y-4 text-2xl text-[#7B4A21]">
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#A17043"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Always on hand for cravings or company
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#A17043"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Bakes up fresh, gooey, and golden every time
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M5 13l4 4L19 7"
                      stroke="#A17043"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  No mess, no mixing, just pure joy
                </li>
              </ul>
            </div>
          </section>
        </motion.div>

        {/* Row 3: Image Left, Text Right */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="relative left-1/2 right-1/2 -mx-[50vw] w-screen bg-[#F3E0C7] shadow-lg overflow-hidden flex flex-col md:flex-row items-center md:items-stretch"
        >
          {/* Image */}
          <div className="md:w-1/2 w-full flex justify-center items-center">
            <span>
              <img src={`/cookies/CC_Broken.jpg`} />
            </span>
          </div>
          {/* Text */}
          <section className="md:w-1/2 w-full flex flex-col justify-center items-center px-4 md:px-20 py-8 text-center">
            <div className="max-w-2xl w-full">
              <h2
                className="text-4xl font-bold mb-6"
                style={{
                  color: "#7B4A21",
                  fontFamily: "var(--font-chewy), cursive",
                }}
              >
                Made with the Best Ingredients
              </h2>
              <p
                className="text-2xl"
                style={{ color: "#7B4A21" }}
              >
                Every batch of Mo’s Cookie Dough starts with the highest quality
                ingredients—real butter, pure vanilla, and rich chocolate chips.
                We never cut corners or use artificial flavors. Our dough is
                crafted in small batches for exceptional taste and texture, so
                you get a cookie that’s soft in the center, golden at the edges,
                and bursting with real homemade flavor.
                <br />
                <br />
                When you serve Mo’s, you’re treating yourself and those you love
                to a premium, bakery-quality cookie experience—anytime you want
                it.
              </p>
            </div>
          </section>
        </motion.div>
      </div>
    </div>
  );
}
