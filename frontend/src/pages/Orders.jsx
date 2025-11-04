import { useEffect, useState } from "react";
import Navbar from "../components/Navbar.jsx";
import axios from "axios";

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("/api/orders", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch orders");
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div className="text-center mt-10">Loading orders...</div>;
    if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar />
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-6 text-center">Your Orders</h2>

                {orders.length === 0 ? (
                    <p className="text-gray-600 text-center">You have no orders yet.</p>
                ) : (
                    <ul className="divide-y divide-gray-200">
                        {orders.map((order) => (
                            <li key={order._id} className="py-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold text-gray-800">Order ID: {order._id}</span>
                                    <span className={`px-2 py-1 rounded text-white ${order.status === "pending"
                                        ? "bg-yellow-500"
                                        : order.status === "completed"
                                            ? "bg-green-500"
                                            : "bg-gray-500"
                                        }`}>
                                        {order.status}
                                    </span>
                                </div>

                                <ul className="mb-2">
                                    {order.items.map((item) => (
                                        <li key={item.product._id} className="flex items-center justify-between text-gray-700 mb-2">
                                            <div className="flex items-center space-x-4">
                                                <img
                                                    src={item.product.image ? `http://localhost:3000/images/${item.product.image}` : 'https://picsum.photos/200'}
                                                    alt={item.product.name}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                                <span>{item.product.name} x {item.quantity}</span>
                                            </div>
                                            <span>£{(item.price * item.quantity).toFixed(2)}</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="text-right font-bold text-gray-900">
                                    Total: £{order.total.toFixed(2)}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
