import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  const { username, password } = await request.json();

  // Check username
  if (username !== process.env.ADMIN_USER) {
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }

  // Check password
  const isValid = await bcrypt.compare(password, process.env.ADMIN_HASH);
  if (!isValid) {
    return NextResponse.json({ error: "Invalid Credentials" }, { status: 401 });
  }

  // Login successful - set cookie
  const response = NextResponse.json(
    { message: "Login Successful" },
    { status: 200 }
  );
  response.cookies.set("admin_auth", "true", {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
    // secure: true, // add in production/https
    maxAge: 60 * 60 * 2, // 2 hours
  });

  return response;
}
