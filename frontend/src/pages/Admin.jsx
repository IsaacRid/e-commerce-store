import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar.jsx";

export default function AdminDashboard() {
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingOrders, setLoadingOrders] = useState(true);
    const [error, setError] = useState("");
    const [showEditModal, setShowEditModal] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', price: '', stock: '', image: '' });

    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await axios.get("/api/products", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(res.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch products");
            } finally {
                setLoadingProducts(false);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await axios.get("/api/orders/admin", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setOrders(res.data);
            } catch (err) {
                setError(err.response?.data?.error || "Failed to fetch orders");
            } finally {
                setLoadingOrders(false);
            }
        };
        fetchOrders();
    }, []);

    const handleDeleteProduct = async (productId) => {
        if (!window.confirm("Are you sure you want to delete this product?")) return;
        try {
            await axios.delete(`/api/products/${productId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setProducts(products.filter((p) => p._id !== productId));
        } catch (err) {
            setError("Failed to delete product");
        }
    };

    const openEditModal = (product) => {
        setEditProduct(product);
        setEditForm({
            name: product.name,
            price: product.price,
            stock: product.stock,
            image: product.image || '',
        });
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
        setEditProduct(null);
    };

    const handleEditFormChange = (e) => {
        const { name, value } = e.target;
        setEditForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleEditProductSave = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(
                `/api/products/${editProduct._id}`,
                {
                    name: editForm.name,
                    price: Number(editForm.price),
                    stock: Number(editForm.stock),
                    image: editForm.image,
                },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            setProducts((prev) =>
                prev.map((p) => (p._id === editProduct._id ? res.data : p))
            );
            closeEditModal();
        } catch (err) {
            setError("Failed to update product");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Navbar />
            <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
            {error && <div className="text-red-600 text-center mb-4">{error}</div>}

            <div className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">Products</h2>
                {loadingProducts ? (
                    <p>Loading products...</p>
                ) : products.length === 0 ? (
                    <p>No products found.</p>
                ) : (
                    <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.map((product) => (
                            <li key={product._id} className="bg-white p-4 rounded shadow flex flex-col">
                                <img
                                    src={product.image ? `http://localhost:3000/images/${product.image}` : 'https://picsum.photos/200'}
                                    alt={product.name}
                                    className="h-40 object-cover mb-2 rounded"
                                />
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-gray-600 mb-2">£{product.price.toFixed(2)}</p>
                                <p className="text-sm text-gray-500 mb-2">Stock: {product.stock}</p>
                                <div className="mt-auto flex space-x-2">
                                    <button
                                        className="flex-1 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                        onClick={() => openEditModal(product)}
                                    >
                                        Edit
                                    </button>

                                    {showEditModal && (
                                        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                                            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
                                                <button
                                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl"
                                                    onClick={closeEditModal}
                                                    aria-label="Close"
                                                >
                                                    &times;
                                                </button>
                                                <h2 className="text-xl font-semibold mb-4">Edit Product</h2>
                                                <form onSubmit={handleEditProductSave} className="space-y-4">
                                                    <div>
                                                        <label className="block text-gray-700 mb-1">Name</label>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            value={editForm.name}
                                                            onChange={handleEditFormChange}
                                                            className="w-full border rounded px-3 py-2"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 mb-1">Price (£)</label>
                                                        <input
                                                            type="number"
                                                            name="price"
                                                            value={editForm.price}
                                                            onChange={handleEditFormChange}
                                                            className="w-full border rounded px-3 py-2"
                                                            min="0"
                                                            step="0.01"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 mb-1">Stock</label>
                                                        <input
                                                            type="number"
                                                            name="stock"
                                                            value={editForm.stock}
                                                            onChange={handleEditFormChange}
                                                            className="w-full border rounded px-3 py-2"
                                                            min="0"
                                                            required
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="block text-gray-700 mb-1">Image Filename</label>
                                                        <input
                                                            type="text"
                                                            name="image"
                                                            value={editForm.image}
                                                            onChange={handleEditFormChange}
                                                            className="w-full border rounded px-3 py-2"
                                                            placeholder="e.g. product.jpg"
                                                        />
                                                        <div className="mt-2">
                                                            <span className="text-xs text-gray-500">Image must exist in backend public/images folder.</span>
                                                        </div>
                                                    </div>
                                                    <button
                                                        type="submit"
                                                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-semibold"
                                                    >
                                                        Save Changes
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    )}
                                    <button
                                        onClick={() => handleDeleteProduct(product._id)}
                                        className="flex-1 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">Orders</h2>
                {loadingOrders ? (
                    <p>Loading orders...</p>
                ) : orders.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    <ul className="divide-y divide-gray-200 bg-white rounded shadow p-4">
                        {orders.map((order) => (
                            <li key={order._id} className="py-4">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="font-semibold">Order ID: {order._id}</span>
                                    <span
                                        className={`px-2 py-1 rounded text-white ${order.status === "pending"
                                            ? "bg-yellow-500"
                                            : order.status === "completed"
                                                ? "bg-green-500"
                                                : "bg-gray-500"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </div>
                                <ul className="mb-2">
                                    {order.items.map((item) => (
                                        <li key={item._id} className="flex items-center space-x-4">
                                            <img
                                                src={item.product?.image ? `http://localhost:3000/images/${item.product.image}` : 'https://picsum.photos/100'}
                                                alt={item.product?.name}
                                                className="w-16 h-16 object-cover rounded"
                                            />
                                            <span>{item.product.name} x {item.quantity}</span>
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
