import Link from "next/link";
import CartButton from "./CartButton";

export default function NavBar() {
  return (
    <nav className="w-full flex justify-between items-center px-8 py-6 bg-white/70 shadow-sm fixed top-0 left-0 z-20">
      <div className="flex items-center gap-3">
        {/* Logo (replace with your logo src) */}
        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="Mo's Dough Logo"
            className="h-10 w-10 rounded-full object-contain border border-pink-300"
          />
          <span className="font-extrabold text-2xl text-pink-700">
            Mo&apos;s Dough
          </span>
        </Link>
      </div>
      <div className="flex gap-6">
        <Link
          href="/menu"
          className="text-pink-700 font-semibold hover:underline"
        >
          Menu
        </Link>
        <Link
          href="/about"
          className="text-pink-700 font-semibold hover:underline"
        >
          About
        </Link>
        <CartButton>Cart</CartButton>
      </div>
    </nav>
  );
}
