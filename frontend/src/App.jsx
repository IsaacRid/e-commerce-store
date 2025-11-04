import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ProductPage from './pages/ProductPage';
import Cart from './pages/Cart';
import axios from 'axios';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/products/:productId" element={<ProductPage />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default App;
