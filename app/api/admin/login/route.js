import { NextResponse } from "next/server";

export async function POST(request) {
  const { username, password } = await request.json();

  // Check against environment variables
  const adminUser = process.env.ADMIN_USER;
  const adminPass = process.env.ADMIN_PASS;

  // Simple check (in a real app, use hashing and more security)
  if (username === adminUser && password === adminPass) {
    const response = NextResponse.json({
      success: true,
    });
    response.cookies.set("admin_auth", true, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 4,
    });
    return response;
  }
  return NextResponse.json(
    { success: false },
    {
      status: 401,
    }
  );
}
