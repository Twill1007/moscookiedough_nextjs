import { ObjectId } from "mongodb";
import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function PATCH(request, { params }) {
  const orderId = params.id;
  const { itemIndex } = await request.json();

  try {
    const client = await clientPromise;
    const db = client.db("mos_cookie_dough");
    const collection = db.collection("orders");

    const updatePath = `items.${itemIndex}.filled`;

    await collection.updateOne(
      { _id: new ObjectId(orderId) },
      { $set: { [updatePath]: true } }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Failed to update item:", err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
