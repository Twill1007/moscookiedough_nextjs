import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const session_id = searchParams.get("session_id");
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const order = await db
    .collection("orders")
    .findOne({ stripeSessionId: session_id });

  return NextResponse.json({ order });
}
