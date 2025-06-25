// app/admin/page.jsx
import { cookies } from "next/headers";
import AdminClientPage from "./AdminClientPage";

export default async function AdminPage() {
  // Check for admin_auth cookie
  const isAdmin = cookies().get("admin_auth")?.value === "true";

  if (!isAdmin) {
    // Not authenticated, show message or redirect
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        Unauthorized. Please{" "}
        <a
          href="/admin/login"
          className="underline ml-1"
        >
          login
        </a>
        .
      </div>
    );
  }

  // Option 1: Fetch orders here and pass as prop to client page
  // const orders = await fetchOrdersFromDB();

  // Option 2: Let the client page fetch as before, just protect with auth
  return <AdminClientPage />;
}
