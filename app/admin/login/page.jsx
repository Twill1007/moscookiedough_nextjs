"use client";

import { useState } from "react";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      window.location.href = "/admin";
    } else {
      setError("Invalid credentials. Please try again");
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm"
      >
        <h1 className="text-2xl font-bold text-pink-700 mb-6">Admin Login</h1>

        {error && <p className="text-red-600 mb-3 text-center"> {error} </p>}
        <div className="mb-4">
          <label className="block text-pink-700 mb-1">Username</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md text-black"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label className="block text-pink-700 mb-1">Password</label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md  text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-2 rounded-md font-semibold hover:bg-pink-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
}
