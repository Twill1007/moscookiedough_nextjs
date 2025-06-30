import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

// Stripe instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  let event;
  let rawBody;

  try {
    // Get raw buffer from the request (App Router)
    rawBody = await req.arrayBuffer();
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("✅ Event received:", event.type);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
      session.id,
      {
        expand: ["line_items", "line_items.data.price.product"],
      }
    );

    try {
      const client = await clientPromise;
      const db = client.db(process.env.MONGODB_DB);
      await db.collection("orders").insertOne({
        stripeSessionId: session.id,
        email: session.metadata?.email || session.customer_email || "",
        name: session.metadata?.name || "",
        phone: session.metadata?.phone || "",
        address: {
          street: session.metadata?.street || "",
          city: session.metadata?.city || "",
          zip: session.metadata?.zip || "",
        },
        items: sessionWithLineItems.line_items.data.map((item) => ({
          name: item.description || item.price.product.name,
          quantity: item.quantity,
        })),
        total: session.amount_total / 100,
        createdAt: new Date(),
      });
      console.log("Webhook firing for session:", session.id);
      console.log("Order saved for session:", session.id);
    } catch (err) {
      console.error("DB save error:", err);
    }
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
