import { buffer } from "micro";
import Stripe from "stripe";
import clientPromise from "@/lib/mongodb";

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const sig = req.headers["stripe-signature"];
  let event;
  let rawBody;

  try {
    rawBody = await buffer(req);
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
    console.log("✅ Event received:", event.type);
  } catch (err) {
    console.error("❌ Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
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
        email: session.metadata?.email || "",
        name: session.metadata?.name || "",
        items: sessionWithLineItems.line_items.data.map((item) => ({
          name: item.description || item.price.product.name,
          quantity: item.quantity,
        })),
        total: session.amount_total / 100,
        createdAt: new Date(),
      });
      console.log("Order saved for session:", session.id);
    } catch (err) {
      console.error("DB save error:", err);
    }
  }

  res.status(200).json({ received: true });
}
