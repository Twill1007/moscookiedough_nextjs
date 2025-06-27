import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logged Out" });
  response.cookies.set("admin_auth", "", {
    httpOnly: true,
    path: "/",
    maxAge: 0,
    sameSite: "lax",
  });

  return response;
}
