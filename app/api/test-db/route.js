// app/api/test-db/route.js
import clientPromise from "../../../lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("modough"); // Replace with your database name
    const collection = db.collection("test"); // Replace with your collection name

    await collection.insertOne({
      test: "Connection successful",
      timestamp: new Date(),
    });
    const data = await collection.find({}).limit(1).toArray();

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("MongoDB connection error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to connect to MongoDB" },
      { status: 500 }
    );
  }
}
