import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  const { line_items, customerInfo } = await request.json(); // <--- add customerInfo

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url:
        "https://moscookiedough.com/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "https://moscookiedough.com/cancel",

      customer_email: customerInfo?.email || "",
      metadata: {
        name: customerInfo?.name || "",
        phone: customerInfo?.phone || "",
        street: customerInfo?.address?.street || "",
        city: customerInfo?.address?.city || "",
        zip: customerInfo?.address?.zip || "",
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
