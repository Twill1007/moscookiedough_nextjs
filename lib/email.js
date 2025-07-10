import { Resend } from "resend";

export async function sendOrderConfirmationEmail(to, order) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  return await resend.emails.send({
    from: "orders@moscookiedough.com", // You can use your verified sender address
    to,
    subject: "Your Mo’s Cookie Dough Order Confirmation",
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: <b>${order._id}</b></p>
      <ul>
        ${order.items.map((item) => `<li>${item.quantity} dozen ${item.name}</li>`).join("")}
      </ul>
      <p>Total: $${order.total}</p>
      <p>Your order will be delivered soon!</p>
    `,
  });
}
