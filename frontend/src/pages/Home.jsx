import Navbar from '../components/Navbar.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';

export default function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get('/api/products')
            .then(res => setProducts(res.data))
            .catch(console.error);
    }, []);

    const handleAddToCart = async (productId) => {
        const token = localStorage.getItem('token');
        try {
            await axios.post(
                '/api/cart',
                { productId, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert('Added to cart!');
        } catch {
            alert('Failed to add to cart');
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <Navbar />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 py-2">
                {products.map(product => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
}

