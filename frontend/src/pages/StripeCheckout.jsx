import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

const stripePromise = loadStripe("pk_test_51SIpbxBtfvmTs6xxWrttbWlxCLmy8A17xm4uVzdQH7FDbZw7xyoKrZ8PnoJlrU0ZM0uiRLz1oy6uztueTlxmdyUW0099VWjLgu"); // Replace with your real key

function CheckoutForm({ amount }) {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const [cart, setCart] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        axios.get("/api/cart", { headers: { Authorization: `Bearer ${token}` } })
            .then(res => setCart(res.data))
            .catch(() => setCart(null));
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;
        setLoading(true);
        setMessage("");
        try {
            const token = localStorage.getItem("token");
            const paymentAmount = Math.round((cart && cart.items ? total : amount / 100) * 100);
            if (!paymentAmount || typeof paymentAmount !== "number" || paymentAmount <= 0) {
                setMessage("Error: Invalid payment amount.");
                setLoading(false);
                return;
            }
            const { data } = await axios.post(
                "/api/payment/intent",
                { amount: paymentAmount },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            const { clientSecret } = data;
            const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: { card: elements.getElement(CardElement) },
            });
            if (!error) {
                await axios.post(
                    "/api/orders",
                    {},
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                setMessage("Success: Payment successful!");
                setTimeout(() => {
                    navigate("/home");
                }, 1200);
            } else {
                setMessage(error.message);
            }
        } catch (err) {
            setMessage("Error: Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const total = cart && cart.items ? cart.items.reduce((sum, item) => {
        const price = Number(item.product?.price) || 0;
        return sum + price * item.quantity;
    }, 0) : amount / 100;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">Checkout</h2>
                {cart && cart.items && cart.items.length > 0 && (
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Order Summary</h3>
                        <ul className="divide-y divide-gray-200 mb-2">
                            {cart.items.map(item => (
                                <li key={item._id} className="py-2 flex items-center justify-between">
                                    <div className="flex items-center space-x-3">
                                        <img
                                            src={item.product?.image ? `http://localhost:3000/images/${item.product.image}` : 'https://picsum.photos/40'}
                                            alt={item.product?.name}
                                            className="w-10 h-10 object-cover rounded"
                                        />
                                        <span className="font-medium text-gray-800">{item.product?.name}</span>
                                        <span className="text-gray-500 text-sm">x{item.quantity}</span>
                                    </div>
                                    <span className="font-semibold text-gray-700">£{((Number(item.product?.price) || 0) * item.quantity).toFixed(2)}</span>
                                </li>
                            ))}
                        </ul>
                        <div className="flex justify-between items-center border-t pt-2">
                            <span className="font-semibold text-gray-700">Total:</span>
                            <span className="text-xl font-bold text-gray-900">£{total.toFixed(2)}</span>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-600 mb-2 font-medium">Card Details</label>
                        <div className="border border-gray-300 rounded-lg px-4 py-3 bg-gray-50">
                            <CardElement
                                options={{
                                    style: {
                                        base: {
                                            fontSize: '16px',
                                            color: '#2d3748',
                                            fontFamily: 'inherit',
                                            '::placeholder': { color: '#a0aec0' },
                                        },
                                        invalid: { color: '#e53e3e' },
                                    },
                                }}
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        disabled={!stripe || loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition"
                    >
                        {loading ? "Processing..." : `Pay £${total.toFixed(2)}`}
                    </button>
                    {message && (
                        <div className={`text-center text-sm mt-4 ${message.startsWith('Success:') ? 'text-green-600' : 'text-red-600'}`}>{message}</div>
                    )}
                </form>
            </div>
        </div>
    );
}

export default function StripeCheckout({ amount }) {
    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm amount={amount} />
        </Elements>
    );
}
