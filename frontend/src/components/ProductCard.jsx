export default function ProductCard({ product, onAddToCart }) {
    return (
        <div className="bg-white border rounded-xl p-4 text-center shadow-sm hover:shadow-md transition">
            <img
                src={product.image ? `http://localhost:3000/images/${product.image}` : 'https://picsum.photos/200'}
                alt={product.name}
                className="w-full h-40 object-cover rounded-lg mb-3"
            />
            <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
            <p className="text-gray-500 text-sm mb-2">{product.description}</p>
            <p className="font-bold text-blue-600 mb-3">£{product.price.toFixed(2)}</p>
            <button
                onClick={() => onAddToCart(product._id)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
            >
                Add to Cart
            </button>
        </div>
    );
}
