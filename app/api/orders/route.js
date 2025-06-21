import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(request) {
  try {
    const order = await request.json();
    const client = await clientPromise;
    const db = client.db("mos_cookie_dough");
    const orders = db.collection("orders");

    await orders.insertOne(order);

    return NextResponse.json(
      { message: "Order saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Order save error:", error);
    return NextResponse.json(
      { message: "Failed to save order" },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json(
    { message: "GET not implemented here." },
    { status: 405 }
  );
}
