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

        const item = cart.items.find(i => i.product.toString() === productId);
        if (item) {
            item.quantity += quantity;
        } else {
            cart.items.push({ product: productId, quantity });
        }

        await cart.save();
        const populatedCart = await cart.populate('items.product');
        res.status(200).json(populatedCart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update_quantity = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const { quantity } = req.body;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        const item = cart.items.find(item => item._id.toString() === cartItemId);
        if (!item) return res.status(404).json({ error: 'Cart item not found' });

        item.quantity = quantity;
        await cart.save();
        const populatedCart = await cart.populate('items.product');
        res.status(200).json(populatedCart);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const remove_from_cart = async (req, res) => {
    try {
        const { cartItemId } = req.params;
        const cart = await Cart.findOne({ user: req.user._id });

        if (!cart) return res.status(404).json({ error: 'Cart not found' });

        cart.items = cart.items.filter(item => item._id.toString() !== cartItemId);
        await cart.save();
        const populatedCart = await cart.populate('items.product');
        res.status(200).json(populatedCart);
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
    update_quantity,
    remove_from_cart,
    clear_cart
};
