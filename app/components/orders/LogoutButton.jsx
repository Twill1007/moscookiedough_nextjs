"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    //call API to clear cache
    await fetch("/api/admin/logout", {
      method: "POST",
    });
    router.push("/admin/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-pink-500 cursor-pointer text-white py-2 px-5 rounded-full font-semibold shadow hover:bg-pink-700 transition"
    >
      Logout
    </button>
  );
}
