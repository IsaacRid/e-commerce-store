const Order = require('../models/Order');
const Cart = require('../models/Cart');

const place_order = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

        if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
            return res.status(400).json({ error: 'Cart is empty' });
        }

        const items = cart.items
            .filter(item => item.product)
            .map(item => ({
                product: item.product._id,
                quantity: item.quantity,
                price: item.product.price
            }));

        if (items.length === 0) {
            return res.status(400).json({ error: 'Cart contains no valid products' });
        }

        const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);

        const order = await Order.create({
            user: req.user._id,
            items,
            total,
            status: 'pending'
        });

        cart.items = [];
        await cart.save();

        res.status(201).json({ message: 'Order placed successfully', order });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const get_order_details = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.orderId, user: req.user._id }).populate('items.product');
        if (!order) return res.status(404).json({ error: 'Order not found' });

        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const get_all_orders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id })
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const admin_get_all_orders = async (req, res) => {
    try {
        const orders = await Order.find()
            .populate('user', 'name email')
            .populate('items.product')
            .sort({ createdAt: -1 });
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    place_order,
    get_order_details,
    get_all_orders,
    admin_get_all_orders
};
