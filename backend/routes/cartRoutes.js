const cart = require('../controllers/cartController');
const { protect } = require('../middleware/authMiddleware');
const validate = require('../middleware/validateMiddleware');
const { addToCartSchema, updateCartSchema, itemIdParamSchema } = require('../validation/schemas');

module.exports = (app) => {
    app.route('/api/cart/')
        .get(protect, cart.get_cart)
    app.route('/api/cart/add')
        .post(protect, validate(addToCartSchema), cart.add_to_cart)
    app.route('/api/cart/update/:itemId')
        .put(protect, validate(itemIdParamSchema), validate(updateCartSchema), cart.update_quantity)
        .delete(protect, validate(itemIdParamSchema), cart.remove_from_cart)
    app.route('/api/cart/clear')
        .delete(protect, cart.clear_cart)
}