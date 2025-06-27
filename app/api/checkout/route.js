import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { line_items, customerInfo } = await request.json(); // <--- add customerInfo

  // Add these lines:
  console.log("API /api/checkout received customerInfo:", customerInfo);
  console.log("  name:", customerInfo?.name);
  console.log("  email:", customerInfo?.email);

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url:
        "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cancel",
      customer_email: customerInfo?.email || "",
      metadata: {
        name: customerInfo?.name || "",
        email: customerInfo?.email || "",
        // add more if needed
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
