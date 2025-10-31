const Cart = require('../models/Cart');
const Product = require('../models/Product');

const get_cart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
        res.status(200).json(cart || { items: [] });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const add_to_cart = async (req, res) => {
    try {
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ user: req.user._id });

        if (!cart) {
            cart = await Cart.create({ user: req.user._id, items: [] });
        }

        const itemIndex = cart.items.findIndex(item => item.product.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const remove_from_cart = async (req, res) => {
    try {
        const { itemId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.items = cart.items.filter(item => item._id.toString() !== itemId);
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update_quantity = async (req, res) => {
    try {
        const { itemId } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        const item = cart.items.id(itemId);
        if (!item) return res.status(404).json({ error: 'Item not found' });

        item.quantity = quantity;
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const clear_cart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.items = [];
        await cart.save();

        res.status(200).json(cart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    get_cart,
    add_to_cart,
    remove_from_cart,
    update_quantity,
    clear_cart
};
