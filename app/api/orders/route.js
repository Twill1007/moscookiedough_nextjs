// app/api/orders/route.js
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { sendOrderConfirmationEmail } from "@/lib/email";

export async function POST(request) {
  try {
    const order = await request.json();
    const client = await clientPromise;
    const db = client.db("MOSDOUGHNEXTJS");
    const orders = db.collection("orders");

    const result = await orders.insertOne(order);

    await sendOrderConfirmationEmail(order.email, {
      ...order,
      _id: result.insertedId, // So the customer sees their order ID
    });

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
