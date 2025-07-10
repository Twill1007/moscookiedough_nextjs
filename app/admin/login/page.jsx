"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Invalid credentials. Please try again");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8F6F2]">
      <form
        onSubmit={handleLogin}
        className="
          bg-white 
          p-8 
          rounded-2xl 
          shadow-2xl 
          w-full 
          max-w-sm 
          border 
          border-[#E9DED3]
        "
      >
        <h1 className="text-3xl font-extrabold text-[#7C3F2C] mb-6 tracking-tight text-center">
          Admin Login
        </h1>

        {error && (
          <p className="text-red-600 mb-3 text-center font-medium">{error}</p>
        )}
        <div className="mb-4">
          <label className="block text-[#7C3F2C] font-semibold mb-1">
            Username
          </label>
          <input
            type="text"
            className="
              w-full 
              px-3 
              py-2 
              border 
              border-[#E9DED3]
              rounded-lg 
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#7C3F2C]
              text-[#473122]
              bg-[#FAF9F7]
              placeholder:text-[#B7A99A]
            "
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
            placeholder="Enter username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-[#7C3F2C] font-semibold mb-1">
            Password
          </label>
          <input
            type="password"
            className="
              w-full 
              px-3 
              py-2 
              border 
              border-[#E9DED3]
              rounded-lg 
              focus:outline-none 
              focus:ring-2 
              focus:ring-[#7C3F2C]
              text-[#473122]
              bg-[#FAF9F7]
              placeholder:text-[#B7A99A]
            "
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
            placeholder="Enter password"
          />
        </div>
        <button
          type="submit"
          className="
            w-full 
            bg-[#7C3F2C]       /* Chocolate brown */
            text-white 
            py-2 
            rounded-lg 
            font-bold 
            shadow 
            hover:bg-[#9c543d] 
            transition
            tracking-wide
            text-lg
          "
        >
          Login
        </button>
      </form>
    </div>
  );
}
