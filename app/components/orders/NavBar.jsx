"use client";

import Link from "next/link";
import { useState } from "react";
import CartButton from "./CartButton";
import Button from "./Button";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; // use Lucide for icons or swap for your preferred library

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();

  return (
    <nav
      className={`
    w-full flex justify-between items-center
    px-3 py-2 sm:px-10 sm:py-5
    fixed top-0 left-0 z-20
    transition-all bg-[#f8f1e4]
  `}
    >
      {/* Logo & Title */}
      <div className="flex items-center gap-2 sm:gap-3">
        <Link
          href="/"
          className="flex items-center gap-2 sm:gap-3"
        >
          <img
            src="/cookies/logo.jpg"
            alt="Mo's Dough Logo"
            className="h-10 w-10 sm:h-14 sm:w-14 rounded-full transition-all duration-200"
          />
          <span
            style={{
              color: "#7B4A21",
              fontFamily: "var(--font-chewy), cursive",
              letterSpacing: "1px",
              lineHeight: 1,
            }}
            className="font-normal sm:text-4xl text-2xl transition-all duration-200"
          >
            Mo&apos;s Cookie Dough
          </span>
        </Link>
      </div>
      {/* Desktop Nav */}
      <div className="hidden sm:flex gap-3 sm:gap-8 items-center">
        <Button
          size="sm"
          className="px-3 py-2 text-base"
          onClick={() => router.push("/menu")}
        >
          Cookies
        </Button>
        <Button
          size="sm"
          className="px-3 py-2 text-base"
          onClick={() => router.push("/about")}
        >
          About
        </Button>
        <CartButton
          style={{
            color: "#7B4A21",
            fontFamily: "var(--font-geist-sans), Arial, sans-serif",
            fontSize: "1.3rem",
            minWidth: "0",
          }}
        />
      </div>
      {/* Hamburger */}
      <div className="sm:hidden flex items-center gap-1">
        <CartButton
          style={{
            color: "#7B4A21",
            fontFamily: "var(--font-geist-sans), Arial, sans-serif",
            fontSize: "1.2rem",
            minWidth: "0",
          }}
        />
        <button
          aria-label="Open Menu"
          className="p-2"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <X
              size={28}
              color="#7B4A21"
            />
          ) : (
            <Menu
              size={28}
              color="#7B4A21"
            />
          )}
        </button>
      </div>
      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-40">
          <div className="absolute right-0 top-0 w-56 h-full bg-white shadow-lg flex flex-col pt-20 pb-8 px-6 gap-4 animate-slide-in">
            <Button
              size="sm"
              className="w-full text-base"
              onClick={() => {
                setMenuOpen(false);
                router.push("/menu");
              }}
            >
              Cookies
            </Button>
            <Button
              size="sm"
              className="w-full text-base"
              onClick={() => {
                setMenuOpen(false);
                router.push("/about");
              }}
            >
              About
            </Button>
            <button
              className="mt-auto py-2 text-[#7B4A21] font-bold"
              onClick={() => setMenuOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Animation (optional) */}
      <style
        jsx
        global
      >{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0.8;
          }
          to {
            transform: translateX(0%);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.25s cubic-bezier(0.4, 0, 0.2, 1) both;
        }
      `}</style>
    </nav>
  );
}
