import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";
import { useNavigate } from "react-router-dom";

export default function Cart() {
    const [cart, setCart] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCart = async () => {
            try {
                const response = await axios.get("/api/cart", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log('Cart data:', response.data);
                setCart(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to load cart");
            } finally {
                setLoading(false);
            }
        };
        fetchCart();
    }, []);

    const handleQuantityChange = async (itemId, newQty) => {
        if (newQty < 1) return;
        try {
            const response = await axios.put(
                `/api/cart/items/${itemId}`,
                { quantity: newQty },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data);
        } catch (err) {
            setError("Failed to update quantity");
        }
    };

    const handleRemove = async (itemId) => {
        try {
            const response = await axios.delete(
                `/api/cart/items/${itemId}`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setCart(response.data);
        } catch (err) {
            setError("Failed to remove item");
        }
    };

    const handleClearCart = async () => {
        try {
            await axios.delete("/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCart({ items: [] });
        } catch (err) {
            setError("Failed to clear cart");
        }
    };

    if (loading) return <div className="text-center mt-10">Loading cart...</div>;
    if (error) return <div className="text-center text-red-600 mt-10">{error}</div>;

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar />
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-6 text-center">Your Cart</h2>

                {!cart || cart.items.length === 0 ? (
                    <p className="text-gray-600 text-center">Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="divide-y divide-gray-200 mb-6">
                            {cart.items.map((item) => (
                                <li key={item._id} className="py-4 flex items-center justify-between">
                                    <div className="flex items-center space-x-4">
                                        <img
                                            src={item.product?.image ? `http://localhost:3000/images/${item.product.image}` : 'https://picsum.photos/200'}
                                            alt={item.product?.name || "Product"}
                                            className="w-16 h-16 object-cover rounded"
                                        />
                                        <div>
                                            <h3 className="font-medium text-gray-800">{item.product?.name || "Unnamed Product"}</h3>
                                            <p className="text-sm text-gray-500">Price: £{item.product?.price.toFixed(2)}</p>
                                            <div className="flex items-center mt-2 space-x-2">
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, item.quantity - 1)}
                                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                >
                                                    −
                                                </button>
                                                <span className="text-gray-700 font-medium">{item.quantity}</span>
                                                <button
                                                    onClick={() => handleQuantityChange(item._id, item.quantity + 1)}
                                                    className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col items-end">
                                        <p className="font-semibold text-gray-800">
                                            £{(item.product.price * item.quantity).toFixed(2)}
                                        </p>
                                        <button
                                            onClick={() => handleRemove(item._id)}
                                            className="text-sm text-red-500 mt-2 hover:text-red-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-between items-center border-t pt-4">
                            <h3 className="text-lg font-semibold text-gray-700">Total:</h3>
                            <p className="text-xl font-bold text-gray-900">
                                £{cart.items.reduce((total, item) => total + item.product.price * item.quantity, 0).toFixed(2)}
                            </p>
                        </div>

                        <div className="flex justify-between mt-6">
                            <button
                                onClick={handleClearCart}
                                className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                            >
                                Clear Cart
                            </button>
                            <button
                                onClick={() => navigate('/checkout')}
                                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                            >
                                Place Order
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
