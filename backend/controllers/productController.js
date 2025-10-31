const Product = require('../models/Product');

const get_products = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const get_product = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const create_product = async (req, res) => {
    try {
        const { name, description, price, image, stock } = req.body;
        const product = await Product.create({ name, description, price, image, stock });
        res.status(201).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const update_product = async (req, res) => {
    try {
        const { name, description, price, image, stock } = req.body;
        const product = await Product.findByIdAndUpdate(
            req.params.id,
            { name, description, price, image, stock },
            { new: true }
        );
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const delete_product = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (!product) return res.status(404).json({ error: 'Product not found' });
        res.status(200).json({ message: 'Product deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = {
    get_products,
    get_product,
    create_product,
    update_product,
    delete_product
};
