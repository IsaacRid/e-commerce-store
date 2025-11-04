import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            console.log('Navbar: User data loaded:', {
                isAdmin: parsedUser.isAdmin,
                email: parsedUser.email
            });
            setUser(parsedUser);
        } else {
            console.log('Navbar: No user data in localStorage');
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <nav className="bg-white shadow-sm py-3 px-6 flex justify-between items-center">
            <h1
                onClick={() => navigate('/')}
                className="text-xl font-semibold text-blue-600 cursor-pointer"
            >
                Shop
            </h1>

            <div className="flex space-x-6 text-gray-700">
                <Link to="/home" className="hover:text-blue-600">Home</Link>
                <Link to="/cart" className="hover:text-blue-600">Cart</Link>
                <Link to="/orders" className="hover:text-blue-600">Orders</Link>

                {user?.isAdmin && (
                    <Link to="/admin" className="hover:text-blue-600 font-medium">
                        Admin
                    </Link>
                )}
            </div>

            <button
                onClick={handleLogout}
                className="text-sm bg-blue-500 text-white px-4 py-1.5 rounded hover:bg-blue-600 transition"
            >
                Logout
            </button>
        </nav>
    );
}
