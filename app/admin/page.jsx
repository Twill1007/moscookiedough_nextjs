"use client";

import { useEffect, useState } from "react";
import OrderDetail from "../components/orders/OrderDetail";
import FulfilledOrders from "../components/orders/FulfilledOrders";

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

  // Filter orders by fulfillment status
  const openOrders = orders.filter((order) =>
    order.items.some((item) => !item.filled)
  );
  const fulfilledOrders = orders.filter((order) =>
    order.items.every((item) => item.filled)
  );

  return (
    <div className="p-6 max-w-4xl text-black mx-auto relative">
      <h1 className="text-3xl font-bold text-amber-600 mb-6">Admin Orders</h1>

      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          {/* Open Orders Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-amber-700">
              Open Orders
            </h2>
            {openOrders.length === 0 ? (
              <p className="text-gray-600">No open orders.</p>
            ) : (
              <div className="space-y-3">
                {openOrders.map((order, index) => (
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
                ))}
              </div>
            )}
          </section>

          {/* Fulfilled Orders Section */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-green-700">
              Fulfilled Orders
            </h2>
            {fulfilledOrders.length === 0 ? (
              <p className="text-gray-600">No fulfilled orders.</p>
            ) : (
              <div className="space-y-3">
                <FulfilledOrders
                  orders={fulfilledOrders}
                  onSelect={(order) => setSelectedOrder(order)}
                />
              </div>
            )}
          </section>

          {/* Order History Placeholder */}
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-3 text-blue-700">
              Order History
            </h2>
            <p className="text-gray-600">
              [Placeholder] Will archive all past orders here.
            </p>
          </section>
        </>
      )}

      {/* Order Detail Overlay */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
          <OrderDetail
            order={selectedOrder}
            setSelectedOrder={setSelectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        </div>
      )}
    </div>
  );
}
