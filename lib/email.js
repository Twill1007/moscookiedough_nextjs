import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendOrderConfirmationEmail(to, order) {
  return await resend.emails.send({
    from: "orders@moscookiedough.com", // You can use your verified sender address
    to,
    subject: "Your Mo’s Cookie Dough Order Confirmation",
    html: `
      <h2>Thank you for your order!</h2>
      <p>Order ID: <b>${order._id}</b></p>
      <ul>
        ${order.items.map((item) => `<li>${item.qty} x ${item.name}</li>`).join("")}
      </ul>
      <p>Total: $${order.total}</p>
      <p>We’ll notify you when your order is on its way!</p>
    `,
  });
}
