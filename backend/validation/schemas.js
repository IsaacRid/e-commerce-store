const Joi = require('joi');

// Auth Schemas

const registerSchema = Joi.object({
    name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

// Product Schemas

const createProductSchema = Joi.object({
    name: Joi.string().min(2).max(100).required(),
    description: Joi.string().allow(''),
    price: Joi.number().positive().required(),
    stock: Joi.number().integer().min(0).required(),
    image: Joi.string().uri().allow('')
});

// Cart Schemas

const addToCartSchema = Joi.object({
    productId: Joi.string().length(24).hex().required(),
    quantity: Joi.number().integer().min(1).required()
});

const updateCartSchema = Joi.object({
    quantity: Joi.number().integer().min(1).required()
});

// Order Schemas

const createOrderSchema = Joi.object({
    shippingAddress: Joi.string().min(5).required(),
    paymentMethod: Joi.string().valid('card', 'paypal').required()
});

// Params
const productIdParamSchema = Joi.object({
    productId: Joi.string().length(24).hex().required()
});

const itemIdParamSchema = Joi.object({
    itemId: Joi.string().length(24).hex().required()
});

const orderIdParamSchema = Joi.object({
    orderId: Joi.string().length(24).hex().required()
});

module.exports = {
    // Auth
    registerSchema,
    loginSchema,

    // Product
    createProductSchema,

    // Cart
    addToCartSchema,
    updateCartSchema,

    // Orders
    createOrderSchema

    // Params
    , productIdParamSchema,
    itemIdParamSchema,
    orderIdParamSchema
};
