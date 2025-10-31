const cart = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { addToCartSchema, updateCartSchema } = require('../validation/schemas');

module.exports = (app) => {
    app.route('/api/cart/')
        .get(protect, cart.get_cart)
    app.route('/api/cart/add')
        .post(protect, validate(addToCartSchema), cart.add_to_cart)
    app.route('/api/cart/update/:itemId')
        .put(protect, validate(updateCartSchema), cart.update_quantity)
        .delete(protect, cart.remove_from_cart)
    app.route('/api/cart/clear')
        .delete(protect, cart.clear_cart)
}