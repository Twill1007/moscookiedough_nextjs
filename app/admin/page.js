"use client";

import { useEffect, useState } from "react";
import OrderDetail from "../components/orders/OrderDetail";

export default function AdminPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/admin/orders");
        const data = await res.json();
        setOrders(data.orders || []);
      } catch (error) {
        console.error("Failed to fetch orders:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, []);

  return (
    <div className="p-6 max-w-4xl text-black mx-auto relative">
      <h1 className="text-3xl font-bold text-amber-600 mb-6">Admin Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => {
            const totalQty = order.items.reduce(
              (sum, item) => sum + parseInt(item.quantity),
              0
            );
            return (
              <button
                key={index}
                onClick={() => setSelectedOrder(order)}
                className="w-full text-left bg-white cursor-pointer hover:bg-amber-200 px-4 py-3 rounded-md shadow-sm border border-amber-300 transition-colors"
              >
                <span className="font-medium text-lg">{order.name}</span>
                <span className="block text-sm text-gray-700">
                  {order.items
                    .map((item) => `${item.quantity} Dozen ${item.flavor}`)
                    .join(", ")}
                </span>
              </button>
            );
          })}
        </div>
      )}

      {/* Overlay for Order Details */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <OrderDetail
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      )}
    </div>
  );
}
