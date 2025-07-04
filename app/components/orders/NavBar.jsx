"use client";

import Link from "next/link";
import CartButton from "./CartButton";
import Button from "./Button";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav
      className="
        w-full flex justify-between items-center
        px-4 py-2 sm:px-10 sm:py-8
        fixed top-0 left-0 z-20
        transition-all
      "
    >
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/cookies/logo.jpg"
            alt="Mo's Dough Logo"
            className="h-14 w-14 sm:h-14 sm:w-14 rounded-full"
          />
          <span
            style={{
              color: "#7B4A21",
              fontFamily: "var(--font-chewy), cursive",
              fontSize: "2.3rem", // Bigger font!
              fontWeight: 400,
              letterSpacing: "1px",
              lineHeight: 1,
            }}
            className="sm:text-5xl text-3xl"
          >
            Mo&apos;s Cookie Dough
          </span>
        </Link>
      </div>
      <div className="flex gap-4 sm:gap-8 items-center">
        <Button onClick={() => router.push("/menu")}>Cookies</Button>
        <Button onClick={() => router.push("/about")}>About</Button>
        <span style={{ display: "flex", alignItems: "center" }}>
          <CartButton
            style={{
              color: "#7B4A21",
              fontFamily: "var(--font-geist-sans), Arial, sans-serif",
              fontSize: "1.5rem",
            }}
          />
        </span>
      </div>
    </nav>
  );
}
